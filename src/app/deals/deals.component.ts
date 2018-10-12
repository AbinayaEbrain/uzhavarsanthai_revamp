import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  crdDeals = [];
  userName = {};

  constructor(private _dealsService:DealsService,private router:Router) { }

  ngOnInit() {

    this.userName = localStorage.getItem('currentUser');
    console.log(this.userName)
    this._dealsService.getDeals()
      .subscribe(
        res => this.crdDeals = res,
        err => console.log(err)
      )
  }

  // viewMore(){
  //   this.router.navigate[('/viewmore')]
  // }
}
