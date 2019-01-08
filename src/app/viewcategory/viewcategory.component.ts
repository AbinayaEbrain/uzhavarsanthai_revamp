import { Component, OnInit ,NgZone } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';
import {} from '@types/googlemaps';
declare var sweetAlert: any;
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

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
  querydetails:any;
  totalDeals1 = [];
  noSearchDealsErr:any
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
    });
  }
  constructor(private route:ActivatedRoute,private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,
  private router:Router,public zone:NgZone) { }

  ngOnInit() {
    
    this.loadingCtrl.show();
    this._dealService.getDeals()
       .subscribe(
         res =>{ 
           this.loadingCtrl.hide();
           let j = 0;
           this.crdDeals = res
           this.id = this.route.snapshot.params['id']
           console.log(this.id)
          
           for(let i=0;i<this.crdDeals.length;i++){
           console.log(this.id)
           console.log(this.crdDeals)
             if( this.id == this.crdDeals[i].categoryId){
              this.totalDeals[j] = this.crdDeals[i];
              console.log(this.totalDeals)
              j++;
              
             }
           }
           if (this.totalDeals.length == 0){
            this.loadingCtrl.hide();
            this.errMsg = "Currently no deals available"
            console.log(this.errMsg)
           document.getElementById('hidePagination').style.display="none";
           document.getElementById('hideSearchDiv').style.display="none";
           document.getElementById('hideFilterButton').style.display="none";
           
          }
          console.log(this.totalDeals)
         },
         err =>{
           this.loadingCtrl.hide();
           console.log(err)
         } 
       )
     
  }
 

  filterDeal(){
    this.totalDeals1 = [];
    this.loadingCtrl.show();
    console.log(this.userdetails)
    this.getSearchDeals = this.totalDeals
    this.querydetails = this.userdetails
    this.refreshGrid();
    this.loadingCtrl.hide();
  }
  refreshGrid(){
   
    this.loadingCtrl.show();
    let j =0;
    for(let i=0; i < this.getSearchDeals.length; i++){
    if(this.querydetails.searchmainquantity <= this.getSearchDeals[i].quantity ||  this.querydetails.searchqnty == this.getSearchDeals[i].qnty || this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||  (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) || this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))){
      this.loadingCtrl.hide();
      //  alert("1")
      console.log(this.getSearchDeals[i])
      this.totalDeals1[j] = this.getSearchDeals[i]
      console.log(this.totalDeals1[j])
      j++;
      this.userdetails = [];
    }else if(this.totalDeals1.length == 0){
      // alert("2")
      console.log('no deals')
      // Swal({
      //   type: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!',
      //   footer: '<a href>Why do I have this issue?</a>'
      // })
      sweetAlert("Currently no product available")
      this.userdetails = [];
    }
 
    this.loadingCtrl.hide();
  }
 
 
  this.userdetails = [];
  
  }

}
