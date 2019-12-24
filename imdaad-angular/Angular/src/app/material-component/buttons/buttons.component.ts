import {
  Component
} from '@angular/core';

import {
  DataService
} from '../../data.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor(private _data: DataService) {}

  causeReports: Object;
  profileReports: Object;

  ngOnInit() {
    this._data.getCauseReports().subscribe(data => {

      this.causeReports = data;
    });
    this._data.getProfileReports().subscribe(data => {

      this.profileReports = data;
    });
  }

  deleteReportedProfile(idz)
  {
      var ret: any;
      let ids = {
        email: idz
      };
      this._data.deleteReportedProfileNew(ids).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Delete data successfully posted.')
      );
      console.log(ids.email);
      alert("The profile has been punished!");
  }

  deleteReportedCause(idz)
  {
      var ret: any;
      let ids = {
        title: idz
      };
      this._data.deleteReportedCauseNew(ids).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Delete data successfully posted.')
      );
      console.log(ids.title);
      alert("The cause has been deleted!");
  }

  ignoreReportedProfile(idz)
  {
      var ret: any;
      let ids = {
        id: idz
      };
      this._data.ignoreReportedProfileNew(ids).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Delete data successfully posted.')
      );
      console.log(ids.id);
      alert("The report has been removed!");
  }

  ignoreReportedCause(idz)
  {
      var ret: any;
      let ids = {
        id: idz
      };
      this._data.ignoreReportedCauseNew(ids).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Delete data successfully posted.')
      );
      console.log(ids.id);
      alert("The report has been removed!");
  }

}
