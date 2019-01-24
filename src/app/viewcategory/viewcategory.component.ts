import { Component, OnInit ,ElementRef,ViewChild,NgZone } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';
import { GooglePlacesDirective } from '../google-places.directive';
// import {} from '@types/googlemaps';
declare var sweetAlert: any;
declare var $: any;
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { parse } from 'path';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {
  crdDeals=[]
  totalDeals=[]
  id:any;
  errMsg:any
  noSearchDeals:any
  userdetails=[];
  specifyCategory=[]
  getSearchDeals=[]
  querydetails : any = {};
  totalDeals1:any;
  noSearchDealsErr:any
  queryString:any;
  p:any;
  errMsg1:any;
  submitted:any;
  public addrKeys: string[];
  public addr: {
    formatted_address:'',
    locality : ''
  };
 
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
       console.log(this.addr.locality)
    });
  }
  constructor(private route:ActivatedRoute,private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,
  private router:Router,public zone:NgZone) { }

  ngOnInit() {
    
  // alert('1')
   this.loadingCtrl.show();
    this._dealService.getDeals()
       .subscribe(
         res =>{ 
          
           let j = 0;
           this.crdDeals = res
         //  alert('2')
        //   this.loadingCtrl.hide();
           this.id = this.route.snapshot.params['id']
           console.log(this.id)
          
           for(let i=0;i<this.crdDeals.length;i++){
           console.log(this.id)
           console.log(this.crdDeals)
          // this.loadingCtrl.show();
             if( this.id == this.crdDeals[i].categoryId){
              this.totalDeals[j] = this.crdDeals[i];
              console.log(this.totalDeals)
              j++;
           //   alert('3')
             this.loadingCtrl.hide();
             }
           }
           if (this.totalDeals.length == 0){
            this.loadingCtrl.show();
            this.errMsg = "Currently no deals available"
            console.log(this.errMsg)
           document.getElementById('hidePagination').style.display="none";
           document.getElementById('hideSearchDiv').style.display="none";
           document.getElementById('hideFilterButton').style.display="none";
       this.loadingCtrl.hide();
       // alert('4')
          }
          console.log(this.totalDeals)
         },
         err =>{
       //    this.loadingCtrl.hide();
           console.log(err)
         } 
       )
     
  }
 
  getGoogleAddress(){
    var pacContainerInitialized = false; 
    $('#searchLocation').keypress(function() { 
            if (!pacContainerInitialized) { 
                    $('.pac-container').css('z-index', '9999'); 
                    pacContainerInitialized = true; 
            } 
    }); 
  }

  filterDeal(){
  //  alert('1')
    this.totalDeals1 = [];
    this.loadingCtrl.show();
    console.log(this.userdetails)
    this.getSearchDeals = this.totalDeals
    this.querydetails = this.userdetails
    this.refreshGrid();
   this.loadingCtrl.hide();
   
  }
  refreshGrid(){
    console.log(this.querydetails.searchLocation)
    if(this.addr != null || this.addr != undefined){
    this.querydetails.searchLocation = this.addr.locality
    }
    console.log(this.querydetails.searchLocation)
   // alert('2')
   this.loadingCtrl.show();
    // alert(this.addr.locality)
    let j =0;
    // if(this.addr != null || this.addr != undefined){
    //   this.addr.locality = this.addr.locality;
    // }else{
    //   this.addr.locality = 'hh';
    // }

    for(let i=0; i < this.getSearchDeals.length; i++){
    if(this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty || (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price)) ||(this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price)) || this.querydetails.searchLocation == this.getSearchDeals[i].avlPlace.locality){
     
      this.loadingCtrl.hide();
      //  alert("1")
      console.log(this.getSearchDeals[i])
      this.totalDeals1[j] = this.getSearchDeals[i]
  // alert('3')
      console.log(this.totalDeals1[j])
      j++;
      this.errMsg1 = ""
      document.getElementById('hidePagination').style.display="block";
      this.userdetails = [];
    }
 
  //  this.loadingCtrl.hide();
  }
   if(this.totalDeals1.length == 0){
   //  alert("4")
    console.log('no deals')
    sweetAlert("Sorry!","Currently no product available","error")
    this.errMsg1 = "Please search again"
    document.getElementById('hidePagination').style.display="none";
    this.userdetails = [];
  }
 
 
  this.userdetails = [];
  
  }

}
