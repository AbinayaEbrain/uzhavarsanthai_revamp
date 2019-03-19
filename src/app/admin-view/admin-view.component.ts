import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  id: any;
  postProduct = [];
  viewPost = [];
  productId: any;
  descrip: any;
  public registerUser: any = [];
  public register: any = {};
  postLength: any;
  errMsg: any;
  p: any;
  queryString: any;
  locality: any;
  admin_area_l1: any;
  city: any;

  constructor(
    private _dealsService: DealsService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        this.registerUser = res;
        console.log(this.registerUser);
        for (let i = 0; i < this.registerUser.length; i++) {
          if (this.id == this.registerUser[i]._id) {
            this.register.firstName = this.registerUser[i].firstname;
            this.register.lastName = this.registerUser[i].lastName;
            this.register.gender = this.registerUser[i].gender;
            this.register.phone = this.registerUser[i].phone;
            this.register.address = this.registerUser[i].address.addressLine;
            this.city = this.registerUser[i].address.city.formatted_address;
            this.register.privateIP = this.registerUser[i].privateIP;
          }
        }
        this.register.city = this.city.split(',')[0];
        this.register.state = this.city.split(',')[1];
      },
      err => {
        console.log(err);
      }
    );

    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        this.viewPost = res;
        let j = 0;
        for (let i = 0; i < this.viewPost.length; i++) {
          if (this.id == this.viewPost[i].accountId) {
            this.postProduct[j] = this.viewPost[i];
            //length
            this.productId = this.postProduct[j]._id;
            j++;
          }
        }
        this.postLength = this.postProduct.length;

        if (this.postLength == 0) {
          this.errMsg = 'No post found';
        }
      },
      err => console.log(err)
    );
  }

  modalDes(_id) {
    // alert(this.productId)
    // alert("1")
    // alert(_id)
    for (let i = 0; i < this.postProduct.length; i++) {
      if (_id == this.postProduct[i]._id) {
        this.descrip = this.postProduct[i].description;
      }
    }
  }
}
