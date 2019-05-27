import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { MaterialModule} from '../material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentsRoutes } from './ComponentsProject.routing';

// services
import { Http_Requests } from './services/http_requests.services';
import { SharedMethods } from './services/shared.services';
import { HandlerService } from './services/handlers/handler.service';
import { GlobalRecordsService } from './services/handlers/global-records.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



@NgModule({
	imports : [
		CommonModule,
	    RouterModule.forChild(ComponentsRoutes),
	    MaterialModule,
	    HttpModule,
	    FormsModule,
		ReactiveFormsModule,
	    FlexLayoutModule,
		CdkTableModule,
		HttpClientModule,
    	ApolloModule,
		HttpLinkModule,
		HttpClientModule
	],
	providers : [
		Http_Requests,
		SharedMethods,
		HandlerService,
		GlobalRecordsService
// tslint:disable-next-line: indent
	],
	entryComponents : [],
	declarations : [
	]
})

export class ComponentsProjectModule {}
