import {
  Injectable,
  NgZone
} from '@angular/core';
import {
  AngularFireAuth
} from "@angular/fire/auth";

import {
  auth
} from 'firebase/app';

import {
  Router
} from '@angular/router';

import {
  FirebaseService
} from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService, public ngZone: NgZone) {}


  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }


  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        window.alert("A verification link has been sent to your email address. Please verify your account."); // Sending email verification notification, when new user registers
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['/starter']);
          });
        }
       // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        window.alert("Successfully signed in!");
        this.router.navigate(['/starter']);
      }).catch((error) => {
        console.log(error)
      })
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
}
