import { Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import {HomeComponent} from './home/home.component';
import {DocumentationComponent} from './documentation/documentation.component';
import {MainComponent} from './main-component/main-component.component';
import { AboutComponent } from './about/about.component';
 


export const AppRoutes: Routes = 
[

   
   {
      path: 'user',
      loadChildren : './user-main-page/user-main-page.module#UserMainPageModule'
    },

    {

      path: 'main',
      component: MainComponent,
   
      children: 
      [
     
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'documentation',
          component: DocumentationComponent
        },

        {
          path: 'about',
          component: AboutComponent
        }

     ]
  },
  { path: '', redirectTo: 'main/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/home',pathMatch: 'full' },

  
];

