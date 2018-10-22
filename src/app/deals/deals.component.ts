import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router'
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  crdDeals = [];
  userName = {};
  errMsg = "";

  constructor(private _dealsService:DealsService,private route:Router,public loadingCtrl: NgxSpinnerService) {
    // for(let i=1;i<=1; i++){
     //  this.crdDeals.push('Angular ${i}.0');
     // }
    // }
   }

  ngOnInit() {

   // this.userName = JSON.parse(localStorage.getItem('currentUser'));
   //console.log(this.userName)
   this.loadingCtrl.show();
    this._dealsService.getDeals()
      .subscribe(
        res =>{  this.loadingCtrl.hide();
          this.crdDeals = res
        },
        err => console.log(err)
      )
     
      if (this.crdDeals == null){
        this.errMsg = "Still you didn't post any deals"
        document.getElementById('search_box').style.display='none';
        console.log(this.errMsg)
      }
  }


  // viewMore(){
  //   this.router.navigate[('/viewmore')]
  // }
}
