declare function require(string);
import { Component ,ViewChild,OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

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

    var CLOUDINARY_URL = 	'https://api.cloudinary.com/v1_1/uzhavar-image/upload'
    var CLOUDINARY_UPLOAD_PRESET = 'm0xlfiw2'
    var imgPreview = document.getElementById('img-preview')
    var fileUpload = document.getElementById('file-upload')

    fileUpload.addEventListener('change' , function(e : any){
      var file = e.target.files[0];
      var formData = new FormData();
      formData.append('file',file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    
      axios({
        url : CLOUDINARY_URL,
        method : 'POST',
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data : formData
      }).then(function(res){
        console.log(res)

        // this.img_post = res.data.secure_url;
        localStorage.setItem('Image', JSON.stringify(res.data.secure_url));
        
      }).catch(function(err){
        console.log(err)
      });
    
    });
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
