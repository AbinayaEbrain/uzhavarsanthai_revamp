import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DealsService } from '../deals.service';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('forgotpwdform') mytemplateForm1: NgForm;
  @ViewChild('pwdform') mytemplateForm2: NgForm;
  loggedUser = [];
  @ViewChild('editForm') form;
  currentuserId: any;
  public dummyname: any = {};
  submitted: boolean;
  firstnam = '';
  success: any;
  id: any;
  checkpassword = false
  notOldpwderr : any;
  otpObj: any = {};
  currentusername: any;
  public crntUser: any = {};
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  public address: any;
  adrss: any;
  addrs: any;
  pwd : any;
  googleAddress: any;
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
    public loadingCtrl: NgxSpinnerService,
    private router: Router,
    private _users: DealsService,
    private route: ActivatedRoute,
    public zone: NgZone
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
//document.getElementById('focusDiv').focus();
    
// setTimeout(() => {
//   this.callback();
// }, 1000);
 // this.InitialCall();
  this.id = JSON.parse(localStorage.getItem('currentUser'))._id;

  this._users.getSingleUser(this.id).subscribe(
    data => {
      console.log(data);
      this.crntUser = data;
      if((this.crntUser.address.addressLine == "" || this.crntUser.address.addressLine == null) || (this.crntUser.address.city == ""
    || this.crntUser.address.city == undefined || this.crntUser.address.city == "Not yet update")){
          this.crntUser.address.addressLine = "Not yet update";
          this.crntUser.address.city = " Not yet update";
          // this.crntUser.address.city.formatted_address = " Not yet update";
          console.log(this.crntUser.address.city)
          console.log(this.crntUser.address.addressLine)
    }
      this.loadingCtrl.hide();
    },
    err => {
      console.log(err);
      this.loadingCtrl.hide();
    }
  );
//this.callback();
this.pwd = JSON.parse(localStorage.getItem('currentUser')).password;
  }

callback(){
  
  // this._users.getDetails().subscribe(
  //   res => {
  //     this.loggedUser = res;

  //     console.log(this.loggedUser)
  //     for (let i = 0; i < this.loggedUser.length; i++) {
  //       if (this.id == this.loggedUser[i]._id) {
  //         this.crntUser = this.loggedUser[i];
  //         console.log(this.crntUser)
  //       }
  //     }

  //     if((this.crntUser.address.addressLine == "" || this.crntUser.address.addressLine == null) || (this.crntUser.address.city == ""
  //   || this.crntUser.address.city == undefined || this.crntUser.address.city == "Not yet update")){
  //         this.crntUser.address.addressLine = "Not yet update";
  //         this.crntUser.address.city = " Not yet update";
  //         // this.crntUser.address.city.formatted_address = " Not yet update";
  //         console.log(this.crntUser.address.city)
  //         console.log(this.crntUser.address.addressLine)
  //     }
  //     this.loadingCtrl.show();

  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
}


  updateUser() {
    this.loadingCtrl.show();
    localStorage.setItem('firstname', JSON.stringify(this.crntUser.firstname));
    console.log(this.addr != undefined || this.addr != null)
    if (this.addr != undefined || this.addr != null) {
      this.crntUser.address.city = this.addr;
    }
    console.log(this.crntUser);

    this._users.updateCustomer(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
        // localStorage.setItem('currentUser', JSON.stringify(this.crntUser));
        this.updatePostName();
        this.updateReviewSellerName();
        this.updateReviewBuyerName();
        this.loadingCtrl.hide();
        this.success = 'Updated successfully!';
        setTimeout(() => {
          this.success = '';
          if(this.checkpassword == true){
            document.getElementById("closePwdModal").click();
            this._authService.logoutUser();
            this.router.navigate(['/login']);
          }
        }, 2000);
      },
      err => {
        console.log(err);
      }
    );
  }

  updatePostName() {
    console.log(this.id);
    this._users.updatePostName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateReviewSellerName() {
    console.log(this.id);
    this._users.updateReviewSellerName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateReviewBuyerName() {
    console.log(this.id);
    this._users.updateReviewBuyerName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  handleInput(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return true;
    return false;
  }

  InitialCall() {
    for (let i = 0; i < this.loggedUser.length; i++) {
      if (this.id == this.loggedUser[i]._id) {
        this.crntUser.firstname = this.loggedUser[i].firstname;
        this.crntUser.lastName = this.loggedUser[i].lastName;
        this.crntUser.gender = this.loggedUser[i].gender;
        this.crntUser.address.addressLine = this.loggedUser[i].address.addressLine;
        this.crntUser.address.address1 = this.loggedUser[i].address.address1;
        //this.crntUser.address.city.formatted_address = this.loggedUser[i].address.city.formatted_address;
      }
    }
    console.log(this.crntUser);
  }

  onSubmit() {
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();
    this.InitialCall();
  }

  changePwd(){
    document.getElementById("openChangePwdModal").click();
      this.notOldpwderr = '';
      this.mytemplateForm1.reset();
      this.mytemplateForm2.reset();
      document.getElementById("firstDiv").style.display = 'block';
      document.getElementById("secondDiv").style.display = 'none';
  }
  verifyPwd(){
    if(this.crntUser.oldotp == this.pwd){
      this.notOldpwderr = '';
      document.getElementById("secondDiv").style.display = 'block';
      document.getElementById("firstDiv").style.display = 'none';
      this.checkpassword = true;
    }else{
      this.notOldpwderr = 'You have entered wrong password'
    }
  }
}
