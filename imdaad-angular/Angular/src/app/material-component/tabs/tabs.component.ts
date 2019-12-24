import {Component,OnInit,
  ElementRef,
  NgZone,
  ViewChild,
  ViewEncapsulation} from '@angular/core';

import {Observable} from 'rxjs';

import {Title} from '@angular/platform-browser';

import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';

//import {} from 'googlemaps';

import PlaceResult = google.maps.places.PlaceResult;

import {
  MapsAPILoader,
  MouseEvent
} from '@agm/core';

import {
  MapsService
} from '../../maps.service';
import {
  DataService
} from '../../data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {

  public appearance = Appearance;
  public zoomx: number;
  public latitudex: number;
  public longitudex: number;
  public selectedAddress: PlaceResult;

  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;
  zoom: number = 15;
  label = "New Drop-Off";
  label2 = "Search Pin";
  title: String = "";
  phoneNumber: String = "";
  description: String = "";

  lat = undefined;
  lng = undefined;
  location: Object;

  lati;
  longi;

  dropOffs: Object;

  onChooseLocation(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.lati = event.coords.lat;
    this.longi = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(private map: MapsService, private _data: DataService, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private titleService: Title) {}

  ngOnInit() {

    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
 
    this.zoomx = 16;
    this.latitudex = 52.520008;
    this.longitudex = 13.404954;
 
    this.setCurrentPosition();

    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })

    this._data.getdropOffApprovals().subscribe(data => {

      this.dropOffs = data;
    })
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitudex = position.coords.latitude;
        this.longitudex = position.coords.longitude;
        this.zoomx = 16;
      });
    }
  }
  
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.zoomx = 16;
  }
  
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitudex = location.latitude;
    this.longitudex = location.longitude;
    this.zoomx = 16;
  }

  approveDropOff(idz) {
    var ret: any;
    let ids = {
      id: idz
    };
    this._data.approveDropOff(ids).subscribe(
      data => {
        ret = data
      },
      err => console.error(err),
      () => console.log('Approve data successfully posted.')
    );
    console.log(ids.id);
    alert("This request has been approved!");
  }

  deleteApproval(idz) {
    var ret: any;
    let ids = {
      id: idz
    };
    this._data.disApproveDropOff(ids).subscribe(
      data => {
        ret = data
      },
      err => console.error(err),
      () => console.log('Delete data successfully posted.')
    );
    console.log(ids.id);
    alert("This request has been deleted!");
  }

}
