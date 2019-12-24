import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  db(table) {
    return firebase.database().ref(table);
  }
  create(table, data) {
    this.db(table).push(data);
  }
  remove(segment) {
    return firebase.database().ref(segment).remove();
  }
}
