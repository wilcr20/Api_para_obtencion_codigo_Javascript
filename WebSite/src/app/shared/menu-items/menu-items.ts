import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

    {state: '/user/functions', name: 'Mis funciones', type: 'link', icon: 'assignment'},  ///user/functions
    {state: '/user/seeFunctions', name: 'Ver funciones', type: 'link', icon: 'library_books'},
    {state: '/user/newFunction', name: 'Registrar Función', type: 'link', icon: 'note_add'},
    {state: '/user/editFunction', name: 'Editar Funciones', type: 'link', icon: 'edit'}
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] { 
    return MENUITEMS;
  }

}
