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

  constructor(private _dealsService: DealsService) {}

  ngOnInit() {}

  onSubmit() {
    let date = new Date().getTime();
    this.subcriptionData.createdAt = date;

    this._dealsService.addsubscription(this.subcriptionData).subscribe(
      res => {
        console.log(res);
        this.myForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }
}
