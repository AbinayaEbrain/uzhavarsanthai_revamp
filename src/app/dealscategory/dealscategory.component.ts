declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dealscategory',
  templateUrl: './dealscategory.component.html',
  styleUrls: ['./dealscategory.component.css']
})
export class DealscategoryComponent implements OnInit {

  categoryArr=[{
    image:''
  }];
 //imageSrc = require('../../../server/uploads/photo-1544505995155.jpg');
  imageSrc:any

  constructor(private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,) { }

  ngOnInit() {
    this._dealService.getCategory()
    .subscribe(
        res => {
         this.loadingCtrl.hide();
         
          this.categoryArr = res;
          this.imageSrc = require('../../../server/uploads' + this.categoryArr);
          
         // console.log(this.imageSrc)
          console.log(this.categoryArr)
         
        },
        err => {
         this.loadingCtrl.hide();
           // this.categoryArr = [];
        });
  }

}
