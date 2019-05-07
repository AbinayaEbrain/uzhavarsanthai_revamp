import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

declare var swal: any;

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
    phone: '',
    privateIP: '',
    status: '',
    role: '',
    roleStatus: ''
  };
  //registeredUserData: any = {};
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

  private sendSignUpMail = 'https://uzhavarsanthai.herokuapp.com/api/sendMailSignUp';
  optsent : any;
  verifymsg:any;
  authorize:any;
  visitId:any;

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
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    // console.log(this.router.getCurrentNavigation().extras)
    this.registeredUserData.address.location = '';
    this.registeredUserData.address.city = '';
  }

  ngOnInit() {
    this.loadingCtrl.show();
    let role = this.route.snapshot.paramMap.get('role');
    console.log(role);
    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
    setTimeout(() => {
      this.loadingCtrl.hide();
    }, 1000);
  }

  post() {
    let role = this.route.snapshot.paramMap.get('role');
    console.log(role);
    if (role != null) {
      this.registeredUserData.role = 'seller';
      this.registeredUserData.roleStatus = 'Deactive';
    } else {
      this.registeredUserData.role = 'buyer';
      this.registeredUserData.roleStatus = 'Active';
    }
    this.registeredUserData.status = 'ACTIVE';
    this.registeredUserData.address.city = this.addr;
    this.registeredUserData.phone = this.phoneObj.phone;
    this.loadingCtrl.show();
    console.log(this.registeredUserData);

    // if(role != null){
    //   this.sellerSignUp();
    // }else{
    //   this.buyerSignUp();
    // }

    this._auth.registerUser(this.registeredUserData).subscribe(
      res => {
        console.log(res);
        if (res.user.roleStatus == 'Deactive') {
          if (res) {
            this.http.post<any>(this.sendSignUpMail, res).subscribe(
              data => {
                if (data) {
                  console.log(data);
                  console.log('success');
                }
              },
              err => {
                console.log(err);
              }
            );
          }
        }
        this.loadingCtrl.hide();

        this.success = 'Registered successfully!';
        if (res.user.roleStatus == 'Deactive') {
          this.removeLS();
          swal({
            title: 'Registered successfully!',
            text:
              'Your signup request has been sent succesfully! Please wait until you get confirmation message to LOGIN.',
            imageUrl: '../../assets/Images/progress.gif'
          });
          this.router.navigate(['/home']);
        } else {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', JSON.stringify(res.user.role));
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
          localStorage.setItem('status', JSON.stringify(res.user.status));
          localStorage.setItem(
            'roleStatus',
            JSON.stringify(res.user.roleStatus)
          );
          this.authorize = localStorage.getItem('authorization');
          if(this.authorize){
            this.visitId = localStorage.getItem('lastvisitproductid');
            this.router.navigate(['/viewmore/' + this.visitId ]);
            localStorage.removeItem('authorization');
          }
          else{
          this.router.navigate(['/my-order']);
          }
        }
        if (res.statusText == 'Unauthorized') {
          this.errormsg = 'Check phone number and Password !';
          this.loadingCtrl.hide();
        }
      },
      err => {
        console.log(err);
        if (err.statusText == 'Unauthorized') {
          this.errormsg = 'Phone number already exist!';
          setTimeout(() => {
            this.errormsg = '';
          }, 5000);

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

  
  removeLS(){
    localStorage.removeItem('payload');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('Address');
    localStorage.removeItem('roleStatus');
    localStorage.removeItem('googleLat');
    localStorage.removeItem('googleLong');
    localStorage.removeItem('ipAddress');
    localStorage.removeItem('status');
    localStorage.removeItem('firstname');
    localStorage.removeItem('Image');
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
    for (let i = 0; i < 6; i++) {
      OTP += resultpath[Math.floor(Math.random() * 10)];
    }
    this.phoneObj.otp = OTP;
    this._auth.sendOtp(this.phoneObj).subscribe(
      res => {
        console.log(res);
        this.optsent = 'OTP has been sent successfully!';
        setTimeout(() => {
          this.optsent = '';
        }, 3000);
        document.getElementById('firstDiv').style.display = 'none';
        document.getElementById('secondDiv').style.display = 'block';
        document.getElementById('resend').style.display = 'block';
      },
      err => {
        console.log(err);
        if (err.statusText == 'Unauthorized') {
          this.errormsg = 'Phone number is already registered!';
          setTimeout(() => {
            this.errormsg = '';
          }, 10000);

          this.loadingCtrl.hide();
        }
      }
    );
  }

  verifyOtp() {
    console.log(this.phoneObj.otp);
    if (this.verifyPhone1.verifyPhone == this.phoneObj.otp) {
      this.verifymsg = 'Your otp has been verified!';
      setTimeout(() => {
        this.verifymsg = '';
      }, 3000);
      document.getElementById('secondDiv').style.display = 'none';
      document.getElementById('afterotpverified').style.display = 'block';
    } else {
      this.errMsgVerfi = 'You have entered invalid OTP!';
      document.getElementById('resend').style.display = 'block';
      this.verifyPhone1.verifyPhone = '';
      setTimeout(() => {
        this.errMsgVerfi = '';
      }, 4000);
    }
  }
}
