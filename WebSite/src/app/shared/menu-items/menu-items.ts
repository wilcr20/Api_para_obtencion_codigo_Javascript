import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [

    /*All components must be here(components,dimensions ....)*/
    {state: 'permisos', name: 'Permisos', type: 'link', icon: 'assignment' },
    {state: 'about', name: 'Acerca de', type: 'link', icon: 'donut_large' }
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
