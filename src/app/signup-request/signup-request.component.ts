import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-request',
  templateUrl: './signup-request.component.html',
  styleUrls: ['./signup-request.component.css']
})
export class SignupRequestComponent implements OnInit {

  signupUser = [];
  userCategory :any = [];
  userCategory2 : any = {};
  userCategory1 : any = {};
  id: any;
  errorMsg = '';
  successMsg = '';
  successMsg1 = '';
  d:any;

  constructor(
    private _dealService: DealsService,
    private _auth: AuthService
  ) {
    for (let i = 1; i <= this.userCategory.length; i++) {
      this.userCategory.push('Angular ${i}.0');
    }
  }

  ngOnInit() {
    this.getSignupReq();
  }

  getSignupReq(){
    this._dealService.getDetails().subscribe(res =>{
    console.log(res);
    this.signupUser = res;
    this.getBalanceUser();
    },err =>{
      console.log(err);
    });
  }

  getBalanceUser(){
    let j = 0;
    for (let i=0; i< this.signupUser.length; i++){
      if (this.signupUser[i].roleStatus == 'Deactive'){
        this.userCategory[j] = this.signupUser[i];
        console.log(this.userCategory)
        j++;
      }
    }
    if (this.userCategory.length == 0) {
      this.errorMsg = 'No signup request';
    }
  }

singleUpdateSignupReq(id){
  this.id = id;
  for (let i = 0; i < this.userCategory.length; i++) {
    if (this.id == this.userCategory[i]._id) {
     this.userCategory2 = this.userCategory[i];

    }
  }
  document.getElementById('btn1').click();
  console.log(this.userCategory2)
}

  updateSignupReq(id) {
    this.id = id;
    console.log(this.id)
    for (let i = 0; i < this.userCategory.length; i++) {
      if (this.id == this.userCategory[i]._id) {
       this.userCategory1 = this.userCategory[i];

      }
    }
    this.userCategory1.roleStatus = 'Active';
    this.userCategory1.role = 'seller';
    console.log(this.userCategory1);
       this._dealService.updateCustomer(this.userCategory1, this.id).subscribe(
      res => {
        console.log(res);
           this.successMsg = 'Accepted user request';
              setTimeout(() => {
                this.successMsg = '';
              }, 2000);
        if (res) {
          this._auth.sendSignUpreqst(this.userCategory1).subscribe(
            data => {
              console.log(data);
              this.getSignupReq();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSignupRejReq(id) {
    this.id = id;
    console.log(this.id)
    for (let i = 0; i < this.userCategory.length; i++) {
      if (this.id == this.userCategory[i]._id) {
       this.userCategory1 = this.userCategory[i];

      }
    }
    this.userCategory1.roleStatus = 'Rejected';
    console.log(this.userCategory1);
       this._dealService.updateCustomer(this.userCategory1, this.id).subscribe(
      res => {
        console.log(res);
        this.successMsg1 = 'Rejected user request';
              setTimeout(() => {
                this.successMsg1 = '';
              }, 2000);
        this.getSignupReq();
      },
      err => {
        console.log(err);
      }
    );
  }

}
