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
import { MaterialModule} from './material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { LoginComponent } from './Project/login/login.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { RegisterFunctionComponent } from './register-function/register-function.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    LoginComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    RegisterFunctionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,  
    HttpClientModule,
    SharedModule,  
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
