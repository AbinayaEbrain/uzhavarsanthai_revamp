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
  buyerDisputeArr: any = [];
  ticketArr: any = [];
  disputeBuyerDisputeArr: any = [];
  disputeTicketArr: any = [];
  disputeObj: any = {};
  disputeObj1: any = {};
  ticketObj: any = {};
  solution: any;
  id: any;
  errMsg: any;
  ticketId: any;
  successMsg: any;

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
        this.loadingCtrl.hide();
        let j = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].disputeStatus == 'Created') {
            this.disputeArr[j] = data[i];
            j++;
          }
        }
        console.log(this.disputeArr);
        this.getAlltickets();
      },
      err => {
        console.log(err);
      }
    );
  }

  // getBuyerDispute(){
  //   this._dealService.getBuyerDispute().subscribe(data =>{
  //     console.log(data);
  //     let j = 0;
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].disputeStatus == 'Created') {
  //         this.buyerDisputeArr[j] = data[i];
  //         j++;
  //       }
  //     }
  //     this.disputeBuyerDisputeArr = this.disputeArr.concat(this.buyerDisputeArr);
  //     this.getAlltickets();
  //   }, err =>{
  //     console.log(err);
  //   })
  // }

  getAlltickets() {
    this.ticketArr = [];
    this._dealService.getTickets().subscribe(
      data => {
        console.log(data);
        let j = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].ticketStatus == 'Open') {
            this.ticketArr[j] = data[i];
            j++;
          }
        }
        this.getDisputeTicketArr();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

  getDisputeTicketArr() {
    this.disputeTicketArr = this.disputeArr.concat(this.ticketArr);
    if (this.disputeTicketArr.length == 0) {
      this.errMsg = 'No Tickets';
    }
    this.loadingCtrl.hide();
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
          this.successMsg = "Ticket resolved successfully!";
          setTimeout(() => {
            this.successMsg = '';
          }, 3000);
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

  getSingleTicket(id) {
    this.ticketId = id;
    this._dealService.getSingleTicket(id).subscribe(
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

  ticketUpdate() {
    this.loadingCtrl.show();
    this.solution = this.ticketObj;
    console.log(this.disputeObj1);
    this.ticketObj = this.disputeObj1;
    this.ticketObj.ticketStatus = 'Resolved';
    this.ticketObj.solution = this.solution.solution;

    let curntDte = new Date().getTime();
    this.ticketObj.createddate = curntDte;

    console.log(this.ticketObj);
    this._dealService.updateTicket(this.ticketObj, this.ticketId).subscribe(
      data => {
        console.log(data);
        this.mytemplateForm.reset();
        document.getElementById('closeCancelOrderModal1').click();
        this.successMsg = "Ticket resolved successfully!";
        setTimeout(() => {
          this.successMsg = '';
        }, 3000);
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
