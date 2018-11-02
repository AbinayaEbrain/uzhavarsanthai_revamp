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
  ipAdrs = []

  constructor(private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService
  ) { }

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

    this._dealsService.getDetails()
    .subscribe(
      res=>{
       this.loadingCtrl.hide();
       this.registerUser= res;

    //  let j=0
    //      for(let i=0;i<this.registerUser.length;i++){
    //       if(this.registerUser[i].privateIP !== undefined || this.registerUser[i].privateIP !== null || this.registerUser[i].privateIP == 0){
            
    //         this.ipAdrs[j] = this.registerUser[i].privateIP
    //         console.log(this.ipAdrs[j])
    //        j++
    //       }
    //      }
      
       if(this.registerUser.length == 0){
         this.errMsg = "No users found"
         }
      },
      err=>{
       this.loadingCtrl.hide();
       console.log(err)
      }
    )
  }

}

