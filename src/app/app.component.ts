import { Component, NgZone, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from './app.service';
import { LoginService } from './login/login.service';
import { DialogService } from './dialog/dialog.service';

// Google's login API namespace
declare var gapi: any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    './theme.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  localState: any;
  isDarkTheme: boolean = false;
  result: any;

  loggedIn = this.loginService.isLoggedIn();
  userImage = '../../assets/img/user-blank-avatar.png';
  userFullName = "";
  userEmail = "";

  constructor(
    public zone: NgZone,
    public appState: AppState,
    public route: ActivatedRoute,
    public loginService: LoginService,
    public dialogService: DialogService,
    public viewContainerRef: ViewContainerRef
) {}

  public openWarning() {
    this.dialogService
      .alert('flight', 'You have travel alerts!', this.viewContainerRef)
      .subscribe(res => this.result = res);
  }

  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
    if (this.loggedIn) {
      let jwt = this.loginService.getJwt();
      this.userImage = jwt.picture;
      this.userFullName = jwt.name;
      this.userEmail = jwt.email;
    }
    // force refresh view
    this.zone.run(() => {});
  }

  logout() {
    this.loginService.logout();
  }

  ngOnInit() {
    console.log('Spy: Hello from `App`');
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
    });
  }

  ngAfterViewInit() {
    gapi.targetApp = this;
    gapi.signin2.render(
      "g-signin2",
      {
        "onSuccess": function(googleUser){
          gapi.targetApp.loginService.loginWithGoogle(googleUser);
        },
        "scope": "profile email",
        "theme": "dark",
        "onfailure": function(err){console.log(err);}
      }
    );
  }
}
