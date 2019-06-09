import { Injectable } from '@angular/core';

export interface MainPageMenu {
  state: string;
  name: string;
  type: string;
}

const MENUITEMS = [

    /*All components must be here(components,dimensions ....)*/
    {state: 'home', name: 'Inicio', type: 'link'},
    {state: 'documentation', name: 'Documentación', type: 'link' },
    {state: 'about', name: 'Acerca de', type: 'link' }
]; 

@Injectable()

export class MainPageMenuItems {
  getMenuitem(): MainPageMenu[] {
    return MENUITEMS;
  }

}


