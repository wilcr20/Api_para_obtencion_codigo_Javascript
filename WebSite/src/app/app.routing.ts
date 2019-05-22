import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from "./Project/login/login.component";
import {RegisterFunctionComponent} from "./register-function/register-function.component"
import {HomeComponent} from './home/home.component';

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
        },
        {
          /*Loads the module in charge of showing the child components*/
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'functionRegister',
          component: RegisterFunctionComponent
        }
     ]
  },
  {
    path: '**',
    component: HomeComponent
  }

  
];

