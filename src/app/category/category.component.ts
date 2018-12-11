import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

//const URL = 'http://localhost:3000/api/upload';
const URL = 'http://localhost:5000/api/upload';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

 public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  cateData={
    image:String
  }
  @ViewChild('cateform') form
  categoryArr=[]
  id:any
  errMsg:any;
  deallistobj={
    productCategory:''
  }
  sucessMsg:any;
  p:any;
  url:any
  submitted:any;

  constructor(private _adminService:AdminService,public loadingCtrl: NgxSpinnerService,private _dealService:DealsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false};

    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);

         localStorage.setItem('Image', JSON.stringify(response));
     };

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
    this.cateData.image = JSON.parse(localStorage.getItem('Image'));
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
          console.log(res);
         
          this.sucessMsg="Category Added";
          
          setTimeout(()=>{
            this.sucessMsg = ''
          },2000)
          
        
          this.loadingCtrl.hide();
         
         
       },
        err =>{
          this.loadingCtrl.hide();
          console.log(err)
        }

      )
      localStorage.removeItem('Image')
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

  //   onSelectFile(event) { // called each time file input changes
  //     if (event.target.files && event.target.files[0]) {
  //       var reader = new FileReader();
  
  //       reader.readAsDataURL(event.target.files[0]); // read file as data url
  
  //       reader.onload = (event) => { // called once readAsDataURL is completed
  //         this.url = event.target.result;
  //       }
  //     }
  // }

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
