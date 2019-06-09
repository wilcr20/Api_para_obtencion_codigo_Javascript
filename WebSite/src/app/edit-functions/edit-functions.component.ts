import { Component, OnInit, Injectable, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'q';
import { PageEvent } from '@angular/material/paginator';
import { FunctionElement } from "./function.interface";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-edit-functions',
  templateUrl: './edit-functions.component.html',
  styleUrls: ['./edit-functions.component.css']
})
@Injectable()
export class EditFunctionsComponent implements OnInit {

  private length = 100;
  private pageSize = 5;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  private displayedColumns: string[] = ['select', 'nombre', 'descripcion', 'vecesutilizadas'];
  private selectedFunction;

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;

  private idUsuario: number;
  private loading = true;

  private ELEMENT_DATA: string[] = [];
  private dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private _formBuilder: FormBuilder,private changeDetectorRefs: ChangeDetectorRef) {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onRowClicked(row){
    console.log(row)
  }
  async myFunctions() {
    var xhttp;

    var flag = [];

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
    //console.log(this.ELEMENT_DATA)
    //this.dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);

    this.dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);
    this.dataSource.filter
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.dataSource._renderChangesSubscription
    if (flag.length > 0)
      this.loading = !this.loading;
  }
}
