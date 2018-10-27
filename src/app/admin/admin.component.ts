import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'
import { AdminService } from '../admin.service';
import { DealsService } from '../deals.service';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cateData={}
  totalDetail=[]
  totalDeals=[]
  length:any
  dealsLength:any

  constructor(private router:Router,private _adminService:AdminService,private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
  }, 1000);
   

  this._dealsService.getDetails()
  .subscribe(
    res=>{
      this.totalDetail = res
      console.log(this.totalDetail.length)
      let variabl = (this.totalDetail.length)-1
      this.length = variabl
    },
    err=>{
      console.log(err)
    }
  )

  //get deals
  this._dealsService.getDeals()
  .subscribe(
    res=>{
      this.totalDeals = res
      console.log(this.totalDeals.length)
      this.dealsLength = this.totalDeals.length
    },
    err=>{
      console.log(err)
    }
  )

  }
  
  addCategory(){
    
    this.loadingCtrl.show();
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
          console.log(this.cateData)
          console.log(res);
          
          this.loadingCtrl.hide();
       },
        err =>{
          this.loadingCtrl.hide();
          console.log(err)
        }
        
     
      )
  }


  register(){
    this.router.navigate(['/register']);
  }




}

