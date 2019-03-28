import {
  Component,
  OnInit,
  ViewChild,
  PLATFORM_INITIALIZER,
  ElementRef,
  NgZone
} from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import {} from '@types/googlemaps';
import { FileUploader } from 'ng2-file-upload';

// const URL = 'http://localhost:8080/api/upload';

declare var $: any;
declare let ClientIP: any;
declare var swal: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

// interface FileReaderEvent extends Event {
//   target: FileReaderEventTarget;
//   getMessage():string;
// }

interface EventTarget {
  result: any;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  loading: boolean = false;
  valid: boolean = false;
  message: string = '';
  // Image: any;
  Image = [];
  singleImage : File;
  urls = [];
  imageSrc: string;
  privateIP;
  publicIP;
  private postform;
  deals = [];
  currentuserId: any;
  categoryArr: any;
  subCateArr = [];
  time: any;
  public productData: any = {};
  public multiData: any = {};
  id: any;
  @ViewChild('avlplaceName') public searchElement: ElementRef;
  dealslists = [];
  success: any;
  success1: any;
  geocoder: any;
  latite: any;
  longti: any;
  showUnit: any;
  submitted: boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  files: any;
  url: '';
  today: Date;
  imageLength : any;
  editId:any;
  singleMultiPost = {};

  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  constructor(
    private _dealsService: DealsService,
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute,
    public loadingCtrl: NgxSpinnerService,
    public zone: NgZone,
  ) {
    this.privateIP = ClientIP;
    console.log(this.privateIP);

    // this.http.get('https://api.ipify.org?format=json').subscribe(data => {
    //   this.publicIP = data['ip'];
    //   console.log(this.publicIP)
    // });

    this.productData.qnty = '';
    this.productData.category = '';
    this.productData.subqnty = '';
    this.productData.categoryId = '';

  }


  ngOnInit() {
    this.loadingCtrl.show();
    this.editId = this.router.snapshot.params['id'];
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.productData.avlPlace = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.city.formatted_address;
    console.log(this.productData.avlPlace);
    //category
    this.today = new Date();
    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        this.loadingCtrl.hide();
      },

      err => {
        this.categoryArr = [];
      }
    );

    if(this.editId){
      this._dealsService.getSingleMultiPost(this.editId).subscribe(
        res => {
          console.log(res);
          this.multiData = res;
          //document.getElementById('resetPassword1').classList.remove("fa-eye");
          document.getElementById('nav-profile').classList.add('show');
          document.getElementById('nav-profile').classList.add('active');
          this.loadingCtrl.hide();
        },
        err => {
          console.log(err);
          this.loadingCtrl.hide();
        }
      );
    }
  }

  onFileChange(event) {
    //Method to set the value of the file to the selected file by the user
    this.singleImage = event.target.files[0];
    //console.log(this.Image.name); //To get the image selected by the user
    this.valid = true;
  }



  onFileChangeMulti(event) {
    var filesAmount = event.target.files.length;
    if(filesAmount > 0 ){
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.urls.push(event.target.files[i]);
        this.imageLength = this.urls.length;
      }
    }
    console.log(this.urls);
  }

  postImage() {
    this.loadingCtrl.show();
    if (this.singleImage) {
      var image = new FormData(); //FormData creation
      image.append('Image', this.singleImage);
      //Adding the image to the form data to be sent
      this._dealsService.sendImage(image).subscribe(res => {
        this.loadingCtrl.hide();
        this.productData.image = res;
        this.postProduct();
      });
    } else {
      this.productData.image =
        'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
      this.postProduct();
    }
  }

  postMultiImage() {
    this.loadingCtrl.show();
    if(this.urls){
    for (let i = 0; i < this.urls.length; i++) {
      var image = new FormData(); //FormData creation
      image.append('Image', this.urls[i]);
      this._dealsService.sendImage(image).subscribe(res => {
        this.loadingCtrl.hide();
        console.log(res);
        this.Image.push(res);
        this.postMultiProduct();
      });
      break;
    }
  }
   else{
    this.productData.image = 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
    this.postMultiProduct();
  }
  }

  postProduct(){
      this.loadingCtrl.show();
       // var time = this.productData.validityTime;
       // this.productData.validityTime = time.getTime();
       if(this.Image.length > 1){
         this.productData.bulk = true;
       }else{
        this.productData.bulk = false;
       }
      // this.productData.image = this.Image;
       console.log(this.productData.image);
       this.productData.accountId = JSON.parse(
         localStorage.getItem('currentUser')
       )._id;
       this.productData.username = JSON.parse(
         localStorage.getItem('currentUser')
       ).firstname;
       this.productData.lastname = JSON.parse(
         localStorage.getItem('currentUser')
       ).lastName;
       this.productData.userNumber = JSON.parse(
         localStorage.getItem('currentUser')
       ).phone;
       this.productData.userAddressLine = JSON.parse(
         localStorage.getItem('currentUser')
       ).address.addressLine;
       this.productData.userAddress = JSON.parse(
         localStorage.getItem('currentUser')
       ).address.city.formatted_address;
       this.productData.status = JSON.parse(
         localStorage.getItem('currentUser')
       ).status;
       // this.productData.image = JSON.parse(localStorage.getItem('Image'));
       this.productData.ipAddress = this.privateIP;
       this.productData.avlPlace = this.addr;
   
       for (let i = 0; i < this.categoryArr.length; i++) {
         if (this.productData.categoryId == this.categoryArr[i]._id) {
           this.productData.category = this.categoryArr[i].productCategory;
         }
       }
   
       let curntDte = new Date().getTime();
       this.productData.date = curntDte;
       console.log(this.productData);
       this._dealsService.addPost(this.productData).subscribe(
         res => {
           console.log(this.productData);
           console.log(res);
           this.success = 'Posted successfully!';
           //localStorage.removeItem('Image')
           this.loadingCtrl.hide();
           setTimeout(() => {
             this.loadingCtrl.show();
             this.route.navigate(['products']);
             this.loadingCtrl.hide();
           }, 1000);
         },
         err => {
           if (err instanceof HttpErrorResponse) {
             if (err.status === 401) {
               this.loadingCtrl.show();
               this.route.navigate(['/login']);
               this.loadingCtrl.hide();
             }
           }
         }
       );
  }

  postMultiProduct() {
   if(this.Image.length == this.imageLength){
    this.loadingCtrl.show();
     // var time = this.productData.validityTime;
     // this.productData.validityTime = time.getTime();
    //  if(this.Image.length > 1){
    //    this.productData.bulk = true;
    //  }else{
    //   this.productData.bulk = false;
    //  }
     this.multiData.image = this.Image;
     console.log(this.multiData.image);
     this.multiData.accountId = JSON.parse(
       localStorage.getItem('currentUser')
     )._id;
     this.multiData.username = JSON.parse(
       localStorage.getItem('currentUser')
     ).firstname;
     this.multiData.userNumber = JSON.parse(
       localStorage.getItem('currentUser')
     ).phone;
     this.multiData.userAddressLine = JSON.parse(
       localStorage.getItem('currentUser')
     ).address.addressLine;
     this.multiData.userAddress = JSON.parse(
       localStorage.getItem('currentUser')
     ).address.city.formatted_address;
     this.multiData.status = JSON.parse(
       localStorage.getItem('currentUser')
     ).status;
     // this.productData.image = JSON.parse(localStorage.getItem('Image'));
     this.multiData.ipAddress = this.privateIP;
     this.multiData.avlPlace = this.addr;
 
     for (let i = 0; i < this.categoryArr.length; i++) {
       if (this.multiData.categoryId == this.categoryArr[i]._id) {
         this.multiData.category = this.categoryArr[i].productCategory;
       }
     }
 
     let curntDte = new Date().getTime();
     this.multiData.date = curntDte;
     console.log(this.multiData);
     this._dealsService.addMultiPost(this.multiData).subscribe(
       res => {
         console.log(this.multiData);
         console.log(res);
         this.success = 'Posted successfully!';
         //localStorage.removeItem('Image')
         this.loadingCtrl.hide();
         setTimeout(() => {
           this.loadingCtrl.show();
           this.route.navigate(['products']);
           this.loadingCtrl.hide();
         }, 1000);
       },
       err => {
         if (err instanceof HttpErrorResponse) {
           if (err.status === 401) {
             this.loadingCtrl.show();
             this.route.navigate(['/login']);
             this.loadingCtrl.hide();
           }
         }
       }
     );
   }
   else{
    this.urls.shift();
    this.postMultiImage();
   }
  }

  getunits() {
    this.showUnit = this.productData.qnty;
  }

  getLatitudeLongitude1(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    this.geocoder = new google.maps.Geocoder();
    if (this.geocoder) {
      this.geocoder.geocode(
        {
          address: address
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            callback(results[0]);
          }
        }
      );
    }
  }

  showResult(result) {
    localStorage.setItem(
      'Address',
      JSON.stringify(result.geometry.location.lat())
    );
    localStorage.setItem(
      'Address1',
      JSON.stringify(result.geometry.location.lng())
    );
    //callback(this.postProduct)
  }
}
