import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.css']
})
export class AdminSubscriptionComponent implements OnInit {
  @ViewChild('subcription') myForm: NgForm;
  subcriptionData: any = {};
  subscriptionArr: any = [];
  id = '';

  constructor(private _dealsService: DealsService) {}

  ngOnInit() {
    this.getSubscription();
  }

  getSubscription() {
    this._dealsService.getSubscription().subscribe(
      res => {
        console.log(res);
        this.subscriptionArr = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    let date = new Date().getTime();
    this.subcriptionData.createdAt = date;
    console.log(this.subcriptionData);
    if (this.id) {
      this._dealsService
        .editSubscription(this.subcriptionData, this.id)
        .subscribe(
          data => {
            console.log(data);
            this.id = '';
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this._dealsService.addsubscription(this.subcriptionData).subscribe(
        res => {
          console.log(res);
          this.myForm.reset();
          document.getElementById('closeCancelOrderModal').click();
          this.getSubscription();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getSingleSubsc(id) {
    this.id = id;
    this._dealsService.getSingleSubscription(id).subscribe(
      data => {
        console.log(data);
        this.subcriptionData = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
