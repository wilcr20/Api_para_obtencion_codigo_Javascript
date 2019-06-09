import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterFunctionComponent} from "../register-function/register-function.component";
import { UserFunctionsComponent} from "../user-functions/user-functions.component";
import { SeeFunctionsComponent} from "../see-functions/see-functions.component";
import {FullComponent} from "../layouts/full/full.component";
import { EditFunctionsComponent } from "../edit-functions/edit-functions.component";
import { UserMainPageRoutingModule } from './user-main-page-routing.module';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatSnackBarModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { AppSidebarComponent } from '../layouts/full/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [FullComponent,
    RegisterFunctionComponent,
    UserFunctionsComponent,
    SeeFunctionsComponent,
    EditFunctionsComponent,
    AppSidebarComponent
  ],
  exports : [
    AppSidebarComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatSnackBarModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    UserMainPageRoutingModule
  ]
})
export class UserMainPageModule { }


