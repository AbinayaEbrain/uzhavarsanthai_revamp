import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-dispute',
  templateUrl: './admin-dispute.component.html',
  styleUrls: ['./admin-dispute.component.css']
})
export class AdminDisputeComponent implements OnInit {
  @ViewChild('disputeForm') mytemplateForm: NgForm;
  disputeArr: any = [];
  disputeObj: any = {};
  disputeObj1: any = {};
  solution: any;
  id: any;

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.getdispute();
  }

  getdispute() {
    this.disputeArr = [];
    this._dealService.getdispute().subscribe(
      data => {
        console.log(data);
        let j = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].disputeStatus == 'Created') {
            this.disputeArr[j] = data[i];
            j++;
          }
        }
        console.log(this.disputeArr);
        this.loadingCtrl.hide();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

  getSingleDispute(id) {
    this.id = id;
    this._dealService.getSingleDispute(id).subscribe(
      data => {
        console.log(data);
        this.disputeObj1 = data;
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

  disputeUpdate() {
    this.loadingCtrl.show();
    this.solution = this.disputeObj;
    console.log(this.disputeObj1);
    this.disputeObj = this.disputeObj1;
    this.disputeObj.disputeStatus = 'Resolved';
    this.disputeObj.solution = this.solution.solution;

    let curntDte = new Date().getTime();
    this.disputeObj.createdAt = curntDte;

    console.log(this.disputeObj);
    this._dealService.updateDispute(this.disputeObj, this.id).subscribe(
      data => {
        console.log(data);
        this.disputeObj.disputeId = this.id;
        // this.solution = data.solution;
        this.updatePostDispute();
        this.mytemplateForm.reset();
        document.getElementById('closeCancelOrderModal').click();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

  updatePostDispute() {
    this.disputeObj.solution = this.solution.solution;
    console.log(this.disputeObj);
    this._dealService
      .updatePostDisputeSolution(this.disputeObj, this.disputeObj.productId)
      .subscribe(
        data => {
          console.log(data);
          this.updateUserDispute();
          this.updateUserSellerDispute();
        },
        err => {
          console.log(err);
          this.loadingCtrl.hide();
        }
      );
  }

  updateUserDispute() {
    this.disputeObj.solution = this.solution.solution;
    console.log(this.disputeObj);
    this._dealService
      .updateUserDisputeSolution(this.disputeObj, this.disputeObj.buyerId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
          this.loadingCtrl.hide();
        }
      );
  }

  updateUserSellerDispute() {
    this.disputeObj.solution = this.solution.solution;
    console.log(this.disputeObj);
    this._dealService
      .updateSellerUserDisputeSolution(
        this.disputeObj,
        this.disputeObj.disputerId
      )
      .subscribe(
        data => {
          console.log(data);
          this.getdispute();
          this.loadingCtrl.hide();
        },
        err => {
          console.log(err);
          this.loadingCtrl.hide();
        }
      );
  }
}
