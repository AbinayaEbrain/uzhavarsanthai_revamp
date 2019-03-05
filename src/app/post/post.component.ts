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
  Image: File;
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
    public zone: NgZone
  ) {
    this.privateIP = ClientIP;
    console.log(this.privateIP)

    // this.http.get('https://api.ipify.org?format=json').subscribe(data => {
    //   this.publicIP = data['ip'];
    //   console.log(this.publicIP)
    // });

    this.productData.qnty = '';
    this.productData.category = '';
    this.productData.subqnty = '';
    // this.productData.avlPlace.avlplaceName = ''
    this.productData.categoryId = '';
  }
  onFileChange(event) {
    //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0];
    console.log(this.Image.name)//To get the image selected by the user
    this.valid = true;
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id;
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
  }

  postImage() {

    this.loadingCtrl.show();
    var image = new FormData(); //FormData creation
    image.append('Image', this.Image);
    //Adding the image to the form data to be sent
    this._dealsService.sendImage(image).subscribe(res => {
      this.loadingCtrl.hide();
      // localStorage.setItem('Image', JSON.stringify(res));
      this.productData.image = res;
      this.postProduct();
    });
  }

  postProduct() {
    this.loadingCtrl.show();
    // var time = this.productData.validityTime;
    // this.productData.validityTime = time.getTime();

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

  getunits() {
    this.showUnit = this.productData.qnty;
  }

  getLatitudeLongitude1(callback, address) {
    //alert('jfgfg')
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    this.geocoder = new google.maps.Geocoder();
    if (this.geocoder) {
      //alert('1')
      this.geocoder.geocode(
        {
          address: address
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //alert(status);
            callback(results[0]);
          }
        }
      );
    }
  }

  showResult(result) {
    // this.latite=result.geometry.location.lat()
    // this.longti=result.geometry.location.lng()
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

  update() {
    let curntDte = new Date().getTime();
    this.productData.date = curntDte;
    this._dealsService.editDeals(this.productData, this.id).subscribe(
      res => {
        this.success1 = 'Updated successfully!';

        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.route.navigate(['user-deals']);
          this.loadingCtrl.hide();
        }, 2000);
      },
      err => console.log(err)
    );
  }

  //restrict numbers on product name
  // handleInput(evt)
  // 		{
  // 			var charCode = (evt.which) ? evt.which : evt.keyCode;
  // 			if (charCode != 46 && charCode > 31
  // 			&& (charCode < 48 || charCode > 57))
  // 			return true;
  // 			return false;
  //     }
}
