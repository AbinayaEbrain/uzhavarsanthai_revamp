import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {
  id = '';
  viewmore = [];
  viewPost = [];
  time: any;
  public postProduct: any = {};
  city: any;
  state: any;
  userName = '';
  adrsArray: any;
  public previousUrl: any;

  constructor(
    private _dealsService: DealsService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {}

  ngOnInit() {
    //this.userName = JSON.parse(localStorage.getItem('currentUser')).firstname;

    this.id = this.route.snapshot.params['id'];
    this.loadingCtrl.show();
    this._dealsService.getDeals().subscribe(
      res => {
        this.viewPost = res;
        console.log(this.viewPost);
        for (let i = 0; i < this.viewPost.length; i++) {
          if (this.id == this.viewPost[i]._id) {
            this.postProduct.category = this.viewPost[i].category;
            this.postProduct.name = this.viewPost[i].name;
            this.postProduct.quantity = this.viewPost[i].quantity;
            this.postProduct.qnty = this.viewPost[i].qnty;
            this.postProduct.subQuantity = this.viewPost[i].subQuantity;
            this.postProduct.subqnty = this.viewPost[i].subqnty;
            this.postProduct.price = this.viewPost[i].price;
            this.postProduct.description = this.viewPost[i].description;
            this.postProduct.avlPlace = this.viewPost[
              i
            ].avlPlace.formatted_address;
            this.postProduct.accountId = this.viewPost[i].accountId;
            this.postProduct.image = this.viewPost[i].image;
            this.time = this.viewPost[i].validityTime;
            this.postProduct.firstName = this.viewPost[i].username;
            this.postProduct.lastName = this.viewPost[i].lastname;
            this.postProduct.phone = this.viewPost[i].userNumber;
            this.postProduct.userAddressLine = this.viewPost[i].userAddressLine;
            this.postProduct.address = this.viewPost[i].userAddress;
            this.loadingCtrl.hide();
          }
        }
        this.postProduct.validityTime = this.datePipe.transform(
          this.time,
          'dd/MM/yyyy'
        );
      },
      err => console.log(err)
    );
  }

  goToBack() {
    this.location.back();
  }
}
