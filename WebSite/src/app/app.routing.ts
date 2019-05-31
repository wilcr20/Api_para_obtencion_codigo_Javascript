import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from "./Project/login/login.component";
import {RegisterFunctionComponent} from "./register-function/register-function.component"
import {HomeComponent} from './home/home.component';
import {DocumentationComponent} from './documentation/documentation.component';
import {MainComponent} from './main-component/main-component.component';
 


export const AppRoutes: Routes = 
[
  {
      path: '',
      component: MainComponent,
      children: 
      [

         {
           /*Loads the module in charge of showing the child components*/
           path: '',
           redirectTo: 'login',
           pathMatch: 'full'
         },

         
        {
          path: 'user',
          loadChildren : '../user-main-page/user-main-page.module#UserMainPageModule'
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
          path: 'functionsAvailable',
          component: DocumentationComponent
        },

        {
          path: 'about',
          component: DocumentationComponent
        }

     ]
  },
  {
    path: '**',
    component: MainComponent
  }

  
];

