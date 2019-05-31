import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { Routes, RouterModule } from '@angular/router';
import {RegisterFunctionComponent} from "../register-function/register-function.component";
import { UserFunctionsComponent} from "../user-functions/user-functions.component";
import { SeeFunctionsComponent} from "../see-functions/see-functions.component";
import {FullComponent} from "../layouts/full/full.component";
 

const routes: Routes = [

  { path: '',   component: FullComponent, 
    children :[
        {   path: '', redirectTo: 'home', pathMatch: 'full' },
        {   path: 'functions',   component: UserFunctionsComponent},
        {   path: 'newFunction',   component: RegisterFunctionComponent},
        {   path: 'seeFunctions',   component: SeeFunctionsComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMainPageRoutingModule {
  
 }
