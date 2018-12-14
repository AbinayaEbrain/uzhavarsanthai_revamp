import { Component, OnInit,ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {} from '@types/googlemaps';


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
  //-------
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

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService){
   
  }

  ngOnInit() {
    this.loadingCtrl.show();
   this._dealsService.getDeals()
      .subscribe(
        res =>{ 
          this.loadingCtrl.hide();
          this.crdDeals = res
          console.log(this.crdDeals)
          console.log(this.crdDeals.length)

    if (this.crdDeals.length == 0){
        this.loadingCtrl.hide();
        this.errMsg = "Still you didn't post any deals"
        document.getElementById('hideButton').style.display='none';
        document.getElementById('search_box').style.display='none';
        console.log(this.errMsg)
      }

        },
        err =>{
          this.loadingCtrl.hide();
          console.log(err)
        } 
      )

      this._dealsService.getDetails()
      .subscribe(
        res =>{
          this.activeUsers = res
          console.log(this.activeUsers)
      
      let k =0;
      for(let i=0;i<this.activeUsers.length;i++){
        for(let j=0;j<this.crdDeals.length;j++){
        if(this.activeUsers[i]._id == this.crdDeals[j].accountId) {
            if(this.activeUsers[i].status == 'ACTIVE'){
              this.crdDeals1[k] = this.crdDeals[j]
              console.log(this.crdDeals1[k])
              console.log(this.crdDeals[j])
              k++;
            }
        }
      }
      }
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
