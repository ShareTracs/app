import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'alert-dialog',
    styleUrls: [
      './dialog.component.css'
    ],
    template: `
    <md-toolbar color="accent">
      <button md-icon-button (click)="dialogRef.close(true)">
        <md-icon>close</md-icon>
      </button>
    </md-toolbar>
    <div class="dialog-body">
      <p>
        <md-icon>{{ icon }}</md-icon>
        <span class="title">{{ message }}</span>
      </p>
      <p>
        <button md-raised-button color="accent" (click)="dialogRef.close(true)"> OK </button>
      </p>
    </div>
    `,
})
export class AlertDialog {

    public icon: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<AlertDialog>) {

    }
}
