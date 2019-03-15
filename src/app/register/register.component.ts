import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('input1') inputEl: ElementRef;
  phoneObj: any = {};
  registeredUserData = {
    address: {
      city: {},
      location: ''
    },
    gender: '',
    phone: '',
    privateIP: '',
    status: ''
  };
  success: any;
  errormsg: any;
  phnErr: any;
  ipAddress: any;
  submitted: boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  verifyPhone: any;
  verifyPhone1: any = {};
  errMsgVerfi: any;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  constructor(
    private _auth: AuthService,
    public zone: NgZone,
    private router: Router,
    public loadingCtrl: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.registeredUserData.gender = '';
    this.registeredUserData.address.location = '';
    this.registeredUserData.address.city = '';
  }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
    }, 1000);
  }

  post() {
    this.registeredUserData.status = 'ACTIVE';
    this.registeredUserData.address.city = this.addr;
    this.loadingCtrl.show();
    this._auth.registerUser(this.registeredUserData).subscribe(
      res => {
        this.loadingCtrl.hide();
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
        localStorage.setItem('status', JSON.stringify(res.user.status));
        //this.router.navigate(['/login'])
        this.success = 'Registered successfully!';
        this.router.navigate(['/products']);
        //  document.getElementById('hideButton').style.display ='none'
        //  document.getElementById('hideRestButton').style.display ='none'

        //    setTimeout(() => {
        //     // swal.close();
        //     this.loadingCtrl.hide();

        // }, 2000);

        if (res.statusText == 'Unauthorized') {
          this.errormsg = 'Check Email and Password !';
          this.loadingCtrl.hide();
        }
      },
      err => {
        console.log(err);
        if (err.statusText == 'Unauthorized') {
          this.errormsg = 'Phone number already exist!';
          setTimeout(() => {
            this.errormsg = '';
          }, 15000);

          this.loadingCtrl.hide();
        }
      }
    );
  }

  phnTen() {
    if (this.phoneObj.phone.length !== 10) {
      //alert(this.registeredUserData.phone.length)
      this.phnErr = 'Phone number must be 10 digits';
      setTimeout(() => {
        this.phnErr = '';
      }, 3000);
      //alert(this.phnErr)
    }
  }

  handleInput(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return true;
    return false;
  }

  sendOtp() {
    if (this.errMsgVerfi) {
      this.errMsgVerfi = '';
    }
    console.log(this.phoneObj);
    let resultpath = this.phoneObj.phone;
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += resultpath[Math.floor(Math.random() * 10)];
    }
    this.phoneObj.otp = OTP;
    this._auth.sendOtp(this.phoneObj).subscribe(
      res => {
        console.log(res);
        document.getElementById('firstDiv').style.display = 'none';
        document.getElementById('secondDiv').style.display = 'block';
      },
      err => {
        console.log(err);
      }
    );
  }

  verifyOtp() {
    console.log(this.phoneObj.otp);
    if (this.verifyPhone1.verifyPhone == this.phoneObj.otp) {
      document.getElementById('secondDiv').style.display = 'none';
      document.getElementById('afterotpverified').style.display = 'block';
    } else {
      this.errMsgVerfi = 'You have entered invalid OTP';
      // document.getElementById('verify').style.display = 'none';
      document.getElementById('resend').style.display = 'block';
      this.verifyPhone1.verifyPhone = '';
    }
  }
}
