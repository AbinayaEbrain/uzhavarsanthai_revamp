declare function require(string);
import { Component ,ViewChild,OnInit } from '@angular/core';
import { AuthService } from './auth.service';
//  var request = require("request");
var url = "https://geoip-db.com/json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app';
  @ViewChild('gmap')gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
  isTracking:boolean

  constructor(public _authService:AuthService){}

  ngOnInit() {

  // var mapProp = {
  //   center: new google.maps.LatLng(18.5793, 73.8143),
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // };
  // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  //   // tracking location 
  //   if (navigator.geolocation) {

  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  }

  // findMe(){

  //     if (navigator.geolocation) {
        
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         this.showPosition(position);
  //       });
  //     } else {
  //       alert("Geolocation is not supported by this browser.");
  //     }
  //   }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    localStorage.setItem('googleLat', JSON.stringify(this.currentLat));
    localStorage.setItem('googleLong', JSON.stringify(this.currentLong));
    // console.log(this.currentLat)
    // console.log(this.currentLong)
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

    // showPosition(position) {
      
    //   this.currentLat = position.coords.latitude;
    //   this.currentLong = position.coords.longitude;
  
    //   console.log(this.currentLat)
    //   console.log(this.currentLong)
    //   localStorage.setItem('googleLat', JSON.stringify(this.currentLat));
    //   localStorage.setItem('googleLong', JSON.stringify(this.currentLong));
  
    //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   this.map.panTo(location);
  
    //   if (!this.marker) {
    //     this.marker = new google.maps.Marker({
    //       position: location,
    //       map: this.map,
    //       title: 'Got you!'
    //     });
    //   }
    //   else {
    //     this.marker.setPosition(location);
    //   }
    // }
}
