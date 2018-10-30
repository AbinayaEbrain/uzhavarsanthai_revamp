import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service'
@Component({
  selector: 'app-admin-deals',
  templateUrl: './admin-deals.component.html',
  styleUrls: ['./admin-deals.component.css']
})
export class AdminDealsComponent implements OnInit {

  crdDeals=[];

  constructor(private _dealsService:DealsService) { }

  ngOnInit() {

    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
       // this.loadingCtrl.hide();
        this.crdDeals = res
      },
      err=>{
        console.log(err)
      }
    )
  }

}
