import * as $ from 'jquery';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes,
  Router
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import {
  HttpClientModule,
  HttpClient
} from '@angular/common/http';
import {
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import {
  AppRoutes
} from './app.routing';
import {
  AppComponent
} from './app.component';

import {
  FlexLayoutModule
} from '@angular/flex-layout';
import {
  FullComponent
} from './layouts/full/full.component';
import {
  AppHeaderComponent
} from './layouts/full/header/header.component';
import {
  AppSidebarComponent
} from './layouts/full/sidebar/sidebar.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  DemoMaterialModule
} from './demo-material-module';

import {
  SharedModule
} from './shared/shared.module';
import {
  SpinnerComponent
} from './shared/spinner.component';
import {
  LoginComponent
} from './login/login.component';

import {
  MDBBootstrapModule
} from 'angular-bootstrap-md';
import {
  LandingPageComponent
} from './landing-page/landing-page.component';
import {
  RegisterComponent
} from './register/register.component';

import {
  AuthenticationService
} from './services/authentication.service';
import {
  AngularFireAuth
} from "@angular/fire/auth";

import {
  AngularFireModule
} from "@angular/fire";
import {
  AngularFireAuthModule
} from "@angular/fire/auth";

import {
  AgmCoreModule
} from '@agm/core';

import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

var config: {
  apiKey: "AIzaSyDXApWoNf6g0ILXv3MuLFWf3LiK0JJb1nA",
  authDomain: "imdaad-69.firebaseapp.com",
  databaseURL: "https://imdaad-69.firebaseio.com",
  projectId: "imdaad-69",
  storageBucket: "imdaad-69.appspot.com",
  messagingSenderId: "1029955172879",
  appId: "1:1029955172879:web:8f2d982eaf272d126ec17a",
  measurementId: "G-1HG0RPTWJX"
}


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    LandingPageComponent,
    RegisterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuReuHR0qpdEm9gYZaKSa9cKXkWgiNZIY',
      language: 'en',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AuthenticationService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
matchMedia;
