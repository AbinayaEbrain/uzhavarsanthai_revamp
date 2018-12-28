import { Component, OnInit,ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-locationdeals',
  templateUrl: './locationdeals.component.html',
  styleUrls: ['./locationdeals.component.css']
})
export class LocationdealsComponent implements OnInit {
 
  @ViewChild('gmap')gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
   isTracking = false;
   status:any;
  crdDeals = [{
    avlPlace:{
      lat:'',
      lng:''
    },
    accountId:''
  }];
  mapDeals=[];
  activeUsers=[]
  userName = {};
  errMsg = "";
  lat2:any
  long:any
  lat1:any
  long1:any
  latd:any
  longd:any
  noLocationErr:any;
  crdDeals1= []
  p:any;
  queryString:any;

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
        this.loadingCtrl.hide();
        this.crdDeals = res

        this.lat2 = localStorage.getItem('googleLat')
        this.long = localStorage.getItem('googleLong')

        // if(this.lat2 == null){
        //   document.getElementById('hideButton').style.display='none';
        //   document.getElementById('showButton').style.display='block';
        // }
       
        this.lat1 = this.lat2*1.009
       //alert(this.lat1)
       
        this.latd = this.lat2/1.002
       // alert(this.latd)

        // console.log(this.crdDeals)
        // console.log(this.crdDeals.length)
        let j=0
        for(let i=0; i < this.crdDeals.length; i++){
          if(this.crdDeals[i].avlPlace.lat < this.lat1 && this.crdDeals[i].avlPlace.lng > this.latd){
              this.mapDeals[j]=this.crdDeals[i];
              console.log(this.mapDeals[j])
              j++
          }
        }

        // active deals

      this._dealsService.getDetails()
      .subscribe(
        res =>{
          this.activeUsers = res
        //  console.log(this.activeUsers)
    
        let k =0;

      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.mapDeals.length;j++){
        if(this.activeUsers[i]._id == this.mapDeals[j].accountId) {
            // alert("3")
            // alert(this.activeUsers[i].status)
            if(this.activeUsers[i].status == 'ACTIVE'){
             // alert("1")
              this.crdDeals1[k] = this.mapDeals[j]
              // console.log(this.crdDeals1[k])
              // console.log(this.mapDeals[j])
              //alert("2")
              k++;
            }
        }
      }
      }
      if(this.mapDeals.length == 0){
        this.noLocationErr = "No deals based on your location"
        document.getElementById('search_box').style.display='none';
  
       }
        },
        err=>{}
      )
     
      
      },
  
      
      err => {
        this.loadingCtrl.hide();
        console.log(err)
      }
    )
   
 
    // if (this.mapDeals == null){
    //   this.loadingCtrl.hide();
    //   this.errMsg = "Still you didn't post any deals"
    //   document.getElementById('search_box').style.display='none';
    //   console.log(this.errMsg)
    // }

  }


  trackMe() {
    alert("1")
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
}
