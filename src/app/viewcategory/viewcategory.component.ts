import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {
id:any;
errMsg = "";
viewCategory=[]
specifyCategory=[]
userData={}
categeoryName:string;
submitted:boolean;
crdDeals=[]
userdetails=[];
querydetails:any;
showUnit:any
p:any;
  constructor(private route:ActivatedRoute,private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,
  private router:Router) { }

  ngOnInit() {
    this.loadingCtrl.show();
    document.getElementById('hidePagination').style.display = 'none';
    document.getElementById('showButton').style.display = 'none';
    this.id = this.route.snapshot.params['id']
    this._dealService.getCategory()
    .subscribe(
      res=>{
        this.loadingCtrl.hide();
        this.viewCategory = res;
        // console.log(this.viewCategory)
        for(let i=0; i < this.viewCategory.length; i++){
          // console.log(this.viewCategory.length)
          if(this.id == this.viewCategory[i]._id){
            this.categeoryName = this.viewCategory[i].productCategory;
            // console.log(this.categeoryName)

          }
        }

      },
      err=>{

      }
    )
  }

  showsearchdiv(){
    document.getElementById('hidesearch').style.display = 'block';
    document.getElementById('showButton').style.display = 'none';
 
  }


  filterDeal(){
    this.loadingCtrl.show();
    console.log(this.userdetails)
    this.querydetails = this.userdetails
    console.log(this.querydetails)
    document.getElementById('hidePagination').style.display = 'block';
    this._dealService.getDeals()
    .subscribe(
      res =>{ 
      document.getElementById('hidesearch').style.display ='none';
      document.getElementById('showButton').style.display ='block';
        this.loadingCtrl.hide();
        this.crdDeals = res
      
      let j =0;
        for(let i=0; i < this.crdDeals.length; i++){
          if(this.id == this.crdDeals[i].categoryId){
            if(this.querydetails.searchmainquantity <= this.crdDeals[i].quantity && this.querydetails.searchqnty == this.crdDeals[i].qnty && (this.querydetails.frmAmt <= parseFloat(this.crdDeals[i].price) && this.querydetails.toCost >= parseFloat(this.crdDeals[i].price))){
                this.specifyCategory[j] = this.crdDeals[i]
                console.log(this.specifyCategory[j])
                  j++;

                  
            }
          }
         
        }
        if(this.specifyCategory.length == 0){
          console.log('nodata')
          this.errMsg='Currently no products available based on your search '
          document.getElementById('hidePagination').style.display='none';
      }
},
      err =>{
        console.log(err)
      } 
    )
  }

}
