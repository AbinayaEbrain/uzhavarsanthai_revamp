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
import { AuthService } from 'src/app/auth.service';


//https://uzhavarsanthai.herokuapp.com
const URL = 'https://uzhavarsanthai.herokuapp.com/api/upload';

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
  public trackInformationData: any = {};
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

  constructor(private _dealsService:DealsService,
              private _auth: AuthService,
              private _adminService:AdminService,
              public loadingCtrl: NgxSpinnerService,
              private _dealService:DealsService,
              private route:ActivatedRoute,
              private router:Router)
     { }

  onFileChange(event) { //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0]; //To get the image selected by the user
    console.log(this.Image);
    this.valid = true;
 }

  ngOnInit() {
        document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.InitialCall();
   //category

   this._dealService.getCategory()
   .subscribe(
       res => {
        this.loadingCtrl.hide();
         this.categoryArr = res;
         this.trackInformationData.response = 'Success';
         this.trackInformationData.apiName = 'category';
         this.postTrackInformation();
         if(this.categoryArr.length == 0){
           this.errMsg = "No Category Added"

         }
       },

       err => {
        this.loadingCtrl.hide();
           this.categoryArr = [];
           this.trackInformationData.response = 'Failure';
           this.trackInformationData.error = err.statusText;
           this.trackInformationData.apiName = 'category';
           this.postTrackInformation();
       });


       //update

       this.id = this.route.snapshot.params['id']
    this._dealService.getCategory()
    .subscribe(
      res=>{
        this.categoryArr = res;
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
        for(let i=0; i < this.categoryArr.length; i++){
          if(this.id == this.categoryArr[i]._id){
            this.deallistobj.productCategory = this.categoryArr[i].productCategory
            this.deallistobj.image = this.categoryArr[i].image
          }
        }

      },
      err=>{
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
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
          this.addCategory();
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
          this.update();
       });
    }

  addCategory(){

    this.loadingCtrl.show();
    //this.cateData.image =  this.cateData.image
    this._adminService.addCate(this.cateData)
      .subscribe(
       res =>{
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
          this.sucessMsg="Category Added";

          setTimeout(()=>{
            this.sucessMsg = ''
            this.router.navigate[('/category')]
          },2000)


          this.loadingCtrl.hide();


       },
        err =>{
          this.loadingCtrl.hide();
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'category';
          this.postTrackInformation();
        }

      )
     localStorage.removeItem('Image')
    }

    deleteuser(){
      this.id = this.route.snapshot.params['id']
      this._dealService.deleteCate(this.id)
      .subscribe(
         res=>{ console.log(res)
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'category';
          this.postTrackInformation();
         },
         err=>{ console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'category';
          this.postTrackInformation();
        },

      )
    }
    update(){
      this._dealService.editCategory(this.deallistobj,this.id)
      .subscribe(
        res=>{
          this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
         // this.success = "Updated successfully!"
          setTimeout(() => {
            // swal.close();
           // this.loadingCtrl.show();
            //this.router.navigate(['/category']);
           // this.loadingCtrl.hide();
        }, 3000);

        },
        err=>{console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'category';
          this.postTrackInformation();
        },

      )
      localStorage.removeItem('Image')
    }

    onSubmit(){

      this.form.form.markAsPristine();
      this.form.form.markAsUntouched();
      this.form.form.updateValueAndValidity();

      this.InitialCall();
    }

    postTrackInformation() {
      let tracking = this._auth.loggedIn()
      if(tracking){
        let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let token = localStorage.getItem('token');
        let UserName = localStorage.getItem('firstname');
        let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
        this.trackInformationData.UserId = acntID;
        this.trackInformationData.jwt = token;
        this.trackInformationData.ipAddress = ipAddress;
        this.trackInformationData.UserName = UserName;
      }else{
        this.trackInformationData.UserId = '';
        this.trackInformationData.jwt = '';
        this.trackInformationData.ipAddress = '';
        this.trackInformationData.UserName = '';
      }
      this.trackInformationData.apiCallingAt = new Date().getTime();
      this._dealsService
        .trackInformationPost(this.trackInformationData)
        .subscribe(data => {
          console.log(data);
        });
    }

}
