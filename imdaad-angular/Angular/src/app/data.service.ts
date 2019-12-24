import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

//value = '192.168.43.96:6969/api'; //phone hotspot
var value = 'localhost:6969';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  register(user) {
    let body = JSON.stringify(user);
    let url = "http://"+value+"/api/register";
    return this.http.post(url, body, httpOptions);
  }

  login(user) {
    let body = JSON.stringify(user);
    let url = "http://"+value+"/api/login";
    return this.http.post(url, body, httpOptions);
  }

  result() {
    let url = "http://"+value+"/api/login_result";
    return this.http.get(url);
  }

  create_cause(cause) {
    let body = JSON.stringify(cause);
    let url = "http://"+value+"/api/addCause";
    return this.http.post(url, body, httpOptions);
  }

  addDropOff(dropoff) {
    let body = JSON.stringify(dropoff);
    let url = "http://"+value+"/api/addDropOff";
    return this.http.post(url, body, httpOptions);
  }

  get_causes() {
    let url = "http://"+value+"/api/get_causes";
    return this.http.get(url);
  }

  getCauseReports() {
    let url = "http://"+value+"/api/getCauseReports";
    return this.http.get(url);
  }

  getProfileReports() {
    let url = "http://"+value+"/api/getProfileReports";
    return this.http.get(url);
  }

  get_dropOffs() {
    let url = "http://"+value+"/api/get_dropOffs";
    return this.http.get(url);
  }

  deleteDropOff(id)
  {
    let body = JSON.stringify(id);
    let url = "http://"+value+"/api/deleteDropOff";
    return this.http.post(url, body, httpOptions);
  }

  deleteCauseNew(id)
  {
    let body = JSON.stringify(id);
    let url = "http://"+value+"/api/deleteCauseNew";
    return this.http.post(url, body, httpOptions);
  }

  deleteReportedCauseNew(ids)
  {
    let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/deleteReportedCauseNew";
    return this.http.post(url, body, httpOptions);
  }

  deleteReportedProfileNew(ids)
  {let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/deleteReportedProfileNew";
    return this.http.post(url, body, httpOptions);
  }

  ignoreReportedCauseNew(ids)
  {
    let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/ignoreReportedCause";
    return this.http.post(url, body, httpOptions);
  }

  approveDropOff(ids)
  {
    let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/approveDropOff";
    return this.http.post(url, body, httpOptions);
  }

  disApproveDropOff(ids)
  {
    let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/deleteDropOffApproval";
    return this.http.post(url, body, httpOptions);
  }

  getdropOffApprovals() {
    let url = "http://"+value+"/api/get_dropOffsApprovals";
    return this.http.get(url);
  }

  ignoreReportedProfileNew(ids)
  {let body = JSON.stringify(ids);
    let url = "http://"+value+"/api/ignoreReportedProfile";
    return this.http.post(url, body, httpOptions);
  }

  updateCauseNew(updatedCause)
  {
    let body = JSON.stringify(updatedCause);
    let url = "http://"+value+"/api/updateCauseNew";
    return this.http.post(url, body, httpOptions);
  }
}
