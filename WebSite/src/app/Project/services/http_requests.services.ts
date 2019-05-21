/*
	Creation Date: 20/04/2018
	Author: Josue Arce
	Description: Allows connection to back-end sector
*/
import { Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'rxjs/add/operator/map';
import { GlobalRecordsService } from './handlers/global-records.service';
import { SharedMethods } from './shared.services';
import { HttpClient } from "@angular/common/http";



@Injectable()

export class Http_Requests {

  constructor(private shareMethods: SharedMethods,
    private globalHandlerService: GlobalRecordsService,
    private http: HttpClient) {

  }

  /*Gets the information from GraphQL Server*/
  public getService(url: any, type: string): void {
    
    var data = 'informacion obtenida luego de una accion, en caso de traer info';
    this.globalHandlerService.setData(type, data);  
    //this.shareMethods.openSnackBar('Error al obtener los datos del servidor!', 'Alerta!');
    this.http.get(url);
  }


  /*Inserts information through GraphQL Server*/
  public postService(query: any, type: string, variables): void {
    var data = 'informacion obtenida luego de una accion, en caso de traer info';
    this.globalHandlerService.setData(type, data);  
    this.http.post('ruta','params')
  }

  /*Overwrite existence information with new one */
  public putService(query: any, type: string, variables): void {
    var data = 'informacion obtenida luego de una accion, en caso de traer info';
    this.globalHandlerService.setData(type, data);  
  }
  /*Returns the received data and transform it into a JSON object type before return it*/
  public deleteService(query: any, type: string, variables): void {
    var data = 'informacion obtenida luego de una accion, en caso de traer info';
    this.globalHandlerService.setData(type, data);       
  }

}
