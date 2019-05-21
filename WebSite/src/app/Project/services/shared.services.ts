/*
	Creation Date: 26/04/2018
	Author: Josue Arce González
	Description: Methods any component can access to
*/

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class SharedMethods {
	
	constructor(
		private snackBar: MatSnackBar
	){}

	// displays a little message on the bottom
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}