import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  deals = [];
  constructor(private _dealsService:DealsService) { }

  ngOnInit() {

    this._dealsService.getDeals()
      .subscribe(
        res => this.deals = res,
        err => console.log(err)
        
      )
  }

  
}
