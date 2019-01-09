import { Component, OnInit,ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
declare var sweetAlert: any;
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
  lat2:any
  long:any
  lat1:any
  long1:any
  latd:any
  longd:any
  noLocationErr:any;
  crdDeals1= []
  userdetails=[];
  p:any;
  queryString:any;
  categoryArr:any;
  querydetails:any;
  totalDeals1 = [];
  getSearchDeals=[];
  submitted:any;

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
        
        this.crdDeals = res
        this.lat2 = localStorage.getItem('googleLat')
        this.long = localStorage.getItem('googleLong')
         this.lat1 = this.lat2*1.009
       //alert(this.lat1)
      //  let geocoder = new google.maps.Geocoder;
      //   let latlng = {lat: this.lat2, lng: this.long};
      //   geocoder.geocode({'location': latlng}, (results, status) => {
      //     console.log(results); // read data from here
      //     console.log(status);
      //   });
        this.latd = this.lat2/1.002
       // alert(this.latd)

        console.log(this.crdDeals)
        // console.log(this.crdDeals.length)
        let j=0
        for(let i=0; i < this.crdDeals.length; i++){
          if(this.crdDeals[i].avlPlace.lat < this.lat1 && this.crdDeals[i].avlPlace.lng > this.latd){
              this.mapDeals[j]=this.crdDeals[i];
              this.loadingCtrl.hide();
              console.log(this.mapDeals[j])
              j++
          }
        }

        // active deals

      this._dealsService.getDetails()
      .subscribe(
        res =>{
          this.loadingCtrl.show();
          this.activeUsers = res
       console.log(this.activeUsers)
    
        let k =0;

      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.mapDeals.length;j++){
        if(this.activeUsers[i]._id == this.mapDeals[j].accountId) {
            // alert("3")
            // alert(this.activeUsers[i].status)
            if(this.activeUsers[i].status == 'ACTIVE'){
             // alert("1")
              this.crdDeals1[k] = this.mapDeals[j]
             
              console.log(this.crdDeals1[k])
              console.log(this.mapDeals[j])
              //alert("2")
              k++;
              this.loadingCtrl.hide();
            }
        }
      }
      }
      if(this.mapDeals.length == 0){
        this.noLocationErr = "No deals availble based on your location"
        document.getElementById('hidePagination').style.display="none";
        document.getElementById('hideSearchDiv').style.display="none";
        document.getElementById('hideFilterButton').style.display="none";
  
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
  getCategory(){
    this.loadingCtrl.show();
    this._dealsService.getCategory()
    .subscribe(
        res => {
          this.categoryArr = res;
          this.loadingCtrl.hide();
          console.log(this.categoryArr)
        },
    
        err => {
          this.loadingCtrl.hide();
            this.categoryArr = [];
        });
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

  filterDeal(){
    // alert("1")

    this.loadingCtrl.show();
    this.totalDeals1 = [];
    this.getSearchDeals = this.crdDeals1
    console.log(this.userdetails)
    this.querydetails = this.userdetails
    this.refreshGrid();
    this.loadingCtrl.hide();
  
  }

  refreshGrid(){
    //alert("2")
    this.loadingCtrl.show();
    let j =0;
    console.log(this.getSearchDeals)
    for(let i=0; i < this.getSearchDeals.length; i++){
     // alert("3")
    
      console.log(this.getSearchDeals[i].quantity)
    if(this.querydetails.searchCategory == this.getSearchDeals[i].categoryId || this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||  (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) || this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))){
    
      //alert("4")
      
      
      console.log(this.getSearchDeals[i])
      this.totalDeals1[j] = this.getSearchDeals[i]

      console.log(this.totalDeals1[j])
      j++;
      this.loadingCtrl.hide();
      this.userdetails = [];
    
    }
   
    
 
   this.loadingCtrl.hide();
  }
 if(this.totalDeals1.length == 0){
    console.log('no deals')
    sweetAlert("Sorry!","Currently no product available","error")
    this.userdetails = [];
  } 
 

  this.userdetails = [];
  
  }
}
