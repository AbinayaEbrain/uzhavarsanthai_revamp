import { Component, OnInit,ViewChild, PLATFORM_INITIALIZER, ElementRef,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router'
import { AppComponent } from '../app.component'
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import {} from '@types/googlemaps';
import {  FileUploader } from 'ng2-file-upload';

// const URL = 'http://localhost:8080/api/upload';

declare var $: any;
declare let ClientIP: any;
declare var swal: any;
interface FileReaderEventTarget extends EventTarget {
  result:string
}

// interface FileReaderEvent extends Event {
//   target: FileReaderEventTarget;
//   getMessage():string;
// }

interface EventTarget { result: any; }

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  loading: boolean = false;
  valid: boolean = false;
  message: string = "";
  Image: File;
  imageSrc: string;
  privateIP ;
  publicIP;
  private postform;
  deals = [];
  currentuserId:any;
  categoryArr :any;
  subCateArr = [];
  time:any
  public productData: any = {};
  id:any;
  @ViewChild('avlplaceName') public searchElement: ElementRef
  dealslists = [];
  success: any
  success1:any
  geocoder:any
  latite:any
  longti:any
  showUnit:any
  submitted:boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };
  files:any
  url: ''
  

  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
    });
  }


  constructor(private _dealsService:DealsService,private http: HttpClient,private route:Router,private router:ActivatedRoute,public loadingCtrl: NgxSpinnerService,public zone:NgZone) {
    this.privateIP = ClientIP;

    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip'];
    });

   this.productData.qnty = '';
   this.productData.category ='';
   this.productData.subqnty = '';
  // this.productData.avlPlace.avlplaceName = ''
   this.productData.categoryId = ''
  
  
   }
   onFileChange(event) { //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0]; //To get the image selected by the user
    this.valid = true;
 }

   
  ngOnInit() {
this.loadingCtrl.show();
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id
  //   var CLOUDINARY_URL = 	'https://api.cloudinary.com/v1_1/uzhavar-image/upload'
  //   var CLOUDINARY_UPLOAD_PRESET = 'm0xlfiw2'
  //   var imgPreview = document.getElementById('img-preview')
  //   var fileUpload = document.getElementById('file-upload')
  
  //   fileUpload.addEventListener('change' , function(e : any){
  //      //alert('5')
  //      swal({   
  //       title:"",
  //       text: "Please wait a moment",     
  //       imageUrl:"../../assets/Images/lg.sandglass-time-loading-gif.gif" 
  //  });
  //     var file = e.target.files[0];
  //     var formData = new FormData();
  //     formData.append('file',file);
  //     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    
  //     axios({
        
  //       url : CLOUDINARY_URL,
  //       method : 'POST',
  //       headers : {
  //         'Content-Type' : 'application/x-www-form-urlencoded'
  //       },
  //       data : formData
  //     }).then(function(res){
  //       // alert('6')
  //      // this.loadingCtrl.show();
  //       console.log(res)
  //       console.log(res.data.secure_url)
  //       //this.loadingCtrl.hide();
  //      // alert('7')
  //       swal({   
  //         title: "Wow!",   
  //         text: "Image choosed successfully",   
  //         imageUrl:res.data.secure_url,
          
         
         
  //    });
  //       localStorage.setItem('Image', JSON.stringify(res.data.secure_url));
       
  //     }).catch(function(err){
  //       console.log(err)
  //     });
    
  //   });

  // //  this.getDropDownDatas();
  //   this.id = this.router.snapshot.params['id']

  //   this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false};

  //   //overide the onCompleteItem property of the uploader so we are 
  //   //able to deal with the server response.
  //   this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
  //        console.log("ImageUpload:uploaded:", item, status, response);

  //        localStorage.setItem('Image', JSON.stringify(response));
  //    };


    // if(this.id == null){
    //   //alert("dsfg");
    //   document.getElementById('update').style.display='none';
    // }
  //   this.loadingCtrl.show();
  //   setTimeout(() => {
  //     // swal.close();
  //     this.loadingCtrl.hide();
  // }, 1000);
  //   this._dealsService.getDeals()
  // .subscribe(
  //   res=>{
  //     this.loadingCtrl.hide();
  //     this.dealslists = res
      
  //     for(let i=0; i < this.dealslists.length; i++){
  //       if(this.id == this.dealslists[i]._id){
  //         this.productData.category = this.dealslists[i].category
  //         this.productData.name = this.dealslists[i].name
  //         this.productData.quantity = this.dealslists[i].quantity
  //         this.productData.qnty = this.dealslists[i].qnty
  //         this.productData.price = this.dealslists[i].price
  //         this.productData.description = this.dealslists[i].description
  //         this.productData.avlPlace = this.dealslists[i].avlPlace
  //         this.productData.subqnty = this.dealslists[i].subqnty
  //         this.productData.subQuantity = this.dealslists[i].subQuantity
  //         this.productData.validityTime =this.dealslists[i].validityTime
  //       }
  //     }

  //   },
  //   err=>{
  //     this.loadingCtrl.hide();
  //     console.log(err)
  //   }
  // )


  //category

  this._dealsService.getCategory()
      .subscribe(
          res => {
            this.categoryArr = res;
            this.loadingCtrl.hide();
            console.log(this.categoryArr)
          },
      
          err => {
              this.categoryArr = [];
          });
             
}
  
postImage(){
  console.log(this.productData)
  var image = new FormData(); //FormData creation
  image.append('Image', this.Image);
  //Adding the image to the form data to be sent
  this._dealsService.sendImage(image)
    .subscribe((res) => {
      console.log(res);
      // localStorage.setItem('Image', JSON.stringify(res));
      this.productData.image = res;
   });
   
    this.postProduct();
 
}
  postProduct(){
    this.loadingCtrl.show();
    console.log(this.productData)
    var time = this.productData.validityTime
    this.productData.validityTime = time.getTime()
    
    this.productData.accountId = JSON.parse(localStorage.getItem('currentUser'))._id;
   // this.productData.image = JSON.parse(localStorage.getItem('Image'));
    console.log(this.productData.image)
    this.productData.ipAddress = this.privateIP;
    this.productData.avlPlace = this.addr
   
    console.log(this.productData.avlPlace)
    console.log(this.productData.categoryId)
    console.log(this.productData.image)
    for(let i=0;i<this.categoryArr.length;i++){
      if(this.productData.categoryId == this.categoryArr[i]._id){
        this.productData.category = this.categoryArr[i].productCategory
        console.log(this.productData.category)
      }
    }

    
    let curntDte = new Date().getTime();
    this.productData.date = curntDte
    
    this._dealsService.addPost(this.productData)
      .subscribe(
        res=>{
          
       console.log(this.productData)
       console.log(res);
     
      this.success = "Posted successfully!"
     //localStorage.removeItem('Image')
      this.loadingCtrl.hide();
      console.log( this.productData.avlPlace)
        setTimeout(() => {
          
          this.loadingCtrl.show();
          this.route.navigate(['products']);
          this.loadingCtrl.hide();

      }, 1000);
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
