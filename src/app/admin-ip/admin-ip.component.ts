import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-ip',
  templateUrl: './admin-ip.component.html',
  styleUrls: ['./admin-ip.component.css']
})
export class AdminIpComponent implements OnInit {

  crdDeals=[];
  errMsg:any;
  registerUser=[];
  ipAdrs = [];
  p:any;

  constructor(private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.crdDeals.length; i++) {
      this.crdDeals.push(`deal ${i}.0`);
    }
   }

  ngOnInit() {
document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();

    this._dealsService.getDeals()
    .subscribe(
      res =>{
      this.loadingCtrl.hide();
        this.crdDeals = res

        for(let i=0;i<this.crdDeals.length;i++){
          if(this.crdDeals[i].ipAddress !== undefined && this.crdDeals[i].ipAddress !== null){
            let vari = this.crdDeals[i].ipAddress
            if(vari == this.crdDeals[i].ipAddress){
              // alert("1")
            }
          }
        }

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
