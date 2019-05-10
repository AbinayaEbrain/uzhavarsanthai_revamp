import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  id: any;
  credits: any = {};
  creditsArr: any = [];

  constructor(
    private _dealsService: DealsService,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getUser();
  }

  getUser() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.id == res[i]._id) {
            this.credits = res[i];
            this.creditsArr = res[i].creditDetails;
            console.log(this.creditsArr);
            this.creditsArr = this.creditsArr.reverse();
          }
        }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }
}
