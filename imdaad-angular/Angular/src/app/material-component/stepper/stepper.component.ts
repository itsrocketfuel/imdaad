import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Title} from '@angular/platform-browser';

import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';

//import {} from '@types/googlemaps';

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
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements OnInit {


  public appearance = Appearance;
  public zoomx: number;
  public latitudex: number;
  public longitudex: number;
  public selectedAddress: PlaceResult;
  /* titlex: string = 'AGM project';
   
   address: string;
   private geoCoder;

   @ViewChild('search')
   public searchElementRef: ElementRef; */


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

  dropOff_result: Object;

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
 
    this.zoomx = 10;
    this.latitudex = 52.520008;
    this.longitudex = 13.404954;
 
    this.setCurrentPosition();


    //load Places Autocomplete
    /* this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitudex = place.geometry.location.lat();
          this.longitudex = place.geometry.location.lng();
          this.zoomx = 12;
        });
      });
    });

 //   this.setCurrentLocation(); */

    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })

    this._data.get_dropOffs().subscribe(data => {

      this.dropOff_result = data;
    })
  }

  /* private setCurrentLocation() {
     if ('geolocation' in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitudex = position.coords.latitude;
         this.longitudex = position.coords.longitude;
         this.zoomx = 8;
         this.getAddress(this.latitudex, this.longitudex);
       });
     }
   }

   markerDragEnd($event: MouseEvent) {
     console.log($event);
     this.latitude = $event.coords.lat;
     this.longitude = $event.coords.lng;
     this.getAddress(this.latitudex, this.longitudex);
   }

   getAddress(latitudex, longitudex) {
     this.geoCoder.geocode({ 'location': { lat: latitudex, lng: longitudex } }, (results, status) => {
       console.log(results);
       console.log(status);
       if (status === 'OK') {
         if (results[0]) {
           this.zoomx = 12;
           this.address = results[0].formatted_address;
         } else {
           window.alert('No results found');
         }
       } else {
         window.alert('Geocoder failed due to: ' + status);
       }

     });
   }
  */

 private setCurrentPosition() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitudex = position.coords.latitude;
      this.longitudex = position.coords.longitude;
      this.zoomx = 12;
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



  submitDropOff() {
    if (this.title != undefined &&
      this.phoneNumber != undefined &&
      this.description != undefined &&
      this.lati != undefined &&
      this.longi != undefined &&
      this.title != "" &&
      this.phoneNumber != "" &&
      this.lati != "" &&
      this.longi != "" &&
      this.description != "") {
      var ret: any;
      let dropoff = {
        title: this.title,
        phoneno: this.phoneNumber,
        problem: this.description,
        lati: this.lati,
        longi: this.longi
      };
      this._data.addDropOff(dropoff).subscribe(
        data => {
          ret = data
        },
        err => console.error(err),
        () => console.log('Drop-off data successfully posted.')
      );
      console.log(this.title);
      alert("The drop-off location has been added to the maps. Thank you for your contribution!");
      this.title = undefined;
      this.phoneNumber = undefined;
      this.description = undefined;
    } else {
      alert("Please enter all fields.");
    }
  }

  deleteMarker(idz) {
    var ret: any;
    let ids = {
      id: idz
    };
    this._data.deleteDropOff(ids).subscribe(
      data => {
        ret = data
      },
      err => console.error(err),
      () => console.log('Delete data successfully posted.')
    );
    console.log(ids.id);
    alert("This marker has been deleted!");
  }
}
