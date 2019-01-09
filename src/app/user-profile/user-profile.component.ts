import { Component, OnInit,ViewChild ,NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router'
import { DealsService } from '../deals.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedUser=[]
  @ViewChild('editForm') form
  currentuserId:any;
  public dummyname: any = {};
  submitted:boolean;
  firstnam = '';
  success:any
  id:any;
  currentusername:any;
  public crntUser: any = {
    address : {
      addressLine:'',
      city : {
        formatted_address : '',
      }
    }
  };
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };
  public address:any;
  adrss:any;
  addrs:any;
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
    });
  }

  constructor(private http: HttpClient,public loadingCtrl: NgxSpinnerService,private router:Router,private _users:DealsService,private route:ActivatedRoute,public zone:NgZone) { }

  ngOnInit() {
    this.loadingCtrl.show();
    this.InitialCall();
   // console.log(this.InitialCall)
    this.id = this.route.snapshot.params['id']
    this._users.getDetails()
    .subscribe(
      res=>{
        this.loggedUser = res
        this.loadingCtrl.hide();
        console.log(this.loggedUser)
        for(let i=0;i<this.loggedUser.length;i++){
         this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id
          console.log(this.currentuserId)
          if( this.currentuserId == this.loggedUser[i]._id){
            this.crntUser.firstname = this.loggedUser[i].firstname;
            this.crntUser.lastName = this.loggedUser[i].lastName;
            this.crntUser.gender = this.loggedUser[i].gender;
            this.crntUser.address.addressLine =  this.loggedUser[i].address.addressLine;
            this.crntUser.address.address1 = this.loggedUser[i].address.address1;
            this.crntUser.address.city.formatted_address = this.loggedUser[i].address.city.formatted_address;
            this.crntUser.password = this.loggedUser[i].password;
            this.crntUser.phone = this.loggedUser[i].phone;
          }
        }
      },
      err=>{
        console.log(err)
      }
    )
   
  }

  updateUser(){
this.loadingCtrl.show();
    console.log(this.addr)
    if(this.addr != undefined || this.addr != null){
      this.crntUser.address.city = this.addr
    }
    console.log(this.crntUser)
    console.log(this.id)
   
    this._users.updateCustomer(this.crntUser,this.id)
    .subscribe(
      res=>{
        console.log(res)
        this.loadingCtrl.hide();
        this.success = "Updated successfully!"
        setTimeout(() => {
          this.success = ''
       }, 1000);
      },
      err =>{
        console.log(err)
      }
    )
  }
 
  handleInput(evt)
  {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
    return true;
    return false;
  } 
  
  InitialCall() {
    console.log(this.loggedUser)
    for(let i=0; i < this.loggedUser.length; i++){
      if(this.id == this.loggedUser[i]._id){
        console.log(this.loggedUser[i])
        this.crntUser.firstname = this.loggedUser[i].firstname;
        this.crntUser.lastName = this.loggedUser[i].lastName;
        this.crntUser.gender = this.loggedUser[i].gender;
        this.crntUser.address.addressLine =  this.loggedUser[i].address.addressLine;
        this.crntUser.address.address1 = this.loggedUser[i].address.address1;
        this.crntUser.address.city.formatted_address = this.loggedUser[i].address.city.formatted_address;
      }
  }
}
  onSubmit(){
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();
    this.InitialCall(); 
  }

}
