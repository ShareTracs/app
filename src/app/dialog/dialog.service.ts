import { Observable } from 'rxjs/Rx';
import { AlertDialog } from './alert-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(
    icon: string,
    title: string,
    message: string,
    viewContainerRef: ViewContainerRef
  ): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialog>;
    let config = new MdDialogConfig();

    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmDialog, config);

    dialogRef.componentInstance.icon = icon;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public alert(
    icon: string,
    message: string,
    viewContainerRef: ViewContainerRef
  ): Observable<boolean> {

    let dialogRef: MdDialogRef<AlertDialog>;
    let config = new MdDialogConfig();

    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(AlertDialog, config);

    dialogRef.componentInstance.icon = icon;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
