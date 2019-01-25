declare function require(path: string);
import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../app.component'
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';


//https://uzhavarsanthai.herokuapp.com
const URL = 'http://localhost:5000/api/upload';

interface FileReaderEventTarget extends EventTarget {
  result:string
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  public cateData: any = {};
  @ViewChild('cateform') form
  categoryArr=[]
  id:any
  errMsg:any;
  public deallistobj: any = {};
  sucessMsg:any;
  p:any;
  url:any
  submitted:any;
  valid: boolean = false;
  Image: File;

  constructor(private _dealsService:DealsService,private _adminService:AdminService,public loadingCtrl: NgxSpinnerService,private _dealService:DealsService,private route:ActivatedRoute,private router:Router) { }

  onFileChange(event) { //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0]; //To get the image selected by the user
    this.valid = true;
 }

  ngOnInit() {
    this.loadingCtrl.show();
    this.InitialCall();
   //category

   this._dealService.getCategory()
   .subscribe(
       res => {
        this.loadingCtrl.hide();
         this.categoryArr = res;
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
    this._dealService.getCategory()
    .subscribe(
      res=>{
        this.categoryArr = res
        for(let i=0; i < this.categoryArr.length; i++){
          if(this.id == this.categoryArr[i]._id){
            this.deallistobj.productCategory = this.categoryArr[i].productCategory
            this.deallistobj.image = this.categoryArr[i].image
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
    postImage(){
      this.loadingCtrl.show();
      var image = new FormData(); //FormData creation
      image.append('Image', this.Image);
      //Adding the image to the form data to be sent
      this._dealsService.sendImage(image)
        .subscribe((res) => {
          console.log(res);
          this.loadingCtrl.hide();
          // localStorage.setItem('Image', JSON.stringify(res));
          this.cateData.image = res;
          console.log(this.cateData.image)
       });
    }

    updateImage(){
      this.loadingCtrl.show();
      var image = new FormData(); //FormData creation
      image.append('Image', this.Image);
      //Adding the image to the form data to be sent
      this._dealsService.sendImage(image)
        .subscribe((res) => {
          console.log(res);
          this.loadingCtrl.hide();
          // localStorage.setItem('Image', JSON.stringify(res));
          this.deallistobj.image = res;
          console.log(this.deallistobj.image)
       });
    }
    
  addCategory(){
    
    this.loadingCtrl.show();
    //this.cateData.image =  this.cateData.image
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
         
          this.sucessMsg="Category Added";
          
          setTimeout(()=>{
            this.sucessMsg = ''
            this.router.navigate[('/category')]
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
    update(){
      this._dealService.editCategory(this.deallistobj,this.id)
      .subscribe(
        res=>{
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
      localStorage.removeItem('Image')
    }

    onSubmit(){
     
      this.form.form.markAsPristine();
      this.form.form.markAsUntouched();
      this.form.form.updateValueAndValidity();
     
      this.InitialCall(); 
    }

   
}
