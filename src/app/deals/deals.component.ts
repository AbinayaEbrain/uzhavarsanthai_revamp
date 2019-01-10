import { Component, OnInit,ViewChild,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {} from '@types/googlemaps';
declare var sweetAlert: any;
declare var $: any;
// loader 

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
   categoryArr:any;
   totalDeals1 :any;
   userdetails=[];
  crdDeals = [{
    avlPlace:{
      latitude:'',
      longitude:''
    },
    accountId:''
  }];
  mapDeals=[];
  activeUsers=[]
  userName = {};
  errMsg = "";
  lat:any
  long:any
  lat1:any
  long1:any
  latd:any
  longd:any
  crdDeals1 = []
  queryString:any;
  p:any;
  getlat:any
  getlng:any
  getSearchDeals=[]
  querydetails:any;
  public addrKeys: string[];
  public addr: {
    formatted_address:'',
    locality : ''
  };
  submitted:any;
  panTo:any;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
       console.log(this.addr.locality)
    });
  }
  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService,public zone:NgZone){
   
  }

  ngOnInit() {
    //alert('1')
    this.loadingCtrl.show();
   
    document.getElementById('showBackButton').style.display="none";
    
   this._dealsService.getDeals()
      .subscribe(
        res =>{ 
          //alert('2')
         
          this.crdDeals = res
         // alert('3')
          this.loadingCtrl.hide();
    if (this.crdDeals.length == 0){
      
        this.errMsg = "Currently no deals available"
        document.getElementById('hidePagination').style.display="none";
        document.getElementById('hideSearchDiv').style.display="none";
        document.getElementById('hideFilterButton').style.display="none";
        document.getElementById('hideNearByBtn').style.display="none";
        document.getElementById('showBackButton').style.display="block";
     //   this.loadingCtrl.hide();
      
      }

        },
        err =>{
         // this.loadingCtrl.hide();
          console.log(err)
        } 
      )

      this._dealsService.getDetails()
      .subscribe(
        res =>{
        this.loadingCtrl.show();
          this.activeUsers = res
          //console.log(this.activeUsers)
      
      let k =0;
      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.crdDeals.length;j++){
        if(this.activeUsers[i]._id == this.crdDeals[j].accountId) {
            if(this.activeUsers[i].status == 'ACTIVE'){
              this.crdDeals1[k] = this.crdDeals[j]
              k++;
             this.loadingCtrl.hide();
            }
        }
      }
      }
      console.log( this.crdDeals1)
        },
        err=>{}
      )
     
       var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      // tracking location 
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
          this.showPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
  }

  getCategory(){

    var pacContainerInitialized = false; 
    $('#searchLocation').keypress(function() { 
            if (!pacContainerInitialized) { 
                    $('.pac-container').css('z-index', '9999'); 
                    pacContainerInitialized = true; 
            } 
    });
    this._dealsService.getCategory()
    .subscribe(
        res => {
          
          this.categoryArr = res;
          this.loadingCtrl.hide();
          console.log(this.categoryArr)
        },
    
        err => {
            this.categoryArr = [];
        });
  }

  filterDeal(){
    this.loadingCtrl.show();
    this.totalDeals1 = [];
    this.getSearchDeals = this.crdDeals
    console.log(this.userdetails)
    this.querydetails = this.userdetails
    this.refreshGrid();
    this.loadingCtrl.hide();
  }

  refreshGrid(){
    this.loadingCtrl.show();
    console.log(this.querydetails.searchLocation)
    if(this.addr != null || this.addr != undefined){
    this.querydetails.searchLocation = this.addr.locality
    }
    let j =0;
    console.log(this.getSearchDeals)
    for(let i=0; i < this.getSearchDeals.length; i++){
      console.log(this.getSearchDeals[i].quantity)
    if(this.querydetails.searchCategory == this.getSearchDeals[i].categoryId || this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||  (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) || this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))  || this.querydetails.searchLocation == this.getSearchDeals[i].avlPlace.locality){
      console.log(this.getSearchDeals[i])
      this.totalDeals1[j] = this.getSearchDeals[i]
      console.log(this.totalDeals1[j])
      j++;
    this.loadingCtrl.hide();
    
    }
     
    
 
  
  }if(this.totalDeals1.length == 0){
  //  this.loadingCtrl.show();
    console.log('no deals')
    sweetAlert("Sorry!","Currently no product available","error")
  //  this.loadingCtrl.hide();
    this.userdetails = [];
  }
 
  this.userdetails = [];
  
  }

  findMe(){
  //   setTimeout( function(){
  //     location.reload()
  // }, 2000 );

  document.getElementById('hideButton').style.display='block';
  document.getElementById('showButton').style.display='block';
  // this.route.navigate[('/post')]
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
}
