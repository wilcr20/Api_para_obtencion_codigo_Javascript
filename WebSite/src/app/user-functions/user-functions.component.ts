import { Component, OnInit } from '@angular/core';
import { delay } from 'q';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {
  private idUsuario : number;
  private functions = [];
  constructor() { 
    this.idUsuario = parseInt(localStorage.getItem('idUsuario'));
    this.myFunctions()
  }

  ngOnInit() {

  }

  async myFunctions() {
    var xhttp;

    var flag = [];

    xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
      var response = this.responseText
      if (response != '') { // si se logeo!
        response = JSON.parse(response)
        console.log(response)
        if (response.state == 0) {
          console.log(response.functions)
          flag = response.functions;
        }
        else {
          flag = [];
        }
      }
    }    
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/obtenerFunciones?porUsuario="+this.idUsuario, true);
    xhttp.send();
    let delayres = await delay(2000);
    console.log(flag)
    this.functions = flag
  }
}
