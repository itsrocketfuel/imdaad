import {
  Component,
  OnInit
} from '@angular/core';

import {
  DataService
} from '../data.service';

import {
  AuthenticationService
} from '../services/authentication.service';

import {
  FirebaseService
} from '../services/firebase.service';

import {
  Router
} from "@angular/router";

export interface Question {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  accounts: string[] = ['Volunteer/Donor', 'Restaurant'];

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  question: string;
  answer: string;
  accountselected: string;

  login_result: Object;
  x: any;
  y: any;
  response = 0;

  constructor(private _data: DataService, private router: Router, public authenticationService: AuthenticationService, private firebaseService: FirebaseService, ) {}

  ngOnInit() {}

  questions: Question[] = [{
      value: '0',
      viewValue: 'Favorite childhood friend?'
    },
    {
      value: '1',
      viewValue: 'Favorite color?'
    },
    {
      value: '2',
      viewValue: 'Your first school?'
    }
  ];

  selected() {
    console.log(this.question);
  }

  firebase_register()
  {
    this.authenticationService.SignUp(this.email, this.password);
  }

  register() {
    this._data.result().subscribe(data => {

      this.login_result = data;

      if (//this.firstname != undefined &&
        //this.lastname != undefined &&
        this.email != undefined &&
        this.password != undefined &&
        this.confirmpassword != undefined &&
        //this.question != undefined &&
        //this.answer != undefined &&
        //this.accountselected != undefined &&
        //this.firstname != "" &&
        //this.lastname != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirmpassword != "")
        //this.question != "" &&
        //this.answer != "" &&
        //this.accountselected != "")
        {

        if (this.password == this.confirmpassword) {
          for (this.x in data) {
            this.y = data[this.x].email;
            console.log(this.y);
            if (this.y == this.email) {
              this.response = 1;
            }
          }
          if (this.response == 1) {
            alert("Email address already registered!");
            // this.router.navigate(['register']);
            this.response = 0;
          } else {
            var ret: any;
            let user = {
             // firstname: this.firstname,
             // lastname: this.lastname,
              email: this.email,
              password: this.password,
             // securityQuestion: this.question,
             // answer: this.answer,
             // accountType: this.accountselected
            };
            this._data.register(user).subscribe(
              data => {
                ret = data
              },
              err => console.error(err),
              () => console.log('User data successfully posted.')
            );
            this.authenticationService.SignUp(this.email, this.password);
         //   this.firstname = undefined;
         //   this.lastname = undefined;
            this.email = undefined;
            this.password = undefined;
            this.confirmpassword = undefined;
         //   this.question = undefined;
         //   this.answer = undefined;
         //   this.accountselected = undefined;
          }
        } else {
          alert("Passwords don't match.");
        }
      } else {
        alert("Please enter all fields.")
        console.log(this.password, this.confirmpassword, this.email);
      }
    });
  }
}
