import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class GlobalRecordsService {
	// Detects when onChange changes, everytime that onChange changes all other objects that are connected to onChange will change aswell
	//public establecimientoRecords: EventEmitter<Establecimiento> = new EventEmitter<Establecimiento>();

	public setData(type: string, records: any): void {
		switch (type) {
			/*case 'getAllEstablecimientos':
				this.establecimientoRecords.emit(records.getAllEstablecimientos);
				break;
			case 'addEstablecimiento':
				this.establecimientoRecords.emit(records.addEstablecimiento);
				break;
			case 'deleteEstablecimiento':
				this.establecimientoRecords.emit(records.deleteEstablecimiento);
				break;*/
		}
	}
}
