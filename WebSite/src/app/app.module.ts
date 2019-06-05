import 'hammerjs';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { LoginComponent, DialogUserRegister } from './login/login.component';
import { MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { RegisterFunctionComponent } from './register-function/register-function.component';
import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { MainComponent } from './main-component/main-component.component';
import { UserFunctionsComponent } from './user-functions/user-functions.component';
import { SeeFunctionsComponent } from './see-functions/see-functions.component';

import { UserMainPageModule } from './user-main-page/user-main-page.module';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    LoginComponent,
    DialogUserRegister,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    RegisterFunctionComponent,
    HomeComponent,
    DocumentationComponent,
    MainComponent,
    UserFunctionsComponent,
    SeeFunctionsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    UserMainPageModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  entryComponents: [DialogUserRegister],
  bootstrap: [AppComponent]
})
export class AppModule { }
