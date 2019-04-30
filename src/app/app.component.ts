declare function require(string);
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, RoutesRecognized } from '@angular/router';
import {
  AgmCoreModule,
  GoogleMapsAPIWrapper,
  AgmInfoWindow,
  AgmDataLayer,
  CircleManager,
  AgmCircle
} from '@agm/core';

//  var request = require("request");
var url = 'https://geoip-db.com/json';
declare var swal: any;
declare let ClientIP: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild(GoogleMapsAPIWrapper) private gmapWrapper: GoogleMapsAPIWrapper;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
  isTracking: boolean;
  currentuserId: any;
  username: any;
  public previousUrl: any;
  privateIP: any;

  constructor(
    public _authService: AuthService,
    public loadingCtrl: NgxSpinnerService,
    private router: Router
  ) {
    this.privateIP = ClientIP;
    localStorage.setItem('privateIP', JSON.stringify(this.privateIP));

    this.router.events
      .filter(event => event instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        this.previousUrl = event[0].urlAfterRedirects;
      });
  }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/register', { role: 'seller' }]);
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition(position => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showTrackingPosition(position) {
    console.log(
      `tracking postion:  ${position.coords.latitude} - ${
        position.coords.longitude
      }`
    );
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    localStorage.setItem('googleLat', JSON.stringify(this.currentLat));
    localStorage.setItem('googleLong', JSON.stringify(this.currentLong));
    let location = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    this.gmapWrapper.panTo(position);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    } else {
      this.marker.setPosition(location);
    }
  }
}
