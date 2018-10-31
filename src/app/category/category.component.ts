import { Component, OnInit,ViewChild } from '@angular/core';
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
  @ViewChild('cateform') form
  categoryArr=[]
  id:any
  errMsg:any;
  deallistobj={
    productCategory:''
  }
  sucessMsg:any;

  constructor(private _adminService:AdminService,public loadingCtrl: NgxSpinnerService,private _dealService:DealsService,private route:ActivatedRoute,private router:Router) { }

  

  ngOnInit() {

    this.loadingCtrl.show();
    this.InitialCall();
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


       //update

       this.id = this.route.snapshot.params['id']
    // console.log(this.id)
    this._dealService.getCategory()
    .subscribe(
      res=>{
        this.categoryArr = res
         console.log(this.categoryArr)
        for(let i=0; i < this.categoryArr.length; i++){
          if(this.id == this.categoryArr[i]._id){
            this.deallistobj.productCategory = this.categoryArr[i].productCategory
            // console.log(this.deallistobj.productCatogory)
            // console.log( this.deallistobj.productName)
            // console.log(this.deallistobj.productQty )
            // console.log( this.deallistobj.productUnit)
            // console.log(this.deallistobj.productCost)
            // console.log(this.deallistobj.productDescription)
          }
        }

      },
      err=>{
        console.log(err)
      }
    )
  }

  InitialCall() {
    
    for(let i=0; i < this.categoryArr.length; i++){
      if(this.id == this.categoryArr[i]._id){
        
        this.deallistobj.productCategory = this.categoryArr[i].productCategory
       
      }
    }
  }

  addCategory(){
    
    this.loadingCtrl.show();
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
          
          console.log(res);
         
           
          
          setTimeout(()=>{
            this.sucessMsg="Category Added";
          },2000)
          
          this.router.navigate[('/category')]
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

    update(){
      console.log(this.deallistobj)
      this._dealService.editCategory(this.deallistobj,this.id)
      .subscribe(
        res=>{
          console.log(this.deallistobj),
  
         // this.success = "Updated successfully!"
          setTimeout(() => {
            // swal.close();
           // this.loadingCtrl.show();
            //this.router.navigate(['/category']);
           // this.loadingCtrl.hide();
        }, 3000);
        
        },
        err=>console.log(err),
  
      )
    }

    onSubmit(){
     
      this.form.form.markAsPristine();
      this.form.form.markAsUntouched();
      this.form.form.updateValueAndValidity();
     
      this.InitialCall(); 
    }
}
