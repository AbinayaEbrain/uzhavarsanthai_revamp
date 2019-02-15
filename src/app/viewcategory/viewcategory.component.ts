import { Component, OnInit ,ElementRef,ViewChild,NgZone } from '@angular/core';
import {ActivatedRoute, Params,RoutesRecognized} from '@angular/router';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';
import { GooglePlacesDirective } from '../google-places.directive';
// import {} from '@types/googlemaps';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

declare var sweetAlert: any;
declare var $: any;

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
  public userdetails: any = [];
  specifyCategory=[]
  getSearchDeals=[]
  querydetails : any = {};
  totalDeals1:any;
  noSearchDealsErr:any
  queryString:any;
  p:any;
  e:any;
  errMsg1:any;
  submitted:any;
  public addrKeys: string[];
  public addr: {
    formatted_address:'',
    locality : ''
  };
  getCategory:any;
 
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }
  constructor(private route:ActivatedRoute,private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,
  private router:Router,public zone:NgZone) { 
    this.userdetails.searchqnty = ''
  }

  ngOnInit() {
    
  // alert('1')
   this.loadingCtrl.show();
    this._dealService.getDeals()
       .subscribe(
         res =>{ 
          
           let j = 0;
           this.crdDeals = res
           this.id = this.route.snapshot.params['id']
           for(let i=0;i<this.crdDeals.length;i++){
             if( this.id == this.crdDeals[i].categoryId){
              this.totalDeals[j] = this.crdDeals[i];
              this.getCategory = this.totalDeals[j].category
              j++;
             this.loadingCtrl.hide();
             }
           }
           if (this.totalDeals.length == 0){
            this.loadingCtrl.show();
            this.errMsg = "Currently no deals available"
           document.getElementById('hidePagination').style.display="none";
           document.getElementById('hideSearchDiv').style.display="none";
           document.getElementById('hideSelectedCategory').style.display="none";
           document.getElementById('hideFilterButton').style.display="none";
       this.loadingCtrl.hide();
          }
         },
         err =>{
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
    this.getSearchDeals = this.totalDeals
    this.querydetails = this.userdetails
    this.refreshGrid();
   this.loadingCtrl.hide();
   
  }
  refreshGrid(){
    if(this.addr != null || this.addr != undefined){
    this.querydetails.searchLocation = this.addr.locality
    }
   this.loadingCtrl.show();
    let j =0;
    for(let i=0; i < this.getSearchDeals.length; i++){
    if(this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty || (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price)) ||(this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price)) || this.querydetails.searchLocation == this.getSearchDeals[i].avlPlace.locality){
     
      this.loadingCtrl.hide();
      this.totalDeals1[j] = this.getSearchDeals[i]
      j++;
      this.errMsg1 = ""
      document.getElementById('hidePagination').style.display="block";
      this.userdetails = [];
    }
 
  //  this.loadingCtrl.hide();
  }
   if(this.totalDeals1.length == 0){
    sweetAlert("Sorry!","Currently no product available","error")
    this.errMsg1 = "Please search again"
    document.getElementById('hideSelectedCategory').style.display="none";
    document.getElementById('hidePagination').style.display="none";
    this.userdetails = [];
  }
  this.userdetails = [];
  }

  goToView(id){
    this.router.navigate(['/viewmore',id],this.id);
  }


}
