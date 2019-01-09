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
  errMsg:any
 //imageSrc = require('../../../server/uploads/photo-1544505995155.jpg');
  imageSrc:any

  constructor(private _dealService:DealsService,public loadingCtrl: NgxSpinnerService,) { }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealService.getCategory()
    .subscribe(
        res => {
      
         
          this.categoryArr = res;
          this.loadingCtrl.hide();
          if(this.categoryArr.length == 0){
            this.errMsg = "No category added"
          }
        // this.imageSrc = require('../../../server/uploads' + this.categoryArr);
       // this.imageSrc = JSON.parse(localStorage.getItem('image_c'))
        },
        err => {
         this.loadingCtrl.hide();
           // this.categoryArr = [];
        });

        
  }

}
