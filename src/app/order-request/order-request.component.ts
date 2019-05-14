import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.css']
})
export class OrderRequestComponent implements OnInit {

  userOrderReq = [];
  successMsg: any;
  errorMsg: any;
  userCategory: any = [];
  userOrderReq1: any = [];
  userOrderReq2: any = [];
  d:any;
  id: any;


  constructor(
    private _dealService: DealsService,
    private _auth: AuthService,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.userOrderReq.length; i++) {
      this.userOrderReq.push('Angular ${i}.0');
    }
   }

  ngOnInit() {
    this.getSignupReq()
  }

  getSignupReq(){
    this.userOrderReq1 = [];
    this.loadingCtrl.show();
    this._dealService.getOrderRequest().subscribe(res =>{
    console.log(res);
    this.userOrderReq = res;
    this.loadingCtrl.hide();

    let j = 0;
    for (let i = 0; i < this.userOrderReq.length; i++) {
      if (this.userOrderReq[i].sellerStatus != 'Closed' && this.userOrderReq[i].status != 'Closed' ) {
        this.userOrderReq1[j] = this.userOrderReq[i];
        j++;
      }
    }
    console.log(this.userOrderReq1);
    },err =>{
      console.log(err);
    });
  }



  singleUpdateSignupReq1(id) {
    this.id = id;
    for (let i = 0; i < this.userOrderReq1.length; i++) {
      if (this.id == this.userOrderReq1[i]._id) {
        this.userOrderReq2 = this.userOrderReq1[i];
      }
    }
    console.log(this.userOrderReq2);
  }

  closeOrderRequest(){
    console.log(this.id);
    this.loadingCtrl.show();
      this.userOrderReq2.sellerStatus = 'Closed';
      this.userOrderReq2.status = 'Closed';
      this._dealService.updateOrderRequestStatus(this.userOrderReq2,this.id).subscribe(
     res => {
       console.log(res);
       this.getSignupReq();
       this.loadingCtrl.hide();
     },
     err => {
       console.log(err);
     }
   );
  }

}
