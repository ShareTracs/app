import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Google's login API namespace
declare var gapi: any;

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  loginWithGoogle(googleUser) {

    gapi.targetApp.setLoggedIn(this.isLoggedIn());
    gapi.auth2.init().currentUser.listen(
      function(user) {
        gapi.targetApp.setLoggedIn(user.isSignedIn());
      }
    );

    return this.http
      .get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+googleUser.getAuthResponse().id_token)
      .map(res => res.text())
      .subscribe(
        data => this.setJwt(data),
        err => this.logError(err)
    );
  }

  setJwt(jwt) {
    localStorage.setItem('id_token',jwt);
  }

  getJwt() {
    let jwt = {
      name: '',
      email: '',
      picture: ''
    };
    try {
      jwt = JSON.parse(localStorage.getItem('id_token'));
    } catch(e) {}
    return jwt;
  }

  isLoggedIn() {
    let jwt = this.getJwt();
    if (jwt && gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    if (gapi.auth2) {
      gapi.auth2.getAuthInstance().disconnect();
    }
  }

  logError(err) {
    console.error(err);
  }
}
