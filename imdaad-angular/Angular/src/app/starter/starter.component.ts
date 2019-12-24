import {
  Component,
  NgZone,
  ViewChild
} from '@angular/core';

import {
  CdkTextareaAutosize
} from '@angular/cdk/text-field';

import {
  take
} from 'rxjs/operators';

import {
  DataService
} from '../data.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})

export class StarterComponent {

  title: string;
  name: string;
  age: string;
  phoneNumber: string;
  description: string;
  requirements: string;
  documents: string;

  cause_result: Object;
  x: any;
  y: any;
  z: any;
  cause: any;


  constructor(private _data: DataService, private ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this._data.get_causes().subscribe(data => {

      this.cause_result = data;

      for (this.x in data) {
        this.y = data[this.x];
        console.log(this.y);
      }
    });
  }

  deleteCause(idz)
  {
      var ret: any;
      let ids = {
        id: idz
      };
      this._data.deleteCauseNew(ids).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Delete data successfully posted.')
      );
      console.log(ids.id);
      alert("The cause has been deleted!");
  }

  updateCause(idz) {
      var ret: any;
      let updatedCause = {
        id: idz,
        title: this.title,
        name: this.name,
        age: this.age,
        phoneno: this.phoneNumber,
        problem: this.description,
        req: this.requirements,
        documents: this.documents,
      };
      this._data.updateCauseNew(updatedCause).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Cause update data successfully posted.')
      );
      console.log(this.title);
      alert("Cause has been updated!");
      this.title = undefined;
      this.name = undefined;
      this.phoneNumber = undefined;
      this.description = undefined;
      this.requirements = undefined;
      this.age = undefined;
  }
}
