import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  func= [
    {
      nombre:"Sumar",
      id:13,
      descripcion:"suma numeros :v"
    },
    {
      nombre:"Restar",
      id:34,
      descripcion:"resta numeros :v"
    }
  ]

}
