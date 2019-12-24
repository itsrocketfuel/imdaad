import {
  Component
} from '@angular/core';
import {
  CdkTextareaAutosize
} from '@angular/cdk/text-field';
import {
  NgZone,
  ViewChild
} from '@angular/core';
import {
  take
} from 'rxjs/operators';
import {
  DataService
} from '../../data.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {

  title: string;
  name: string;
  age: string;
  phoneNumber: string;
  description: string;
  requirements: string;
  documents: string;
  fname:string="Imdaad";
  email:string="noreply@imdaad.com";

  constructor(private ngZone: NgZone, private _data: DataService) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  cause() {
    if (this.title != undefined &&
      this.name != undefined &&
      this.phoneNumber != undefined &&
      this.description != undefined &&
      this.requirements != undefined &&
      this.title != "" &&
      this.name != "" &&
      this.phoneNumber != "" &&
      this.description != "" &&
      this.requirements != "") {
      var ret: any;
      let cause = {
        title: this.title,
        name: this.name,
        age: this.age,
        phoneno: this.phoneNumber,
        problem: this.description,
        req: this.requirements,
        documents: this.documents,
        semail:"noreply@imdaad.com",
        dname:"Imdaad"
      };
      this._data.create_cause(cause).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Cause data successfully posted.')
      );
      console.log(this.title);
      alert("Cause has been created! Other users will be able to see it in their news feeds now.");
      this.title = undefined;
      this.name = undefined;
      this.phoneNumber = undefined;
      this.description = undefined;
      this.requirements = undefined;
      this.age = undefined;
    } else {
      alert("Only documents and age can be left empty. Please enter the rest of the fields.");
    }
  }
}
