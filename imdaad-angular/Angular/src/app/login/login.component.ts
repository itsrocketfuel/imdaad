import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from "@angular/router";

import {
  DataService
} from '../data.service';

import {
  AuthenticationService
} from '../services/authentication.service';

import {
  FirebaseService
} from '../services/firebase.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  login_result: Object;
  x: any;
  y: any;
  z: any;
  response = 0;


  constructor(private _data: DataService, private router: Router, public authenticationService: AuthenticationService, public firebase: FirebaseService) {}

  ngOnInit() {}

  loginWithFirebase() {
    this.authenticationService.SignIn(this.email, this.password);
  }

  resetPasswordWithFirebase() {
    var auth = firebase.auth();
    var emailAddress = this.email;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      alert("A password reset email has been sent on your email address.")
    }).catch(function (error) {
      // An error happened.
    });
  }


  login() {
    this._data.result().subscribe(data => {

      this.login_result = data;

      for (this.x in data) {
        this.y = data[this.x].email;
        this.z = data[this.x].password;
        console.log(this.y);
        console.log(this.z);
        if (this.y == this.email && this.z == this.password) {
          this.response = 1;
        }
      }
      if (this.response == 1) {
        var ret: any;
        let user = {
          email: this.email,
          password: this.password
        };
        this._data.login(user).subscribe(
          data => {
            ret = data
          },
          err => console.error(err),
          () => console.log('User data successfully posted.')
        );
        alert("Login successful!");
        this.router.navigate(['']);
      } else {
        alert("Login credentials are incorrect!");
      }
    });
  }
}
