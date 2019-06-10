import { Component, OnInit, Injectable, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { delay } from 'q';
import { PageEvent } from '@angular/material/paginator';
import { FunctionElement } from "./function.interface";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatStepper, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MyErrorStateMatcher } from '../register-function/register-function.component';

@Component({
  selector: 'app-edit-functions',
  templateUrl: './edit-functions.component.html',
  styleUrls: ['./edit-functions.component.css']
})
@Injectable()
export class EditFunctionsComponent implements OnInit {

  private pageSize = 5;
  private checked = false;
  private next = true;
  private interestFormGroup: FormGroup
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  private displayedColumns: string[] = ['select', 'nombre', 'descripcion', 'vecesutilizadas'];

  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;
  private selectFunction: Object = {}

  private idUsuario: number;
  private loading = true;

  private ELEMENT_DATA: FunctionElement[] = [];
  private ALL_DATA: Object = {};
  private dataSource = new MatTableDataSource<FunctionElement>(this.ELEMENT_DATA);
  private listaFunciones = new MatTableDataSource<FunctionElement>([]);
  private listaEtiquetas: any = [];

  private selection = new SelectionModel<FunctionElement>(true, []);
  private selection2 = new SelectionModel<FunctionElement>(true, []);
  @Output('selectedPermiso') selectedFunction = new EventEmitter<FunctionElement>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('matPaginator2') paginator2: MatPaginator;


  textFormControl = new FormControl('', [
    Validators.required
  ]);

  descrFormControl = new FormControl('', [
    Validators.required
  ]);
  codeFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private _formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));

  }

  ngOnInit() {
    this.myFunctions()
    this.obtenerEtiquetasBD();
    this.obtenerFuncionesBD();

    this.dataSource.paginator = this.paginator;
    this.listaFunciones.paginator = this.paginator2;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  checkboxLabel(row?: FunctionElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }
  checkboxLabel2(row?: FunctionElement): string {
    if (!row) {
      return `${this.isAllSelected2() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  change() {
    console.log(this.interestFormGroup.value);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.listaFunciones.data.length;
    return numSelected === numRows;
  }

  async selectItem(row) {
    // if there are any other checkbox checked, it'll uncheck the checkbox
    if (this.selection.selected.length > 0) {
      this.selection.clear(); // unselect all the active checkbox
    }
    this.selection.toggle(row);
    this.selectedFunction.emit(row);
    //console.log(row)
    this.selectFunction = row;
    this.next = !this.next;
    console.log(this.listaFunciones.data.length)
    this.selectEtiquetas();
    this.selectFunciones();
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

  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.listaFunciones.data.forEach(row => { this.selection2.select(row); });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    this.listaFunciones.filter = filterValue.trim().toLowerCase();
  }

  selectEtiquetas() {
    let checkList = document.getElementsByName("etiqueta"); //Lista de documentos HTML tipo checkbox etiquetas
    var etiquetas = [];
    for (var fun in this.ALL_DATA.functionsTags) { // obtengo las etiquetas de la funcion seleccionada
      if (this.selectFunction.id == fun) {
        etiquetas = this.ALL_DATA.functionsTags[parseInt(fun)]
        console.log(etiquetas)
      }
    }

    for (let index = 0; index < checkList.length; index++) { // busco las etiquetas y les pongo check en true
      let c = checkList[index] as HTMLInputElement;
      let id = c.id.split(",")[1].split("-")[0];

      for (let i in etiquetas) {
        if (id == etiquetas[parseInt(i)].id_etiqueta) {
          c.checked = true;
          c.click()
        }
      }
    }
  }

  selectFunciones(event?: PageEvent) {
    console.log(this.selection2.selected)
    console.log(this.listaFunciones.data)
    var funciones: FunctionElement[] = []
    var functionsDependencies = [];
    for (var fun in this.ALL_DATA.functionsDependencies) { // obtengo las etiquetas de la funcion seleccionada
      if (this.selectFunction.id == fun) {
        functionsDependencies = this.ALL_DATA.functionsDependencies[parseInt(fun)]
      }
    }
    console.log(functionsDependencies)

    for (let funcDep in functionsDependencies) {
      for (let func in this.listaFunciones.data) {
        if (this.listaFunciones.data[parseInt(func)].id == functionsDependencies[parseInt(funcDep)].id_dependencia)
          funciones.push(this.listaFunciones.data[parseInt(func)])
      }
      //this.selection2.selected.push(functionsDependencies[i])
    }
    //console.log(funciones)
    this.selection2 = new SelectionModel<FunctionElement>(true, [...this.selection2.selected, ...funciones])

  }

  guardar() {
    var etiquetas = this.uneEtiquetas();
    var dependencias = this.uneDependencias()

    var oldThis = this;

    var xhttp;
    xhttp = new XMLHttpRequest();
    //xhttp.withCredentials = true;
    xhttp.open("POST", "https://dynamiclibraryjdl.herokuapp.com/registrarFuncion", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        oldThis._snackBar.open("Función registrada", " OK! ", {
          duration: 4000});
        oldThis.obtenerFuncionesBD() //Acutualiza la lista de funciones
        oldThis.selectFunction = {}
      }
    }
    // xhttp.withCredentials = true;
    xhttp.send("idUsuario=" + this.idUsuario + "&nombre=" + oldThis.selectFunction.nombre + "&descripcion=" + oldThis.selectFunction.descripcion + "&codigo=" + oldThis.selectFunction.codejs + "&dependencias=" + dependencias + "&etiquetas=" + etiquetas + "&idFuncionOriginal=" + this.selectFunction.id);

  }

  async obtenerEtiquetasBD() {
    var xhttp;
    var oldThis = this;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerEtiquetas", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        for (var tag in data.data) {
          data.data[parseInt(tag)] = { ...data.data[parseInt(tag)], checked: false }
        }
        oldThis.listaEtiquetas = data.data;
        //console.log(oldThis.listaEtiquetas)
      }
    }
    //  xhttp.withCredentials = true;
    xhttp.send();
    //this.router.navigate(['/main']);    
  }

  uneDependencias() {
    let funcionesSeleccionadas = this.selection2.selected;
    let dependencias: string = "";
    let dependencia;
    for (dependencia in funcionesSeleccionadas) {


      if (dependencias == "") {

        dependencias = dependencias + funcionesSeleccionadas[dependencia].id;
      }
      else {
        dependencias = dependencias + " " + funcionesSeleccionadas[dependencia].id;
      }
    }

    return dependencias;
  }

  uneEtiquetas() {
    let etiquetasUsar: string = "";

    let checkList = document.getElementsByName("etiqueta"); //Lista de documentos HTML tipo checkbox etiquetas

    for (let index = 0; index < checkList.length; index++) {
      let c = checkList[index] as HTMLInputElement;
      if (c.checked) { //Si esta seleccionada
        let id = c.id.split(",")[1].split("-")[0];
        if (etiquetasUsar == "") { etiquetasUsar = etiquetasUsar + id; } else {
          etiquetasUsar = etiquetasUsar + " " + id;
        }
      }
    }
    return etiquetasUsar;  // Type: "1 2 5 34"
  }

  async myFunctions() {
    var xhttp;
    var oldThis = this;

    xhttp = new XMLHttpRequest();
    //xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
      var response = this.responseText
      if (response != '') { // si se logeo!
        try {
          response = JSON.parse(response);
        } catch (error) { }
        //console.log(response)
        if (response.state == 0) {
          oldThis.ELEMENT_DATA = [...response.functions]
          oldThis.ALL_DATA = { ...response };
          console.log(oldThis.ALL_DATA)
        }
        else {
          oldThis.ELEMENT_DATA = []
          oldThis.ALL_DATA = {};
        }
        oldThis.dataSource = new MatTableDataSource<FunctionElement>(oldThis.ELEMENT_DATA);
        oldThis.changeDetectorRefs.detectChanges();
        oldThis.dataSource.paginator = oldThis.paginator;

        oldThis.dataSource._renderChangesSubscription
        if (oldThis.ELEMENT_DATA.length > 0)
          oldThis.loading = !oldThis.loading;
      }
    }
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerFunciones?" + "porUsuario=" + this.idUsuario, true);
    xhttp.send();
  }

  async obtenerFuncionesBD() {
    var xhttp;
    var oldThis = this;

    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerFuncionesReducido?porUsuario=0", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText)
        let data = JSON.parse(this.responseText);
        //console.log(data.functions);
        oldThis.listaFunciones = new MatTableDataSource<FunctionElement>(data.functions);
        oldThis.changeDetectorRefs.detectChanges();
        oldThis.listaFunciones.paginator = oldThis.paginator2;
        oldThis.dataSource._renderChangesSubscription
      }
    }
    //   xhttp.withCredentials = true;
    xhttp.send();
  }

}
