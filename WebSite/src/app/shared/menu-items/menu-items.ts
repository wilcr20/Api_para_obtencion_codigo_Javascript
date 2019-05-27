import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

    /*All components must be here(components,dimensions ....)*/
    {state: 'home', name: 'Home', type: 'link', icon: 'home'},
    {state: 'functionRegister', name: 'Registrar Función', type: 'link', icon: 'note_add'},
    {state: 'doc', name: 'Documentación', type: 'link', icon: 'library_books'},
    {state: 'about', name: 'Acerca de', type: 'link', icon: 'donut_large' }
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
