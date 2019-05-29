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
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

// const URL = 'http://localhost:8080/api/upload';

declare var $: any;
declare let ClientIP: any;
declare var swal: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

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
  Image = [];
  singleImage: File;
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
  multiPostTime: any;
  dateNrml: any;
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
  imageLength = 0;
  editId: any;
  singleMultiPost = {};
  splitImage: '';
  oldAvlplace: any;
  slideConfig: any;
  arrayImage = [];
  credits: any = {};
  creditMinus:any;
  creditObj: any = {};
  myCredit: any;
  public carForm: FormGroup;
  imglen = 0;
  imglen1 = 0;
  productArr: any = [];
  isAlready: boolean = false;
  price = 0;
  quantity = 0;
  lastImage: any;
  postLenght: any = [];

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
    private datePipe: DatePipe,
    private fb: FormBuilder
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
    this.multiData.category = '';
    this.multiData.categoryId = '';
  }

  ngOnInit() {
    this.loadingCtrl.show();


    this.editId = this.router.snapshot.params['id'];
       
    // if(!this.editId){
    //   this.getForm();
    // }
    this.getForm();
    
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.carForm.value.avlPlace = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.city.formatted_address;

    this.multiData.avlPlace = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.city.formatted_address;
    this.getUser();

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

    if (this.editId) {
      this._dealsService.getSingleMultiPost(this.editId).subscribe(
        res => {
          console.log(res);
          this.oldAvlplace = res;
          // for(let i =1 ; i < this.oldAvlplace.product.length;i++){
          //   this.addSellingPoint();
          // }
          
          this.carForm.patchValue({
            categoryId: this.oldAvlplace.categoryId,
            avlPlace: this.oldAvlplace.avlPlace.formatted_address,
            //...this.oldAvlplace
          });
           this.setExpenseCategories();
         // this.carForm.setControl('product', this.fb.array(this.oldAvlplace.product || []));

          //this.carForm.setValue(this.oldAvlplace.product.map(control => control.value));

          // this.oldAvlplace = this.multiData.avlPlace;
          // this.multiData.avlPlace = this.multiData.avlPlace.formatted_address;

          // this.splitImage = this.multiData.image;
          // this.multiData.image = this.splitImage.split(',', 1);

          // this.multiPostTime = this.multiData.validityTime;
          // this.dateNrml = this.datePipe.transform(
          //   this.multiPostTime,
          //   'dd/MM/yyyy'
          // );
          // this.multiData.validityTime = this.dateNrml;

          // this.arrayImage = this.splitImage.split(',');
          // console.log(this.arrayImage);
          // this.slideConfig = {
          //   slidesToShow: 1,
          //   slidesToScroll: 1,
          //   dots: true,
          //   infinite: false,
          //   arrows: true,
          //   autoplay: true,
          //   autoplaySpeed: 800
          // };
          this.loadingCtrl.hide();
        },
        err => {
          console.log(err);
          this.loadingCtrl.hide();
        }
      );
    }
  }

  setExpenseCategories(){
    let control = <FormArray>this.carForm.controls.product;
    this.oldAvlplace.product.forEach(x => {
      control.push(this.fb.group(x));
    })
    for ( let  i = 0; i< this.oldAvlplace.product.length ; i++ ){
      console.log(this.oldAvlplace.product);
    }
    console.log(control.length);
    let arr = [];
    arr = control.value;
    for ( let  i = 0; i < arr.length ; i++ ){
      // if(control)
      console.log(arr);
      if(arr[i]._id){
        console.log(arr[i].name);
      }else{
        console.log(i);
        this.deleteSellingPoint(i);
      }
    }
  }

  onSubmit() {
    console.log(this.carForm.value.product);

    for (let i = 0; i < this.categoryArr.length; i++) {
      if (this.carForm.value.categoryId == this.categoryArr[i]._id) {
        this.carForm.value.category = this.categoryArr[i].productCategory;
      }
    }

    this.productArr = this.carForm.value.product;
    if(this.isAlready == false){
      this.imageUrl();
    }

    console.log(this.carForm.value);

   if(this.isAlready){
    for(let i = 0 ; i < this.carForm.value.product.length ; i++){
      this.price = this.price + parseInt(this.carForm.value.product[i].price);
      this.quantity = this.quantity + parseInt(this.carForm.value.product[i].quantity);
     }
 
     console.log(this.price);
     console.log(this.quantity);
 
     console.log(this.credits)
     this.myCredit = this.credits.credits;
     console.log(this.myCredit);
     this.creditMinus = (this.price * this.quantity) * (1 / 100);
     console.log(this.creditMinus);
     
    if(this.myCredit < this.creditMinus){
      console.log('No credit')
      swal({
        title: 'You have no credit!',
        text:
          'If you post your product! Please pay MONEY show your PLANS.',
        imageUrl: '../../assets/Images/progress.gif'
      });
      this.route.navigate(['/subscription-plan']);
      this.loadingCtrl.hide();
    }
    else{
      console.log(this.carForm.value);
      for(let i = 0 ; i < this.carForm.value.product.length ; i++){
         this._dealsService.addPost(this.carForm.value.product[i]).subscribe(
        res => {
          console.log(res);
          // this.loadingCtrl.hide();
          this.postLenght.push(res);
          console.log(this.postLenght);
          // this.creditObj.productId = res._id;
          // this.getUser();
          // this.updateUser();
          // this.success = 'Posted successfully!';
         // document.getElementById('idView').scrollIntoView();
          // setTimeout(() => {
          //   this.route.navigate(['products']);
          //   this.loadingCtrl.hide();
          // }, 3000);
          console.log(this.carForm.value.product.length);
          if(this.carForm.value.product.length == this.postLenght.length){
            this.success = 'Posted successfully!';
             document.getElementById('idView').scrollIntoView();
              setTimeout(() => {
                this.route.navigate(['products']);
                this.loadingCtrl.hide();
              }, 3000);
          }
        },
        err => {
          console.log(err);
        }
      );
      }

    }
   }
  }

    imageUrl(){
      console.log(this.imglen1)
      if(this.imglen1 != this.productArr.length){
        for(let i = 0 ; i < this.productArr.length ; i++){
              i = this.imglen1;
              this.urls = this.productArr[i].image;
              console.log(this.urls);
              this.imglen1 = i+1;
              this.postMultiImage();
          break;
          }
      }else{
        this.isAlready = true;
        this.onSubmit();
      }
    }
  
    imageAppend(){
      console.log(this.imglen);
      if(this.imglen != this.carForm.value.product.length){
        for(let i = 0 ; i < this.carForm.value.product.length ; i++){
            i = this.imglen;
            this.carForm.value.product[i].image = this.Image;
            this.carForm.value.product[i].accountId = JSON.parse(
              localStorage.getItem('currentUser')
            )._id;
            this.carForm.value.product[i].username = JSON.parse(
              localStorage.getItem('currentUser')
            ).firstname;
            this.carForm.value.product[i].userNumber = JSON.parse(
              localStorage.getItem('currentUser')
            ).phone;
            this.carForm.value.product[i].userAddressLine = JSON.parse(
              localStorage.getItem('currentUser')
            ).address.addressLine;
            this.carForm.value.product[i].userAddress = JSON.parse(
              localStorage.getItem('currentUser')
            ).address.city.formatted_address;
            this.carForm.value.product[i].status = JSON.parse(
              localStorage.getItem('currentUser')
            ).status;
            let curntDte = new Date().getTime();
            this.carForm.value.product[i].date = curntDte;
            console.log(this.carForm.value.product[i].date);
        
            this.carForm.value.product[i].ipAddress = this.privateIP;
        
            if (this.addr == undefined || this.addr == null) {
              this.carForm.value.product[i].avlPlace = JSON.parse(
                localStorage.getItem('currentUser')
              ).address.city;
            } else {
              this.carForm.value.product[i].avlPlace = this.addr;
            }
            this.carForm.value.product[i].category = this.carForm.value.category;
            //this.carForm.value.product[i].date = this.carForm.value.date;
            this.carForm.value.product[i].categoryId = this.carForm.value.categoryId;
            console.log(this.carForm.value.product[i]);
            this.imglen = i+1;
            this.imageUrl();
            break;
        }
      }
    }

  getForm(){
    this.carForm = this.fb.group({
      categoryId: new FormControl (""),
      avlPlace:  new FormControl (""),
      product: this.fb.array([this.getItem()])
    })
  }

  getItem(){
    return this.fb.group({
      name:  ['', Validators.required],
      quantity:  ['', Validators.required],
      qnty: ['', Validators.required],
      price:  ['', Validators.required],
      description: '',
      validityTime: ['', Validators.required],
      category:'',
      image: this.fb.array([])
    })
  }

  get product() {
    return this.carForm.get('product') as FormArray;
  }

  addSellingPoint() {
    this.product.push(this.getItem());
  }

  deleteSellingPoint(index) {
    console.log(this.product)
    console.log(index);
    this.product.removeAt(index);
    console.log(this.product)
  }

  getUser() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.currentuserId == res[i]._id) {
            this.credits = res[i];
            console.log(this.credits);
          }
        }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  // onFileChange(event) {
  //   //Method to set the value of the file to the selected file by the user
  //   this.singleImage = event.target.files[0];
  //   //console.log(this.Image.name); //To get the image selected by the user
  //   this.valid = true;
  //   console.log(this.singleImage)
  
  //   this.product.
      
  // }

  onFileChangeMulti(event) {
    this.urls = [];
    var filesAmount = event.target.files.length;
    if (filesAmount > 0) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.urls.push(event.target.files[i]);
        this.imageLength = this.urls.length;
      }
    }
    for(let i = 0 ; i < this.carForm.value.product.length ; i++){
      if(this.carForm.value.product[i].image.length == 0){
        this.carForm.value.product[i].image = this.urls;
      }
    }
    console.log(this.urls)
  }

  postImage() {
    this.loadingCtrl.show();
    console.log(this.credits)
    this.myCredit = this.credits.credits;
    console.log(this.myCredit);
    this.creditMinus = (this.productData.price * this.productData.quantity) * (1 / 100);
    console.log(this.creditMinus);
    if(this.myCredit < this.creditMinus){
      console.log('No credit')
      swal({
        title: 'You have no credit!',
        text:
          'If you post your product! Please pay MONEY show your PLANS.',
        imageUrl: '../../assets/Images/progress.gif'
      });
      this.route.navigate(['/subscription-plan']);
      this.loadingCtrl.hide();
    }else{
      if (this.singleImage) {
        var image = new FormData(); //FormData creation
        image.append('Image', this.singleImage);
        //Adding the image to the form data to be sent
        this._dealsService.sendImage(image).subscribe(res => {
          this.productData.image = res;
          this.postProduct();
        });
      } else {
        this.productData.image =
          'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
        this.postProduct();
      }
    }
  }

  postMultiImage() {
    this.loadingCtrl.show();
    if (this.editId) {
      if (this.urls.length != 0) {
        for (let i = 0; i < this.urls.length; i++) {
          var image = new FormData(); //FormData creation
          image.append('Image', this.urls[i]);
          this._dealsService.sendImage(image).subscribe(res => {
            console.log(res);
            this.Image.push(res);
            this.postMultiProduct();
          });
          break;
        }
      } else {
        this.multiData.image = this.splitImage;
        this.productData.image =
          'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
        this.postMultiProduct();
      }
    } else {
      this.Image = [];
      if (this.urls.length != 0) {
        for (let i = 0; i < this.urls.length; i++) {
          var image = new FormData(); //FormData creation
          image.append('Image', this.urls[i]);
          this._dealsService.sendImage(image).subscribe(res => {
            console.log(res);
            this.lastImage = res;
            this.Image.push(res);
            if(this.urls.length == this.Image.length){
              console.log(this.productArr);
              this.imageAppend();
            }
          });
        }
       
      } else {
        this.multiData.image =
          'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
          this.Image.push(this.multiData.image);
          this.imageAppend();
        }
    }
  }

  postProduct() {
   // this.loadingCtrl.show();
    // var time = this.productData.validityTime;
    // this.productData.validityTime = time.getTime();
    this.productData.accountId = JSON.parse(
      localStorage.getItem('currentUser')
    )._id;
    this.productData.username = JSON.parse(
      localStorage.getItem('currentUser')
    ).firstname;
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

    this.productData.ipAddress = this.privateIP;
    //  this.productData.avlPlace = this.addr;

    if (this.addr == undefined || this.addr == null) {
      this.productData.avlPlace = JSON.parse(
        localStorage.getItem('currentUser')
      ).address.city;
    } else {
      this.productData.avlPlace = this.addr;
    }

    for (let i = 0; i < this.categoryArr.length; i++) {
      if (this.productData.categoryId == this.categoryArr[i]._id) {
        this.productData.category = this.categoryArr[i].productCategory;
      }
    }

    let curntDte = new Date().getTime();
    this.productData.date = curntDte;

    this._dealsService.addPost(this.productData).subscribe(
      res => {
        console.log(res);
        if (this.addr == undefined || this.addr == null) {
          this.productData.avlPlace = this.productData.avlPlace.formatted_address;
        } else {
          this.productData.avlPlace = this.addr.formatted_address;
        }
        this.creditObj.productId = res._id;
        this.getUser();
        this.updateUser();
        this.success = 'Posted successfully!';
        document.getElementById('idView').scrollIntoView();
        setTimeout(() => {
          this.route.navigate(['products']);
          this.loadingCtrl.hide();
        }, 3000);
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
    this.notifyPush();
  }

  notifyPush(){
    this._dealsService.notificationToPostedProduct(this.productData).subscribe(
        res => {
          console.log(res)
        },
        err => {
            console.log(err)
        }
    );
  }

  updateUser(){
    this.credits.credits = this.credits.credits - this.creditMinus;
    console.log(this.credits.credits);
    this._dealsService.updateCustomer(this.credits, this.currentuserId).subscribe(
      res => {
        console.log(res);
        this.updateCreditArr();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateCreditArr(){
    this.creditObj.credit = this.creditMinus;
    this.creditObj.productName = this.carForm.value.product.length;
    this.creditObj.category = this.carForm.value.category;
    this.creditObj.quantity = this.quantity;
    //this.creditObj.qnty = this.productData.qnty;
    this.creditObj.price = this.price;
    this.creditObj.image = this.lastImage;
    this.creditObj.productCreatedAt = this.carForm.value.date;
    console.log(this.creditObj);

    this._dealsService.updateUserCreditArr(this.creditObj,this.currentuserId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  postMultiProduct() {
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
    this.multiData.bulk = true;

    // update multi
    if (this.editId) {
      if (this.Image.length == this.imageLength) {
        this.loadingCtrl.show();
        if (this.Image.length != 0) {
          this.multiData.image = this.Image;
        }

        if (this.addr == undefined || this.addr == null) {
          this.multiData.avlPlace = this.oldAvlplace;
        } else {
          this.multiData.avlPlace = this.addr;
        }
        if (this.dateNrml == this.multiData.validityTime) {
          this.multiData.validityTime = this.multiPostTime;
        } else {
          let time1 = this.multiData.validityTime;
          this.multiData.validityTime = time1.getTime();
        }

        for (let i = 0; i < this.categoryArr.length; i++) {
          if (this.multiData.category == this.categoryArr[i].productCategory) {
            this.multiData.categoryId = this.categoryArr[i]._id;
          }
        }

        this.multiData.ipAddress = this.privateIP;
        let curntDte = new Date().getTime();
        this.multiData.date = curntDte;

        console.log(this.multiData);
        this._dealsService
          .updateMultiPost(this.multiData, this.editId)
          .subscribe(
            res => {
              console.log(res);
              if (this.addr == undefined || this.addr == null) {
                this.multiData.avlPlace = this.oldAvlplace.formatted_address;
              } else {
                this.multiData.avlPlace = this.addr.formatted_address;
              }
              this.success = 'Posted successfully!';
              document.getElementById('idView').scrollIntoView();
              setTimeout(() => {
                this.loadingCtrl.show();
                this.route.navigate(['products']);
                this.loadingCtrl.hide();
              }, 2000);
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
      } else {
        this.urls.shift();
        this.postMultiImage();
      }
    }

    // post multi
    else {
      if (this.Image.length == this.imageLength) {
        this.loadingCtrl.show();
        if (this.Image.length > 0) {
          this.multiData.image = this.Image;
        }

        if (this.addr == undefined || this.addr == null) {
          this.multiData.avlPlace = JSON.parse(
            localStorage.getItem('currentUser')
          ).address.city;
        } else {
          this.multiData.avlPlace = this.addr;
        }

        for (let i = 0; i < this.categoryArr.length; i++) {
          if (this.multiData.categoryId == this.categoryArr[i]._id) {
            this.multiData.category = this.categoryArr[i].productCategory;
          }
        }

        this.multiData.ipAddress = this.privateIP;
        // this.multiData.avlPlace = this.addr;
        let curntDte = new Date().getTime();
        this.multiData.date = curntDte;

        console.log(this.multiData);
        this._dealsService.addMultiPost(this.multiData).subscribe(
          res => {
            console.log(res);
            this.success = 'Posted successfully!';
            document.getElementById('idView').scrollIntoView();
            setTimeout(() => {
              this.loadingCtrl.show();
              this.route.navigate(['products']);
              this.loadingCtrl.hide();
            }, 2000);
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
      } else {
        this.urls.shift();
        this.postMultiImage();
      }
    }
  }

  getunits() {
    console.log(this.carForm.value.product)
    for(let i = 0 ; i < this.carForm.value.product.length; i++){
      this.showUnit = this.carForm.value.product[i].qnty;
    }
    console.log(this.showUnit);
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
