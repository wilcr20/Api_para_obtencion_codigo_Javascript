import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  constructor() { }

  listaEtiquetas: any = [];

  listaFunciones: any = [];


  funciones = [
    {
      nombre: "func1",
      id: 1,
      descripcion: "Hace algo"
    },
    {
      nombre: "func2",
      id: 2,
      descripcion: "Descripcion random "
    },
    {
      nombre: "func3",
      id: 3,
      descripcion: "Hace algo"
    },
    {
      nombre: "func4",
      id: 4,
      descripcion: "Tiene bugs por todos lados"
    },
    {
      nombre: "funcion5_con nombre_largo",
      id: 5,
      descripcion: "Hace algo raro"
    },
    {
      nombre: "func6",
      id: 6,
      descripcion: "Hace algo bueno"
    },
    {
      nombre: "func7",
      id: 7,
      descripcion: "No hace nada"
    },
    {
      nombre: "func8",
      id: 8,
      descripcion: "Hace algo"
    }]

  ngOnInit() {
    // Al iniciar vista se traen las etiquetas y funciones desde DB
    this.obtenerEtiquetasBD()
    this.obtenerFuncionesBD()
  }


  obtenerEtiquetasBD() {
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
    
    //this.router.navigate(['/main']);    

  }

  obtenerFuncionesBD() {
    var xhttp;
    var oldThis = this;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerFunciones", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        oldThis.listaFunciones = this.responseText;
        //console.log("Funciones: ",oldThis.listaFunciones)
      }
    }
    xhttp.send("porUsuario="+0);
  }


  registraEtiqueta() {
    let etiquetaNombre = (<HTMLInputElement>document.getElementById("nameEtiqueta")).value;
    console.log(etiquetaNombre)

    if (etiquetaNombre != "") {
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.open("POST", "https://dynamiclibraryjdl.herokuapp.com/registrarEtiqueta", true);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Response  de agregar etiqueta: ", this.responseText)
          //oldThis.obtenerEtiquetasBD()
        }
      }
      xhttp.send("nombre=" + etiquetaNombre);

    }

  }









  uneDependencias() {
    let dependeciasUsar: string = "";
    let checkList = document.getElementsByName("dependencia"); //Lista de documentos HTML tipo checkbox dependencias

    for (let index = 0; index < checkList.length; index++) {
      let c = checkList[index] as HTMLInputElement;
      if (c.checked) { //Si esta seleccionada
        let id = c.id.split(",")[1].split("-")[0];
        dependeciasUsar = dependeciasUsar + id + ",";
      }
    }
    return dependeciasUsar;  // Type: "1,2,5,34"
  }

  uneEtiquetas() {
    let etiquetasUsar: string = "";

    let checkList = document.getElementsByName("etiqueta"); //Lista de documentos HTML tipo checkbox etiquetas

    for (let index = 0; index < checkList.length; index++) {
      let c = checkList[index] as HTMLInputElement;
      if (c.checked) { //Si esta seleccionada
        let id = c.id.split(",")[1].split("-")[0];
        etiquetasUsar = etiquetasUsar + id + ",";
      }
    }
    return etiquetasUsar;  // Type: "1,2,5,34"

  }

  registerFunction() {


    let etiquetas = this.uneEtiquetas();
    let dependencias = this.uneDependencias()

    let json = {
      ID: " serial",
      ID_usuario: "se obtiene de la sesion",
      Nombre: (<HTMLInputElement>document.getElementById("name")).value,
      Descripcion: (<HTMLInputElement>document.getElementById("description")).value,
      CodeJs: (<HTMLInputElement>document.getElementById("code")).value
    }

    alert("Registro: " + JSON.stringify(json));
    alert("Etiquetas a usar (ids): " + etiquetas);
    alert("Dependencias a funciones a usar (ids): " + dependencias)



  }


}
