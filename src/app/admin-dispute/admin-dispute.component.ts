import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-dispute',
  templateUrl: './admin-dispute.component.html',
  styleUrls: ['./admin-dispute.component.css']
})
export class AdminDisputeComponent implements OnInit {
  disputeArr: any = [];
  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.getdispute();
  }

  getdispute() {
    this._dealService.getdispute().subscribe(
      data => {
        console.log(data);
        this.disputeArr = data;
        this.loadingCtrl.hide();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }
}
