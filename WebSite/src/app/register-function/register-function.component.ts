import { Component, OnInit,ViewChild} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';

export interface FunctionElement {
  id: number;
  id_usuario: number;
  nombre: string;
  descripcion: string;
  codejs: string;
  vecesutilizadas: number;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} 


@Component({
  selector: 'app-register-function',
  templateUrl: './register-function.component.html',
  styleUrls: ['./register-function.component.css']
})
export class RegisterFunctionComponent implements OnInit {

  nombreFuncion="";
  descFuncion="";
  codeFuncion="";
  idUsuario:number; 
  isLinear=false;


  //Validadores a implementar en formulario
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

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

  constructor(private _snackBar: MatSnackBar) { 

    this.idUsuario= parseInt(localStorage.getItem("idUsuario"));
  }

  listaEtiquetas: any = [];

  displayedColumns: string[] = ['select', 'nombre', 'descripcion'];
  listaFunciones = new MatTableDataSource<FunctionElement>([]);
  selection = new SelectionModel<FunctionElement>(true, []);

  pageSize = 10;
  pageSizeOptions = [5,10,20];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listaFunciones.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listaFunciones.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FunctionElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }


  ngOnInit() {
    // Al iniciar vista se traen las etiquetas y funciones desde DB
    this.obtenerEtiquetasBD();
    this.obtenerFuncionesBD();
    this.listaFunciones.paginator = this.paginator;
  }


  async obtenerEtiquetasBD() {
    var xhttp;
    var oldThis = this;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerEtiquetas", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        oldThis.listaEtiquetas = data.data;
      }
    }
  //  xhttp.withCredentials = true;
    xhttp.send();
    //this.router.navigate(['/main']);    
  }


  applyFilter(filterValue: string) {
    this.listaFunciones.filter = filterValue.trim().toLowerCase();
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
        //console.log(data);
        oldThis.listaFunciones = new MatTableDataSource<FunctionElement>(data.functions);
        oldThis.listaFunciones.paginator = oldThis.paginator;
        
      }
    }
 //   xhttp.withCredentials = true;
    xhttp.send();
  }


  registraEtiqueta() {
    
    var etiquetaNombre = (<HTMLInputElement>document.getElementById("nameEtiqueta")).value;
    var oldThis = this;
    if (etiquetaNombre != "") {
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.open("POST", "https://dynamiclibraryjdl.herokuapp.com/registrarEtiqueta", true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          oldThis.obtenerEtiquetasBD()
          alert("Etiqueta agregada correctamente. Actualizando .....")
          let a = (<HTMLInputElement>document.getElementById("nameEtiqueta")).value= "";
        }
      }

   //   xhttp.withCredentials = true;
      xhttp.send("nombre=" + etiquetaNombre);

    }

  }

  
  uneDependencias() {
    
    let funcionesSeleccionadas = this.selection.selected;
    let dependencias: string ="";
    let dependencia;
    for (dependencia in funcionesSeleccionadas){

      
      if (dependencias == ""){
        
        dependencias = dependencias + funcionesSeleccionadas[dependencia].id;
      }
      else{
        dependencias = dependencias +" "+ funcionesSeleccionadas[dependencia].id;
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
        if(etiquetasUsar== ""){etiquetasUsar = etiquetasUsar + id;}else{
          etiquetasUsar= etiquetasUsar+" "+ id;
        }
        
      }
    }
    return etiquetasUsar;  // Type: "1 2 5 34"
  }

  resetForm(){
    this.nombreFuncion="";
    this.descFuncion="";
    this.codeFuncion="";

    //tambien falta desmarcar los checks

  }

  checkForFunctionName(){

    let lowerCode = this.codeFuncion.toLowerCase();

    let index = lowerCode.search("function");

    //la palabra function tiene que existir y ser lo primero en el código 
    if (index==-1 || index!=0){
      return [false,"El código de la función debe iniciar con la palabra function"]
    }
    let limit = lowerCode.length;
    index+= 9
    let functionName="";

    while( index < limit && this.codeFuncion[index]!="("){
      functionName += this.codeFuncion[index];
      index++;
    }



    if (this.nombreFuncion == functionName){

      return [true,""];

    }

    else{
      return [false,"El nombre de la función especificado y el utilizado en el código no coinciden"];
    }

    

  }
  

  async registerFunction() {

    let checkFunctionName= this.checkForFunctionName();
    if (!checkFunctionName[0]){
      this._snackBar.open(checkFunctionName[1].toString(), "Advertencia", {
        duration: 6000});
      
      return;
    }

    var etiquetas = this.uneEtiquetas();
    var dependencias = this.uneDependencias()
    
    var oldThis = this;


    var xhttp;
      xhttp = new XMLHttpRequest();
     // xhttp.withCredentials = true;
      xhttp.open("POST", "https://dynamiclibraryjdl.herokuapp.com/registrarFuncion", true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          oldThis.obtenerFuncionesBD() //Acutualiza la lista de funciones
          oldThis._snackBar.open("Función registrada", " OK! ", {
            duration: 4000});
          oldThis.resetForm()
          
        }
      }
     // xhttp.withCredentials = true;
      xhttp.send("idUsuario="+ this.idUsuario.toString()+"&nombre="+this.nombreFuncion+"&descripcion="+this.descFuncion+"&codigo="+this.codeFuncion+"&dependencias="+dependencias+"&etiquetas="+etiquetas );
    
   

  }


}
