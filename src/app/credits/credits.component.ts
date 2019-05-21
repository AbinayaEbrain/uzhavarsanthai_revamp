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
  errMsg: any;
  credits: any = {};
  creditsArr = [];

  constructor(
    private _dealsService: DealsService,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.creditsArr.length; i++) {
      this.creditsArr.push(`deal ${i}.0`);
    }
  }

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
            console.log(res[i]);
            this.credits = res[i];
            this.creditsArr = res[i].creditDetails;
          }
        }
        console.log(this.creditsArr.length);

        if (this.creditsArr.length == 0 || this.creditsArr == [] || this.creditsArr == undefined) {
                      console.log(this.creditsArr);
          this.errMsg = 'You have not posted products yet!';
        } else {
          this.creditsArr = this.creditsArr.reverse();
        }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }
}
