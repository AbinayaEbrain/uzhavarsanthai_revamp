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
  public userdetails: any = [];
  errMsg1:any;
  p:any;
  e:any;
  queryString:any;
  categoryArr:any;
  querydetails:any;
  totalDeals1:any;
  getSearchDeals=[];
  submitted:any;

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService) { 
    this.userdetails.searchqnty = ''
    this.userdetails.searchCategory =''
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
        
        this.crdDeals = res
        this.lat2 = localStorage.getItem('googleLat')
        this.long = localStorage.getItem('googleLong')
         this.lat1 = this.lat2*1.009
        this.latd = this.lat2/1.002
        let j=0
        for(let i=0; i < this.crdDeals.length; i++){
          if(this.crdDeals[i].avlPlace.lat < this.lat1 && this.crdDeals[i].avlPlace.lng > this.latd){
              this.mapDeals[j]=this.crdDeals[i];
              j++
              this.loadingCtrl.hide();
          }
        }

        // active deals

      this._dealsService.getDetails()
      .subscribe(
        res =>{
          this.loadingCtrl.show();
          this.activeUsers = res
        let k =0;

      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.mapDeals.length;j++){
        if(this.activeUsers[i]._id == this.mapDeals[j].accountId) {
            if(this.activeUsers[i].status == 'ACTIVE'){
              this.crdDeals1[k] = this.mapDeals[j]
              k++;
              this.loadingCtrl.hide();
            }
        }
      }
      }
      if(this.mapDeals.length == 0){
        this.loadingCtrl.show();
        this.noLocationErr = "No deals availble based on your location"
        document.getElementById('hidePagination').style.display="none";
        document.getElementById('hideSearchDiv').style.display="none";
        document.getElementById('hideFilterButton').style.display="none";
        this.loadingCtrl.hide();
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
  }
  getCategory(){
    this.loadingCtrl.show();
    this._dealsService.getCategory()
    .subscribe(
        res => {
          this.categoryArr = res;
          this.loadingCtrl.hide();
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
    this.querydetails = this.userdetails
    this.refreshGrid();
    this.loadingCtrl.hide();
  
  }

  refreshGrid(){
    //alert("2")
    this.loadingCtrl.show();
    let j =0;
    for(let i=0; i < this.getSearchDeals.length; i++){
    if(this.querydetails.searchCategory == this.getSearchDeals[i].categoryId || this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||  (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) || this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))){

      this.totalDeals1[j] = this.getSearchDeals[i]
      j++;
      this.errMsg1 = ""
      document.getElementById('hidePagination').style.display="block";
      this.loadingCtrl.hide();
      this.userdetails = [];
    
    }
   
    
 
   this.loadingCtrl.hide();
  }
 if(this.totalDeals1.length == 0){
  this.loadingCtrl.show();
    sweetAlert("Sorry!","Currently no product available","error")
    this.errMsg1 = "Please search again"
    document.getElementById('hidePagination').style.display="none";
    this.loadingCtrl.hide();
    this.userdetails = [];
  } 
 

  this.userdetails = [];
  
  }
}
