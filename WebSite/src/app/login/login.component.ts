import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private correo: string;
  private password: string;

  constructor(private router: Router, private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
  }

  async delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }


  async registrar(){
    var xhttp;
    console.log(this.correo)
    console.log(this.password)
  }

  async login() {
    var xhttp;
    console.log(this.correo)
    console.log(this.password)

    var flag = false;

    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/iniciarSesion?correo=" + this.correo + "&password=" + this.password, true);
    xhttp.onreadystatechange = function () {
      var response = this.responseText
      if (response != '') { // si se logeo!
        response = JSON.parse(response)
        if (response.state == 0) {
          localStorage.setItem('nombreUsuario', response.nombreUsuario);
          localStorage.setItem('idUsuario', response.idUsuario);
          flag = true;
        }
        else {
          flag = false;
          localStorage.clear();
        }
      }
    }
    xhttp.send();
    let delayres = await delay(1500);
    if (flag) {
      this.openSnackBar('Bienvenido', 'Login');
      this.router.navigate(['/']);
    }
    else
      this.openSnackBar('Error al iniciar sesión, inténtalo de nuevo', 'Error')
  }
}
