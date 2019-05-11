import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-admin-dispute',
  templateUrl: './admin-dispute.component.html',
  styleUrls: ['./admin-dispute.component.css']
})
export class AdminDisputeComponent implements OnInit {
  disputeArr: any = [];
  constructor(private _dealService: DealsService) {}

  ngOnInit() {
    this.getdispute();
  }

  getdispute() {
    this._dealService.getdispute().subscribe(
      data => {
        console.log(data);
        this.disputeArr = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
