import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
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
            <span class="title">{{ title }}</span>
          </p>
          <hr>
          <p>
            <span class="message">{{ message }}</span>
          </p>
          <p>
            <button md-raised-button color="accent" (click)="dialogRef.close(true)"> OK </button>
            <button md-raised-button (click)="dialogRef.close()"> Cancel </button>
          </p>
        </div>
    `,
})
export class ConfirmDialog {

    public icon: string;
    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

    }
}
