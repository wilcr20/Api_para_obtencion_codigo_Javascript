import { Injectable } from '@angular/core';
import { SharedMethods } from '../shared.services';
import { Http_Requests } from '../http_requests.services';


@Injectable()
export class HandlerService {

	constructor(private sharedMethods: SharedMethods, private http_request: Http_Requests) { }

	public getRecords(query: any, type: string): void {
		this.http_request.getService(query, type);
	}

	public postRecords(query: any, type: string, variables): void {
		this.http_request.postService(query, type, variables);
	}

	public editRecords(query: any, type: string, variables): void {
		this.http_request.putService(query, type, variables);
	}

	public deleteRecords(query: any, type: string, variables): void {
		this.http_request.deleteService(query, type, variables);
	}
	

}
