import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router'
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {

 
  id = '';
  viewmore = [];
  viewPost = [];
  register = {
    firstName : '',
    lastName:'',
    phone:'',
    address:{
      addressLine:'',
      address1:'',
      city:{
        locality:'',
        admin_area_l1:'',
        formatted_address:''
      }
    }
  }
  time:any
  public postProduct: any = {};
 // public register: any = {};
  city:any
  state:any
  userName = '';

  constructor(private _dealsService:DealsService,private router:Router, private datePipe: DatePipe,private route:ActivatedRoute,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {

   //this.userName = JSON.parse(localStorage.getItem('currentUser')).firstname;

    this.id = this.route.snapshot.params['id']
    this.loadingCtrl.show();
      this._dealsService.getDeals()
        .subscribe(
          res=>{
           
            this.viewPost = res
            for(let i=0; i < this.viewPost.length; i++){
              if(this.id == this.viewPost[i]._id){
               this.postProduct.category =  this.viewPost[i].category;
               this.postProduct.name =  this.viewPost[i].name;
               this.postProduct.quantity = this.viewPost[i].quantity;
               this.postProduct.qnty = this.viewPost[i].qnty;
               this.postProduct.subQuantity = this.viewPost[i].subQuantity
               this.postProduct.subqnty = this.viewPost[i].subqnty
               this.postProduct.price = this.viewPost[i].price;
               this.postProduct.description = this.viewPost[i].description;
               this.postProduct.avlPlace = this.viewPost[i].avlPlace.locality;
               this.postProduct.accountId = this.viewPost[i].accountId;
               this.postProduct.image = this.viewPost[i].image
               this.time = this.viewPost[i].validityTime
               this.loadingCtrl.hide();
              }
            }
            this.postProduct.validityTime = this.datePipe.transform((this.time),'dd/MM/yyyy');
          },
          err=> console.log(err)
        )
       
        this._dealsService.getDetails()
        .subscribe(
          res => {
           
            
            this.viewmore = res;
            for(let i=0; i < this.viewmore.length; i++){
              if(this.postProduct.accountId == this.viewmore[i]._id){
               this.register.firstName =  this.viewmore[i].firstname;
               this.register.lastName =  this.viewmore[i].lastName;
               this.register.phone = this.viewmore[i].phone;
               this.register.address.addressLine = this.viewmore[i].address.addressLine;
               this.register.address.address1 = this.viewmore[i].address.address1;
               this.city = this.viewmore[i].address.city;
                this.loadingCtrl.hide();
              }
            }
            this.register.address.city.locality = this.city.locality
            this.register.address.city.admin_area_l1 = this.city.admin_area_l1
            this.register.address.city.formatted_address = this.city.formatted_address
            console.log(this.viewmore)
            console.log(this.register.address.city.locality )
            console.log(this.register.address.city.formatted_address )
            console.log(this.register.address.city.admin_area_l1 )
          },
          err => console.log(err)
        )
  }

}
