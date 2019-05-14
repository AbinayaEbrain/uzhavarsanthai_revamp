import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.css']
})
export class AdminSubscriptionComponent implements OnInit {
  subcriptionData : any = {};
  constructor(private _dealsService : DealsService) { }

  ngOnInit() {
  }
  onSubmit(){
    this._dealsService.addsubscription(this.subcriptionData).subscribe(
      res => {
         console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
