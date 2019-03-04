import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
declare var swal: any;
const URL = 'https://uzhavarsanthai.herokuapp.com/api/upload';

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
  selector: 'app-user-deals-edit',
  templateUrl: './user-deals-edit.component.html',
  styleUrls: ['./user-deals-edit.component.css']
})
export class UserDealsEditComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  });
  id: any;
  @ViewChild('postform') form;
  dealslists = [];
  time: any;
  public deallistobj: any = {};
  success: any;
  currentuserId: any;
  categoryArr = [];
  showUnit: any;
  submitted: boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  public address: any;
  public formatted_address: any;
  url: '';
  dateNrml: any;
  currentImg: any;
  valid: boolean = false;
  Image: File;
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
    private route: ActivatedRoute,
    private router: Router,
    public zone: NgZone,
    public loadingCtrl: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  onFileChange(event) {
    //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0]; //To get the image selected by the user
    this.valid = true;
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.today = new Date();
    this.InitialCall();
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.id = this.route.snapshot.params['id'];
    //edit deals

    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        this.dealslists = res;
        for (let i = 0; i < this.dealslists.length; i++) {
          if (this.id == this.dealslists[i]._id) {
            this.deallistobj.category = this.dealslists[i].category;
            this.deallistobj.name = this.dealslists[i].name;
            this.deallistobj.quantity = this.dealslists[i].quantity;
            this.deallistobj.qnty = this.dealslists[i].qnty;
            this.deallistobj.subQuantity = this.dealslists[i].subQuantity;
            this.deallistobj.subqnty = this.dealslists[i].subqnty;
            this.deallistobj.price = this.dealslists[i].price;
            this.deallistobj.description = this.dealslists[i].description;
            this.deallistobj.image = this.dealslists[i].image;
            this.address = this.dealslists[i].avlPlace;
            this.time = this.dealslists[i].validityTime;
            this.showUnit = this.dealslists[i].qnty;
          }
        }
        this.deallistobj.avlPlace = this.address.formatted_address;
        this.dateNrml = this.datePipe.transform(this.time, 'dd/MM/yyyy');
        this.deallistobj.validityTime = this.dateNrml;
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );

    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
      },

      err => {
        this.categoryArr = [];
      }
    );
  }

  getunits() {
    this.showUnit = this.deallistobj.qnty;
  }

  InitialCall() {
    for (let i = 0; i < this.dealslists.length; i++) {
      if (this.id == this.dealslists[i]._id) {
        this.deallistobj.category = this.dealslists[i].category;
        this.deallistobj.name = this.dealslists[i].name;
        this.deallistobj.quantity = this.dealslists[i].quantity;
        this.deallistobj.qnty = this.dealslists[i].qnty;
        this.deallistobj.subQuantity = this.dealslists[i].subQuantity;
        this.deallistobj.subqnty = this.dealslists[i].subqnty;
        this.deallistobj.price = this.dealslists[i].price;
        this.deallistobj.description = this.dealslists[i].description;
        this.deallistobj.avlPlace = this.dealslists[
          i
        ].avlPlace.formatted_address;
        this.time = this.dealslists[i].validityTime;
      }
    }
    this.dateNrml = this.datePipe.transform(this.time, 'dd/MM/yyyy');
    this.deallistobj.validityTime = this.dateNrml;
  }

  postImage() {
    console.log('1')
    this.loadingCtrl.show();
    var image = new FormData(); //FormData creation
    image.append('Image', this.Image);
    //Adding the image to the form data to be sent
    this._dealsService.sendImage(image).subscribe(res => {

      console.log('3')
      // localStorage.setItem('Image', JSON.stringify(res));
      this.deallistobj.image = res;
      this.update();
      console.log(this.deallistobj.image);
    });
  }

  update() {
    console.log('4')
    this.loadingCtrl.show();
    let curntDte = new Date().toLocaleDateString();
    this.deallistobj.date = curntDte;

    if (this.addr == null || this.addr == undefined) {
      this.deallistobj.avlPlace = this.address;
    } else {
      this.deallistobj.avlPlace = this.addr;
    }

    if (this.dateNrml == this.deallistobj.validityTime) {
      this.deallistobj.validityTime = this.time;
    }

    this.deallistobj.username = JSON.parse(
      localStorage.getItem('currentUser')
    ).firstname;
    this.deallistobj.lastname = JSON.parse(
      localStorage.getItem('currentUser')
    ).lastName;
    this.deallistobj.userNumber = JSON.parse(
      localStorage.getItem('currentUser')
    ).phone;
    this.deallistobj.userAddressLine = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.addressLine;
    this.deallistobj.userAddress = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.city.formatted_address;

    this._dealsService.editDeals(this.deallistobj, this.id).subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        this.success = 'Updated successfully!';
        setTimeout(() => {
          this.loadingCtrl.show();
          this.router.navigate(['/products']);
          this.loadingCtrl.hide();
        }, 2000);
      },
      err => console.log(err)
    );
    localStorage.removeItem('Image');
  }

  // handleInput(evt)
  // 		{
  // 			var charCode = (evt.which) ? evt.which : evt.keyCode;
  // 			if (charCode != 46 && charCode > 31
  // 			&& (charCode < 48 || charCode > 57))
  // 			return true;
  // 			return false;
  //     }

  onSubmit() {
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();

    this.InitialCall();
  }
}
