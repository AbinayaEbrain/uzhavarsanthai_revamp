import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth.service';
import { DealsService } from '../deals.service';
import { filter, pairwise } from 'rxjs/operators';
// loader
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('input1') inputEl: ElementRef;
  @ViewChild('loginform') mytemplateForm: NgForm;
  @ViewChild('loginform1') mytemplateForm1: NgForm;
  @ViewChild('loginform2') mytemplateForm2: NgForm;
  @ViewChild('resetForm') mytemplateForm3: NgForm;
  userData:any = {};
  errormsg;
  phnErr1:any
  id: any;
  user: any;
  wholedata: any;
  wholedata1: any;
  deactiveErrorMsg: any;
  adminVerifyErr: any;
  submitted: boolean;
  previousUrl: string;
  phoneObj: any = {};
  phnErr: any;
  verifyPhone: any;
  verifyPhone1: any = {};
  errMsgVerfi: any;
  errormsg1: any;
  resetPasswordObj: any = {};
  notEqual: any;
  optsent: any;
  message: any;
  verifymsg:any;
  authorize:any;
  visitId:any;
  subscriptionArr: any = [];
  subscriptionId : any;
  freeSubscription : any;
  subscriptionName :any;
  public trackInformationData: any = {};

  constructor(
    private router: Router,
    public _auth: AuthService,
    private _dealsService: DealsService,
    private location: Location,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    // document.getElementById('hideForm').style.display = 'block';
    // document.getElementById('showForm').style.display = 'none';
    // document.getElementById('secondDiv').style.display = 'none';
    // document.getElementById('firstDiv').style.display = 'none';
    this.loadingCtrl.show();
   // setTimeout(() => this.inputEl.nativeElement.focus());
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
    }, 1000);

    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        console.log(e[0].urlAfterRedirects); // previous url
        this.previousUrl = e[0].urlAfterRedirects;
        localStorage.setItem('previousUrl', e[0].urlAfterRedirects);
      });
      this.getSubscription();
  }

  getSubscription(){
  this._dealsService.getSubscription().subscribe(
    res => {
      console.log(res);
      this.subscriptionArr = res;
      for (let i = 0; i < this.subscriptionArr.length; i++) {
          this.subscriptionName = this.subscriptionArr[i].subscription;
          this.subscriptionId = this.subscriptionArr[i]._id;
          localStorage.setItem('subscriptionId', JSON.stringify(this.subscriptionId));
      }
      console.log(this.subscriptionName);
      for (let i = 0; i < this.subscriptionArr.length; i++) {
        if(this.subscriptionId == this.subscriptionArr[i]._id){
        this.freeSubscription = this.subscriptionArr[i];
        }

    }
    console.log(this.freeSubscription);
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

  phnTen() {
    console.log(this.phoneObj.phone1)
    console.log(this.phoneObj.phone1.length)

    if (this.phoneObj.phone1.length !== 10 && this.phoneObj.phone1.length != 0) {
      this.phnErr1 = 'Phone number must be 10 digits';
      // setTimeout(() => {
      //   this.phnErr = '';
      // }, 3000);
    }else{
      this.phnErr1 = ''
    }

    if(this.phoneObj.phone1.length == 0){
      this.phnErr1 = '';
    }
  }

  phnTen1() {
    console.log(this.userData.phone)
    console.log(this.userData.phone.length)

    if (this.userData.phone.length !== 10  && this.userData.phone.length != 0) {
      this.phnErr = 'Phone number must be 10 digits';
      // setTimeout(() => {
      //   this.phnErr = '';
      // }, 3000);
    }else{
      this.phnErr = ''
    }

    if(this.userData.phone.length == 0){
      this.phnErr = '';
    }
  }

  registerSeller(){
   this.router.navigate(['/register', { role: 'seller' }]);
 }

  eyeClick() {
    var temp = <HTMLInputElement>document.getElementById('password');
    if (temp.type === 'password') {
      temp.type = 'text';
      document.getElementById('password1').classList.remove("fa-eye");
      document.getElementById('password1').classList.add('fa-eye-slash');
    } else {
      temp.type = 'password';
      document.getElementById('password1').classList.remove("fa-eye-slash");
      document.getElementById('password1').classList.add('fa-eye');
    }
  }

  reseteyeClick() {
    var temp = <HTMLInputElement>document.getElementById('resetPassword');
    if (temp.type === 'password') {
      temp.type = 'text';
      document.getElementById('resetPassword1').classList.remove("fa-eye");
      document.getElementById('resetPassword1').classList.add('fa-eye-slash');
    } else {
      temp.type = 'password';
      document.getElementById('resetPassword1').classList.remove("fa-eye-slash");
      document.getElementById('resetPassword1').classList.add('fa-eye');
    }
  }

  confirmeyeClick() {
    var temp = <HTMLInputElement>document.getElementById('confirmPassword');
    if (temp.type === 'password') {
      temp.type = 'text';
      document.getElementById('confirmPassword1').classList.remove("fa-eye");
      document.getElementById('confirmPassword1').classList.add('fa-eye-slash');
    } else {
      temp.type = 'password';
      document.getElementById('confirmPassword1').classList.remove("fa-eye-slash");
      document.getElementById('confirmPassword1').classList.add('fa-eye');
    }
  }

  equalPwd() {
    let value = this.resetPasswordObj.resetPassword;
    console.log(value);
    let value1 = this.resetPasswordObj.confirmPassword;
    console.log(value1);

    if(!value1){
      this.notEqual = '';
    }
    if (value != value1 && value1 !='') {
      this.notEqual = "Password doesn't match";
    } else {
      this.notEqual = '';
    }
  }

  resetTotalForm(){
    this.phnErr = '';
    document.getElementById('secondDiv').style.display = 'none';
    document.getElementById('firstDiv').style.display = 'none';
    this.mytemplateForm1.reset();
    this.mytemplateForm2.reset();
    this.mytemplateForm3.reset();
  }

  resetConPassword() {
    this._auth
      .resetPassword(this.resetPasswordObj, this.phoneObj.phone1)
      .subscribe(
        res => {
          console.log(res);
          this.message = res.message;
          setTimeout(() => {
            this.message = '';
          }, 4000);
          this.phoneObj.phone1 = '';
          document.getElementById('closeSignUpModal').click();
          document.getElementById("openConfirmCancelModal").click();
          document.getElementById('firstDiv').style.display = 'none';
          document.getElementById('hideForm').style.display = 'block';
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'resetPassword';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'resetPassword';
          this.postTrackInformation();
        }
      );
  }

  logform() {
    this.loadingCtrl.show();
    this._auth.logInUser(this.userData).subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('status', JSON.stringify(res.user.status));
        localStorage.setItem('credits', JSON.stringify(res.user.credits));
        localStorage.setItem('roleStatus', JSON.stringify(res.user.roleStatus));
        localStorage.setItem('role', JSON.stringify(res.user.role));
        localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
        localStorage.setItem('payload', JSON.stringify(res.payload));
        localStorage.setItem('token', res.token);

        this.wholedata = JSON.parse(localStorage.getItem('status'));
        this.wholedata1 = JSON.parse(localStorage.getItem('roleStatus'));
        this.user = JSON.parse(localStorage.getItem('firstname'));
        let previousUrl1 = localStorage.getItem('previousUrl');
        this.authorize = localStorage.getItem('authorization');
        let role = JSON.parse(localStorage.getItem('role'));

        if (this.user === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          if (this.wholedata === 'ACTIVE' && this.wholedata1 === 'Active') {
            // if(this.authorize){
            //   this.visitId = localStorage.getItem('lastvisitproductid');
            //   this.router.navigate(['/viewmore/' + this.visitId ]);
            //   localStorage.removeItem('authorization');
            // }else{
              if (previousUrl1 == '/blog-view') {
                this.router.navigate(['/blog']);
              } else if(role == "seller"){
                this.router.navigate(['/products']);
              }else{
                this.router.navigate(['/my-order']);
              }
            //}
          }
        else if(this.wholedata != 'ACTIVE') {
            this.deactiveErrorMsg = 'Your account has been deactivated !';
          }else if(this.wholedata1 != 'Active' && role == "seller"){
            this.adminVerifyErr = 'Stay cool until get confirmation from Uzhavarsanthai to login!';
            this.mytemplateForm.reset();
            this.removeLS();
          }else if(this.wholedata1 != 'Active' && role == "buyer"){
            this.router.navigate(['/my-order']);
          }
          this.loadingCtrl.hide();
        }
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'login';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
        if (err.statusText === 'Unauthorized') {
          this.errormsg = 'Invalid Phone Number or Password !';
          setTimeout(() => {
            this.errormsg = '';
          }, 5000);
        }
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'login';
        this.postTrackInformation();
      }
    );
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
    localStorage.removeItem('credits');
  }

  toggle() {
    this.mytemplateForm.reset();
    //document.getElementById('hideForm').style.display = 'none';
    document.getElementById('showForm').style.display = 'block';
  }

  register() {
    this.router.navigate(['/register']);
  }

  sendOtp() {
    if (this.errMsgVerfi) {
      this.errMsgVerfi = '';
    }
    console.log(this.phoneObj);
    let resultpath = this.phoneObj.phone1;
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += resultpath[Math.floor(Math.random() * 10)];
    }
    this.phoneObj.otp = OTP;
    this._auth.forgotPassword(this.phoneObj).subscribe(
      res => {
        console.log(res);
        if (this.errormsg1) {
          this.errormsg1 = '';
        }
        // this.phoneObj.phone1 = '';
        this.optsent = this.phoneObj.phone1;
        // setTimeout(() => {
        //   this.optsent = '';
        // }, 3000);
        document.getElementById('showForm').style.display = 'none';
        document.getElementById('secondDiv').style.display = 'block';
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'forgotPwd';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        if (err.statusText == 'Unauthorized') {
          this.errormsg1 = 'Please enter registered phone number!';
          setTimeout(() => {
            this.errormsg1 = '';
          }, 7000);
        }
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'forgotPwd';
        this.postTrackInformation();
      }
    );
  }

  verifyOtp() {
    console.log(this.phoneObj.otp);
    if (this.verifyPhone1.verifyPhone == this.phoneObj.otp) {
      this.verifymsg = "Your otp has been verified!";
      setTimeout(() => {
        this.verifymsg = '';
      }, 3000);
      document.getElementById('secondDiv').style.display = 'none';
      document.getElementById('firstDiv').style.display = 'block';
    } else {
      this.errMsgVerfi = 'You have entered invalid OTP';
      // document.getElementById('verify').style.display = 'none';
      document.getElementById('resend').style.display = 'block';
      this.verifyPhone1.verifyPhone = '';
    }
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
