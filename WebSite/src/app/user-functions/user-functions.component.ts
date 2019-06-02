import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  func = [
    {
      nombre: "Sumar",
      id: 13,
      descripcion: "suma numeros :v"
    },
    {
      nombre: "Restar",
      id: 34,
      descripcion: "resta numeros :v"
    }
  ]
}
