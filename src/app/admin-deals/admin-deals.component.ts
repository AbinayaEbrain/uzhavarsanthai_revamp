import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-deals',
  templateUrl: './admin-deals.component.html',
  styleUrls: ['./admin-deals.component.css']
})
export class AdminDealsComponent implements OnInit {

  crdDeals=[];
  errMsg:any;
  p:any;
  constructor(private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.crdDeals.length; i++) {
      this.crdDeals.push(`deal ${i}.0`);
    }
   }

  ngOnInit() {

    this.loadingCtrl.show();

    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
      this.loadingCtrl.hide();
        this.crdDeals = res
        if(this.crdDeals.length == 0){
          this.errMsg = "No Posts Found"

        }
      },
      err=>{
        this.loadingCtrl.hide();
        console.log(err)
      }
    )
  }

}
