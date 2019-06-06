import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-see-functions',
  templateUrl: './see-functions.component.html',
  styleUrls: ['./see-functions.component.css']
})
export class SeeFunctionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Al iniciar vista se traen las etiquetas y funciones desde DB
    this.obtenerEtiquetasBD()
    this.obtenerFuncionesBD()
  }

  listaEtiquetas: any = [];
  listaFunciones: any = [];
  listaResultadobusqueda: any = [];
  listaDueñoFunciones: any = [];
  listaEtiquetasFunciones: any = [];

  nombre = "";
  descrip = "";
  code = "";
  userNombre = "";


  async obtenerFuncionesBD() {
    var xhttp;
    var oldThis = this;
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerFunciones?porUsuario=0", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText))
        let data = JSON.parse(this.responseText);
        oldThis.listaFunciones = data.functions;
        oldThis.listaDueñoFunciones = data.functionsOwners;
        oldThis.listaEtiquetasFunciones = data.functionsTags;

        console.log(oldThis.listaFunciones)
        console.log(oldThis.listaDueñoFunciones)
        console.log(oldThis.listaEtiquetasFunciones)
      }
    }
    xhttp.send();
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
        console.log(oldThis.listaEtiquetas)
      }
    }
    xhttp.send();
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

  searchFunction() {
    var etiquetas = this.uneEtiquetas();
    alert("BUSQUEDA " + this.nombre + " " + this.descrip + " " + this.code + " " + this.userNombre + " " + etiquetas)
    this.listaResultadobusqueda = []
    //this.resetForm()
    let code = (<HTMLInputElement>document.getElementById("codeJS")).value;

    //Llama los metodos de filtrados de Busqueda, si se escribio algo en ellos
    if (this.nombre != "") {
      this.filtroNombre()
    }
    if (this.descrip != "") {
      this.filtroDescr()
    }
    if (code != "") {
      this.filtroCode(code)
    }
    if (this.userNombre != "") {
      this.filtroUserNombre()
    }
    if (etiquetas != "") {
      this.filtroEtiqutas(etiquetas)
    }

    console.log("BUSQUEDA: ", this.listaResultadobusqueda)
  }

  filtroNombre() {
    for (let i = 0; i < this.listaFunciones.length; i++) {
      let ActualF = this.listaFunciones[i];
      if (ActualF.nombre.toLowerCase().includes(this.nombre.toLowerCase())) {
        this.listaResultadobusqueda.push(ActualF);
      }
    }
  }

  filtroDescr() {
    if (this.listaResultadobusqueda = []) { //Si aun no hay resultados
      for (let i = 0; i < this.listaFunciones.length; i++) {
        let ActualF = this.listaFunciones[i];
        if (ActualF.descripcion.toLowerCase().includes(this.descrip.toLowerCase())) {
          this.listaResultadobusqueda.push(ActualF);
        }
      }
    } else { //Si ya hay resultados en lita, filtrarla
      for (let i = 0; i < this.listaResultadobusqueda; i++) {
        let ActualF = this.listaResultadobusqueda[i];
        if (ActualF.descripcion.toLowerCase().includes(this.descrip.toLowerCase())) {
        } else {
          this.listaResultadobusqueda.splice(i, 1);
        }
      }
    }
  }

  filtroCode(code) {
    if (this.listaResultadobusqueda = []) { //Si aun no hay resultados
      for (let i = 0; i < this.listaFunciones.length; i++) {
        let ActualF = this.listaFunciones[i];
        if (ActualF.codejs.toLowerCase().replace(/ /g, "").includes(code.toLowerCase().replace(/ /g, ""))) {
          this.listaResultadobusqueda.push(ActualF);
        }
      }
    } else { //Si ya hay resultados en lita, filtrarla
      for (let i = 0; i < this.listaResultadobusqueda; i++) {
        let ActualF = this.listaResultadobusqueda[i];
        if (ActualF.codejs.toLowerCase().replace(/ /g, "").includes(code.toLowerCase().replace(/ /g, ""))) {
        } else {
          this.listaResultadobusqueda.splice(i, 1); // Elimina de la lista de resultados los parametros que no concuerdan
        }
      }
    }
  }

  filtroUserNombre() {
    if (this.listaResultadobusqueda = []) { //Si aun no hay resultados
      for (let i = 0; i < this.listaFunciones.length; i++) {
        let ActualF = this.listaFunciones[i];

        for (let j = 0; j < this.listaDueñoFunciones.length; j++) {
          if (this.listaDueñoFunciones[j].nombre.toLowerCase().includes(this.userNombre) && ActualF.id == this.listaDueñoFunciones[j].idFuncion) {
            this.listaResultadobusqueda.push(ActualF)
          }
        }
      }
    }
    else { //Si ya hay resultados en lita, filtrarla
      for (let i = 0; i < this.listaResultadobusqueda; i++) {
        let ActualF = this.listaResultadobusqueda[i];
        for (let j = 0; j < this.listaDueñoFunciones.length; j++) {
          if (this.listaDueñoFunciones[j].nombre.toLowerCase().includes(this.userNombre) && ActualF.id == this.listaDueñoFunciones[j].idFuncion) {
          }else{
            this.listaResultadobusqueda.splice(i, 1); // Elimina de la lista de resultados los parametros que no concuerdan
          }
        }
      }
    }
  }

  filtroEtiqutas(etiq) {
    let etiquetasBusca = etiq.split(" ");
    let newListResult = [];

    if (this.listaResultadobusqueda.length == 0) { //Si aun no hay resultados
      for (let i = 0; i < etiquetasBusca.length; i++) {  //Recorre cada etiqueta de las buscadas 1,2,5,7
        for (var keyF in this.listaFunciones) {  // Recorre y obtiene cada key de todas las funciones        
          let idFuncion = this.listaFunciones[keyF].id; // Id de cada funcion
          for (var keyE in this.listaEtiquetasFunciones) {
            if (keyE == idFuncion) {
              for (let etiqueta = 0; etiqueta < this.listaEtiquetasFunciones[keyE].length; etiqueta++) {
                let e = this.listaEtiquetasFunciones[keyE][etiqueta];
                if (e.id_etiqueta == etiquetasBusca[i]) {
                  newListResult.push(this.listaFunciones[keyF])
                }
              }
            }
          }
        }
      }
    }
    console.log(this.listaResultadobusqueda.length)
    if (this.listaResultadobusqueda.length > 0) { //Si ya hay resultados en lita, filtrarla
      for (let i = 0; i < etiquetasBusca.length; i++) {  //Recorre cada etiqueta de las buscadas 1,2,5,7
        for (var keyF in this.listaResultadobusqueda) {  // Recorre y obtiene cada key de todas las funciones        
          let idFuncion = this.listaResultadobusqueda[keyF].id; // Id de cada funcion
          for (var keyE in this.listaEtiquetasFunciones) {
            if (keyE == idFuncion) {
              for (let etiqueta = 0; etiqueta < this.listaEtiquetasFunciones[keyE].length; etiqueta++) {
                let e = this.listaEtiquetasFunciones[keyE][etiqueta];
                if (e.id_etiqueta == etiquetasBusca[i]) {
                  newListResult.push(this.listaFunciones[keyF])
                }
              }
            }
          }
        }
      }
    }

    this.listaResultadobusqueda = newListResult;

  }



  resetForm() {
    this.nombre = "";
    this.descrip = "";
    this.code = "";
    this.userNombre = "";
  }




}
