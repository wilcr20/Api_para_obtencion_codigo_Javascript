import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private correo: string;
  private password: string;

  constructor( private router: Router ) { }

  ngOnInit() {
  }
  
  async login(){
    var xhttp;
    console.log(this.correo)
    console.log(this.password)
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/inciarSesion?correo=" + this.correo + "&password=" + this.password, true);
    xhttp.onreadystatechange = function () {
      console.log(this.responseText)
    }
    xhttp.send();
    //this.router.navigate(['/main']);    
  }
}
