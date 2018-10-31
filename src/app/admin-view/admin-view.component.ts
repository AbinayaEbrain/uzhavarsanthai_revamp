import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  id:any
  postProduct =[]
  viewPost = [];
  productId:any
  descrip:any

  constructor(private _dealsService:DealsService,private router:Router,private route:ActivatedRoute,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id']

    this._dealsService.getDeals()
    .subscribe(
      res=>{
        this.loadingCtrl.hide();
        this.viewPost = res
       console.log(this.viewPost.length)
       console.log(this.viewPost)
       let j=0
        for(let i=0; i < this.viewPost.length; i++){
          if(this.id == this.viewPost[i].accountId){
            this.postProduct[j] =  this.viewPost[i];
            console.log(this.postProduct[j])
            this.productId = this.postProduct[j]._id
            console.log(this.productId)
            j++
          }
        }
      },
      err=> console.log(err)
    )

  }

  modalDes(_id){
    // alert(this.productId)
    // alert("1")
    // alert(_id)
    for(let i=0; i < this.postProduct.length; i++){
      if(_id == this.postProduct[i]._id){
        this.descrip =  this.postProduct[i].description;
        console.log(this.postProduct[i].description)
        console.log(this.descrip)
      }
    }
  }

}
