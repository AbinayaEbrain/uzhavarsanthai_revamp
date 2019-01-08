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
  public crntUser: any = {};
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };
  public address:any;
  adrss:any
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
    // alert("3")
    this.InitialCall();
   // console.log(this.InitialCall)
    this.id = this.route.snapshot.params['id']
  
    // this.InitialCall();
    //this.currentusername = JSON.parse(localStorage.getItem('currentUser')).firstname
    this._users.getDetails()
    .subscribe(
      res=>{
        this.loggedUser = res
        this.loadingCtrl.hide();
        console.log(this.loggedUser)
        for(let i=0;i<this.loggedUser.length;i++){
         this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id
          console.log(this.currentuserId)
          if(this.loggedUser[i]._id == this.currentuserId){
            this.crntUser = this.loggedUser[i]
           this.adrss = this.crntUser.address
           console.log(this.crntUser.address.addressLine)
          }
        }
       
       

      },
      err=>{
        console.log(err)
      }
    )
   
  }

  updateUser(){

    if(this.addr == null || this.addr == undefined){
      this.crntUser.address.city = this.adrss 
    }
    else{
      this.crntUser.address.city = this.addr
    }
    this._users.updateCustomer(this.crntUser,this.id)
    .subscribe(
      res=>{
        console.log(res)
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
    // alert("2")
    console.log(this.loggedUser)
    for(let i=0; i < this.loggedUser.length; i++){
      if(this.id == this.loggedUser[i]._id){
        console.log(this.loggedUser[i])
        this.crntUser = this.loggedUser[i]
      console.log(this.crntUser.firstname)
      console.log(this.crntUser)
      }

  
  }
}
  onSubmit(){
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();
  //  alert("1")
    this.InitialCall(); 
  }

}
