import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-user-deals',
  templateUrl: './user-deals.component.html',
  styleUrls: ['./user-deals.component.css']
})
export class UserDealsComponent implements OnInit {

  crdDeals = [];
  userName = {};
  userDeals = [];

  constructor(private  _dealsService:DealsService) { }

  ngOnInit() {

    this.userName = localStorage.getItem('currentUser');
    console.log(this.userName)
    this._dealsService.getDeals()
      .subscribe(
        res =>{
          let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
          let j = 0;
          
          this.crdDeals = res

          for(let i=0; i < this.crdDeals.length; i++){
            if(acntID == this.crdDeals[i].accountId){
              this.userDeals[j] = this.crdDeals[i];
              j++;
          console.log(this.crdDeals[i]);
          console.log(this.userDeals[j])
            }
          }
        },
        err => console.log(err)
      )
  }

}
