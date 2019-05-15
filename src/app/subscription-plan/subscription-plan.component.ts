import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
  subscriptionArr: any = [];
  subcriptionData:any = {};
  id:any;
  subcriptionId:any
  
  constructor(private _dealService: DealsService) {}

  ngOnInit() {
    this.getSubscription();
  }

  getSubscription() {
    this._dealService.getSubscription().subscribe(
      res => {
        console.log(res);
        this.subscriptionArr = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSingleSubsc(id) {
    this.id = id;
    this._dealService.getSingleSubscription(id).subscribe(
      data => {
        console.log(data);
        this.subcriptionId = data._id;
        this.subcriptionData = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
