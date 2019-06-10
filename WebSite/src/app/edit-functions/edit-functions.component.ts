import { Component, OnInit, Injectable, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { delay } from 'q';
import { PageEvent } from '@angular/material/paginator';
import { FunctionElement } from "./function.interface";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatStepper } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-edit-functions',
  templateUrl: './edit-functions.component.html',
  styleUrls: ['./edit-functions.component.css']
})
@Injectable()
export class EditFunctionsComponent implements OnInit {

  private length = 100;
  private pageSize = 5;
  private checked = false;
  interestFormGroup : FormGroup
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  private displayedColumns: string[] = ['select', 'nombre', 'descripcion', 'vecesutilizadas'];

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;

  private idUsuario: number;
  private loading = true;

  private ELEMENT_DATA: FunctionElement[] = [];
  private ALL_DATA: Object = {};
  private dataSource = new MatTableDataSource<FunctionElement>(this.ELEMENT_DATA);

  private selection = new SelectionModel<FunctionElement>(true, []);
  @Output('selectedPermiso') selectedFunction = new EventEmitter<FunctionElement>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef, 
    private formBuilder: FormBuilder
    ) {
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
    this.myFunctions()
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  change() {
    console.log(this.interestFormGroup.value);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectItem(row) {
    // if there are any other checkbox checked, it'll uncheck the checkbox
    if (this.selection.selected.length > 0) {
      this.selection.clear(); // unselect all the active checkbox
    }
    this.selection.toggle(row);
    this.selectedFunction.emit(row);
  }

  stepBack = (stepper: MatStepper) => {
    stepper.previous();
  }
  nextStep = (stepper: MatStepper) => {
    stepper.next();
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => { this.selection.select(row); });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onRowClicked(row){
    console.log(row)
  }
  async myFunctions() {
    var xhttp;

    var flag = [];
    var info: Object = {};

    xhttp = new XMLHttpRequest();
    //xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
      var response = this.responseText
      if (response != '') { // si se logeo!
        response = JSON.parse(response);
        //console.log(response)
        if (response.state == 0) {
          //console.log(response.functions)
          flag = response.functions;
          info = {...response};
        }
        else {
          flag = [];
        }
      }
    }
    xhttp.open("POST", "https://dynamiclibraryjdl.herokuapp.com/obtenerFunciones?" + "porUsuario=" + this.idUsuario, true);
    xhttp.send();
    let delayres = await delay(2000);
    //console.log(this.ELEMENT_DATA)
    this.ELEMENT_DATA = [...flag]
    this.ALL_DATA = info
    console.log(this.ALL_DATA)
    //this.dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);

    this.dataSource = new MatTableDataSource<FunctionElement>(this.ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.dataSource._renderChangesSubscription
    if (flag.length > 0)
      this.loading = !this.loading;
  }
}
