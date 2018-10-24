import { Component, OnInit,ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {} from '@types/googlemaps';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})

export class DealsComponent implements OnInit {

  //for location 
  @ViewChild('gmap')gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
   isTracking = false;
   status:any;
  //-------
  crdDeals = [];
  userName = {};
  errMsg = "";
  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService){}

  ngOnInit() {
   this.loadingCtrl.show();
    this._dealsService.getDeals()
      .subscribe(
        res =>{  this.loadingCtrl.hide();
          this.crdDeals = res
        },
        err => console.log(err)
      )
     
      if (this.crdDeals == null){
        this.errMsg = "Still you didn't post any deals"
        document.getElementById('search_box').style.display='none';
        console.log(this.errMsg)
      }

      //current location 
      var mapProp = {
        center: new google.maps.LatLng(18.5793, 73.8143),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


//current location
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

   
  }



  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
console.log(this.currentLat)
console.log(this.currentLong)
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



   addNearByPlaces(latLng) {

    var nearByService = new google.maps.places.PlacesService(this.map);
  
    var request = {
      location: latLng,
      radius: 1000,
      types: ['food', 'bakery', 'cafe', 'grocery_or_supermarket', 'meal_delivery','restaurant', 'meal_takeaway', 'shopping_mall']
    };
  
    nearByService.nearbySearch(request, this.handleNearBySearchResults);
  }
  
  handleNearBySearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(results[i])
      //  createMarker(place.geometry.location, place);
      }
    }
  }


  
}
