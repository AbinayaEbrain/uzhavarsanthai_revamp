import { Component, OnInit,ViewChild, PLATFORM_INITIALIZER, ElementRef,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router'
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'

declare var $: any;
declare let ClientIP: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  privateIP ;
  publicIP;
  private postform;
  deals = [];
  categoryArr :any;
  subCateArr = [];
  productData = {
    name:'',
    quantity:'',
    price:'',
    accountId:'',
    qnty:'',
    subQuantity:'',
    subqnty:'',
    category:'',
    categoryId:'',
    date: new Date().getTime(),
    ipAddress:'',
    avlPlace:{
      avlplaceName:'',
      latitude:'',
      longtitude:''

    },
    description:''
  };
  id:any;
  @ViewChild('search') public searchElement: ElementRef
  dealslists = [];
  success: any
  success1:any
  geocoder:any
  latite:any
  longti:any
  showUnit:any
  submitted:boolean;
  
  constructor(private _dealsService:DealsService,private http: HttpClient,private route:Router,private router:ActivatedRoute,public loadingCtrl: NgxSpinnerService) {
    this.privateIP = ClientIP;

    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip'];
    });

   this.productData.qnty = '';
   this.productData.category ='';
   this.productData.subqnty = '';
   this.productData.avlPlace.avlplaceName = ''
   this.productData.categoryId = ''
  // this.productData.category. = ''
  
   }

  
  ngOnInit() {

  //  this.getDropDownDatas();
    this.id = this.router.snapshot.params['id']

    // if(this.id == null){
    //   //alert("dsfg");
    //   document.getElementById('update').style.display='none';
    // }
    this.loadingCtrl.show();
    this._dealsService.getDeals()
  .subscribe(
    res=>{
      this.loadingCtrl.hide();
      this.dealslists = res
      
      for(let i=0; i < this.dealslists.length; i++){
        if(this.id == this.dealslists[i]._id){
          this.productData.category = this.dealslists[i].category
          this.productData.name = this.dealslists[i].name
          this.productData.quantity = this.dealslists[i].quantity
          this.productData.qnty = this.dealslists[i].qnty
          this.productData.price = this.dealslists[i].price
          this.productData.description = this.dealslists[i].description
          this.productData.avlPlace = this.dealslists[i].avlPlace
          this.productData.avlPlace = this.dealslists[i].subqnty
          this.productData.avlPlace = this.dealslists[i].subQuantity
        }
      }

    },
    err=>{
      this.loadingCtrl.hide();
      console.log(err)
    }
  )


  //category

  this._dealsService.getCategory()
      .subscribe(
          res => {
            this.categoryArr = res;
            console.log(this.categoryArr)
          },
      
          err => {
              this.categoryArr = [];
          });


//subcategory
  //  this._dealsService.getSubCategory()
  //      .subscribe(
  //          res => {
  //            this.subCateArr = res;
  //            console.log(this.subCateArr)
  //           },
          
  //            err => {
  //              this.subCateArr = [];
  //            });
    
              
}

      
  postProduct(){

    this.productData.avlPlace.latitude = JSON.parse(localStorage.getItem('Address'));
    this.productData.avlPlace.longtitude = JSON.parse(localStorage.getItem('Address1'));
    this.productData.accountId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.productData.ipAddress = this.privateIP;
   
    console.log(this.productData.categoryId)

    for(let i=0;i<this.categoryArr.length;i++){
      if(this.productData.categoryId == this.categoryArr[i]._id){
        this.productData.category = this.categoryArr[i].productCategory
        console.log(this.productData.category)
      }
    }

    //alert(this.productData.ipAddress)
    let curntDte = new Date().getTime();
    this.productData.date = curntDte
    //  acntId = accountId;
    this._dealsService.addPost(this.productData)
      .subscribe(
        res=>{
       console.log(this.productData)
       console.log(this.productData.categoryId)
       console.log(new Date())
        console.log(res);
        //this.route.navigate[('/deals')]

        this.success = "Posted successfully!"
      
        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.route.navigate(['user-deals']);
          this.loadingCtrl.hide();
      }, 2000);
    },
      err =>{
          if(err instanceof HttpErrorResponse){
           if(err.status === 401){
            this.loadingCtrl.show();
             this.route.navigate(['/login'])
             this.loadingCtrl.hide();
           }
          }
        }

      )
  }

  getunits(){
    this.showUnit =this.productData.qnty
   
  }

  getLatitudeLongitude1(callback, address) {
    //alert('jfgfg')
        // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
        address = address || 'Ferrol, Galicia, Spain';
        // Initialize the Geocoder
        this.geocoder = new google.maps.Geocoder();
        if (this.geocoder) {
        //alert('1')
        this.geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                 //alert(status);
                 callback(results[0]);
                
                    console.log(results)
                    // let result = results.geometry.location.lat();
                    // console.log(result)
                }
            });
        }
    }

    getLatitudeLongitude(){
             let address =  this.productData.avlPlace.avlplaceName
             this.getLatitudeLongitude1(this.showResult,address) 
    }

    showResult(result) {
      // this.latite=result.geometry.location.lat()
      // this.longti=result.geometry.location.lng()
      localStorage.setItem('Address', JSON.stringify(result.geometry.location.lat()));
      localStorage.setItem('Address1', JSON.stringify(result.geometry.location.lng()));
      console.log(result.geometry.location.lat())
      console.log(result.geometry.location.lng())
      //callback(this.postProduct)
    }

  update(){
    //console.log(this.deallistobj)
    let curntDte = new Date().getTime();
    this.productData.date = curntDte
    this._dealsService.editDeals(this.productData,this.id)
    .subscribe(

      res=>{console.log(this.productData)
 
        this.success1 = "Updated successfully!"

        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.route.navigate(['user-deals']);
          this.loadingCtrl.hide();
      }, 2000);
      },
      err=>console.log(err),

    )
  }
    
  

  handleInput(evt)
			{
				var charCode = (evt.which) ? evt.which : evt.keyCode;
				if (charCode != 46 && charCode > 31 
				&& (charCode < 48 || charCode > 57))
				return true;
				return false;
      } 
     
      
}
