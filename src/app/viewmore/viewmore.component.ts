import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {

  id = '';
  viewmore = [];
  register = {
    firstName : '',
    lastName:'',
    phone:'',
    address:{
      addressLine:'',
      address1:'',
      city:'',
      location:'',
    }
  }
  userName = '';

  constructor(private _dealsService:DealsService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

   //this.userName = JSON.parse(localStorage.getItem('currentUser')).firstname;

    this.id = this.route.snapshot.params['id']
      this._dealsService.getDetails()
        .subscribe(
          res=>{
            this.viewmore = res
           console.log(this.viewmore)
            for(let i=0; i < this.viewmore.length; i++){
              if(this.id == this.viewmore[i]._id){
                console.log(this.viewmore[i]._id)
               this.register.firstName =  this.viewmore[i].firstname;
               this.register.lastName =  this.viewmore[i].lastName;
               this.register.phone = this.viewmore[i].phone;
               this.register.address.addressLine = this.viewmore[i].address.addressLine;
               this.register.address.address1 = this.viewmore[i].address.address1;
               this.register.address.city = this.viewmore[i].address.city;
               this.register.address.location = this.viewmore[i].address.location;
              
              }
            }
          },
          err=> console.log(err)
        )
  }

}
