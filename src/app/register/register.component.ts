import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { AuthService } from '../auth.service';
import { DealsService } from 'src/app/deals.service';
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
  freeSubscription: any;
  subscriptionId: any;
  subscriptionName: any;
  @ViewChild('input1') inputEl: ElementRef;
  phoneObj: any = {};
  registeredUserData = {
    address: {
      addressLine:'',
      city: {},
      location: ''
    },
    phone: '',
    privateIP: '',
    status: '',
    role: '',
    roleStatus: '',
    credits: 0,
    subscription :'',
    subscriptionName : '',
    subscriptionId : ''
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
  optsent: any;
  verifymsg: any;
  authorize: any;
  visitId: any;
  getRole : any;
  subscriptionArr: any = [];
  public trackInformationData: any = {};


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
    private route: ActivatedRoute,
    private _dealsService: DealsService
  ) {
    // console.log(this.router.getCurrentNavigation().extras)
    this.registeredUserData.address.location = '';
    this.registeredUserData.address.city = '';
  }

  ngOnInit() {
      document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.getRole = this.route.snapshot.paramMap.get('role');
    console.log(this.getRole);
    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
    setTimeout(() => {
      this.loadingCtrl.hide();
    }, 1000);
    this.getSubscription();
  }

  post() {
   let role = this.route.snapshot.paramMap.get('role');
   if(this.getRole == null){
    this.getRole = role;
   }
    console.log(this.getRole);
    if (this.getRole != null) {
      this.registeredUserData.role = 'seller';
      this.registeredUserData.roleStatus = 'Deactive';
      this.registeredUserData.credits = 1000;
    } else {
      this.registeredUserData.role = 'buyer';
      this.registeredUserData.roleStatus = 'Active';
      this.registeredUserData.credits = 0;
    }
    this.registeredUserData.status = 'ACTIVE';
    this.registeredUserData.address.city = '';
    this.registeredUserData.address.addressLine = '';
    this.registeredUserData.phone = this.phoneObj.phone;
    this.registeredUserData.subscription = this.freeSubscription;
    this.registeredUserData.subscriptionName = this.subscriptionName;
    this.registeredUserData.subscriptionId = this.subscriptionId
    this.loadingCtrl.show();
    console.log(this.registeredUserData);
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
            imageUrl: 'https://res.cloudinary.com/uzhavar-image/image/upload/v1559912230/progress.gif'
          });
          this.router.navigate(['/home']);
        } else {

          // if(this.addr.formatted_address){
          //   this.registeredUserData.address.city = this.addr.formatted_address;
          // }

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', JSON.stringify(res.user.role));
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
          localStorage.setItem('status', JSON.stringify(res.user.status));
          localStorage.setItem('credits', JSON.stringify(res.user.credits));
          localStorage.setItem('subscriptionId', JSON.stringify(res.user.subscriptionId));
          localStorage.setItem(
            'roleStatus',
            JSON.stringify(res.user.roleStatus)
          );
          this.authorize = localStorage.getItem('authorization');
          if (this.authorize) {
            this.visitId = localStorage.getItem('lastvisitproductid');
            this.router.navigate(['/viewmore/' + this.visitId]);
            localStorage.removeItem('authorization');
          } else {
            this.router.navigate(['/my-order']);
          }
        }
        if (res.statusText == 'Unauthorized') {
          this.errormsg = 'Check phone number or Password !';
          this.loadingCtrl.hide();
        }
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'register';
        this.postTrackInformation();
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
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'register';
        this.postTrackInformation();
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

  removeLS() {
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
        this.optsent = ' ' +  this.phoneObj.phone;
        // setTimeout(() => {
        //   this.optsent = '';
        // }, 3000);
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

  getSubscription(){
  this._dealsService.getSubscription().subscribe(
    res => {
      console.log(res);
      this.subscriptionArr = res;
      for (let i = 0; i < this.subscriptionArr.length; i++) {
        if(this.subscriptionArr[i].planType == 'Free plan'){
          this.freeSubscription = this.subscriptionArr[i];
          this.subscriptionName = this.freeSubscription.subscription;
          this.subscriptionId = this.freeSubscription._id;
        }
      }
    console.log(this.freeSubscription);
    console.log(this.subscriptionName);
    console.log(this.subscriptionId);
    this.trackInformationData.response = 'Success';
    this.trackInformationData.apiName = 'getSubscription';
    this.postTrackInformation();
    },
    err => {
      console.log(err);
      this.trackInformationData.response = 'Failure';
      this.trackInformationData.error = err.statusText;
      this.trackInformationData.apiName = 'getSubscription';
      this.postTrackInformation();
    }
  );
}

postTrackInformation() {
  let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
  let token = localStorage.getItem('token');
  let UserName = localStorage.getItem('firstname');
  let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
  this.trackInformationData.UserId = acntID;
  this.trackInformationData.jwt = token;
  this.trackInformationData.ipAddress = ipAddress;
  this.trackInformationData.UserName = UserName;
  this.trackInformationData.apiCallingAt = new Date().getTime();
  this._dealsService
    .trackInformationPost(this.trackInformationData)
    .subscribe(data => {
      console.log(data);
    });
}

}
