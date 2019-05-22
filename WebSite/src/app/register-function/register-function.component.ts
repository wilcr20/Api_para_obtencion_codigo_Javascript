import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  lista = [
    {
      nombre: "Tema1",
      id:1
    },
    {
      nombre: "Tema2",
      id:2
    },
    {
      nombre: "Tema3",
      id:3
    },
    {
      nombre: "Tema4",
      id:4
    },
    {
      nombre: "Tema5",
      id:5
    },
    {
      nombre: "Tema6",
      id:6
    },
    {
      nombre: "Tema7",
      id:7
    },
    {
      nombre: "Tema8",
      id:8
    }]


  funciones=  [
    {
      nombre: "func1",
      id:1
    },
    {
      nombre: "func2",
      id:2
    },
    {
      nombre: "func3",
      id:3
    },
    {
      nombre: "func4",
      id:4
    },
    {
      nombre: "funcion5_con nombre_largo",
      id:5
    },
    {
      nombre: "func6",
      id:6
    },
    {
      nombre: "func7",
      id:7
    },
    {
      nombre: "func8",
      id:8
    }]

  ngOnInit() {
  }

  registraEtiqueta(){}

  uneDependencias(){
    let dependeciasUsar:string= "";
    let checkList = document.getElementsByName("dependencia"); //Lista de documentos HTML tipo checkbox dependencias
    
    for (let index = 0; index < checkList.length; index++) {
      let c =  checkList[index] as HTMLInputElement;
      if (c.checked){ //Si esta seleccionada
        let id = c.id.split(",")[1].split("-")[0];
        dependeciasUsar= dependeciasUsar+ id+ ",";
      }
    }
    return dependeciasUsar;  // Type: "1,2,5,34"
  }

  uneEtiquetas(){
    let etiquetasUsar:string= "";

    let checkList = document.getElementsByName("etiqueta"); //Lista de documentos HTML tipo checkbox etiquetas
    
    for (let index = 0; index < checkList.length; index++) {
      let c =  checkList[index] as HTMLInputElement;
      if (c.checked){ //Si esta seleccionada
        let id = c.id.split(",")[1].split("-")[0];
        etiquetasUsar= etiquetasUsar+ id+ ",";
      }
    }
    return etiquetasUsar;  // Type: "1,2,5,34"

  }

  registerFunction(){
  

    let etiquetas = this.uneEtiquetas();
    let dependencias= this.uneDependencias()

    let json = {
      ID:" serial",
      ID_usuario:"se obtiene de la sesion",
      Nombre: (<HTMLInputElement>document.getElementById("name")).value, 
      Descripcion: (<HTMLInputElement>document.getElementById("description")).value,
      CodeJs: (<HTMLInputElement>document.getElementById("code")).value
    }

    alert("Registro: "+JSON.stringify(json) );
    alert("Etiquetas a usar (ids): "+ etiquetas );
    alert("Dependencias a funciones a usar (ids): "+ dependencias)

    

  } 


}
