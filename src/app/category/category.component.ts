import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealsService } from '../deals.service';
import {ActivatedRoute} from '@angular/router';
import {Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cateData={}
  categoryArr=[]
  id:any
  errMsg:any;
  constructor(private _adminService:AdminService,public loadingCtrl: NgxSpinnerService,private _dealService:DealsService,private route:ActivatedRoute,private router:Router) { }

  

  ngOnInit() {

    this.loadingCtrl.show();
   //category

   this._dealService.getCategory()
   .subscribe(
       res => {
        this.loadingCtrl.hide();
         this.categoryArr = res;
         console.log(this.categoryArr)
         if(this.categoryArr.length == 0){
           this.errMsg = "No Category Added"

         }
       },
   
       err => {
        this.loadingCtrl.hide();
           this.categoryArr = [];
       });

  }

  addCategory(){
    
    this.loadingCtrl.show();
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
          
          console.log(res);
         
          this.loadingCtrl.hide();
         
         
       },
        err =>{
          this.loadingCtrl.hide();
          console.log(err)
        }
        
     
      )
    }

    deleteuser(){
      this.id = this.route.snapshot.params['id']
      this._dealService.deleteCate(this.id)
      .subscribe(
         res=>{ console.log(res)
         
         
         },
         err=>{ console.log(err);
        },
      
      )
    }

}
