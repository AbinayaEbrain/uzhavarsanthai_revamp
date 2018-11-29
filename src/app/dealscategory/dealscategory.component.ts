import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dealscategory',
  templateUrl: './dealscategory.component.html',
  styleUrls: ['./dealscategory.component.css']
})
export class DealscategoryComponent implements OnInit {
  categoryArr=[]
  constructor(private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,) { }

  ngOnInit() {
    this._dealService.getCategory()
    .subscribe(
        res => {
         this.loadingCtrl.hide();
          this.categoryArr = res;
          console.log(this.categoryArr)
        },
        err => {
         this.loadingCtrl.hide();
            this.categoryArr = [];
        });
  }

}
