import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';
import { LoginService } from './login/login.service';
import { DialogService } from './dialog/dialog.service';
import { MdDialog, OVERLAY_PROVIDERS } from '@angular/material';
import { Http, RequestOptions, RequestMethod, ConnectionBackend } from '@angular/http';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Http,
      AppState,
      AppComponent,
      LoginService,
      DialogService,
      MdDialog,
      [OVERLAY_PROVIDERS],
      ConnectionBackend,
      ViewContainerRef,
      // provide a better mock
      // not an @Injectable
      {
        provide: RequestOptions,
        options: new RequestOptions({method: RequestMethod.Post})
      },
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      }
    ]
  }));
  it('should log ngOnInit', inject([AppComponent], (about: AppComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));
});
