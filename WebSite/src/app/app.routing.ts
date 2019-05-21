import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from "./Project/login/login.component";

export const AppRoutes: Routes = 
[
  {
      path: '',
      component: FullComponent,
      children: 
      [
        {
          /*Loads the module in charge of showing the child components*/
          path: '',
          loadChildren: './Project/ComponentsProject.module#ComponentsProjectModule'
        }
     ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

