import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DealsService } from '../deals.service';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('forgotpwdform') mytemplateForm1: NgForm;
  @ViewChild('pwdform') mytemplateForm2: NgForm;
  loggedUser = [];
  @ViewChild('editForm') form;
  currentuserId: any;
  public dummyname: any = {};
  loggedUser1: any = {}
  submitted: boolean;
  firstnam = '';
  success: any;
  id: any;
  checkpassword = false;
  public trackInformationData: any = {};
  notOldpwderr: any;
  otpObj: any = {};
  currentusername: any;
  public crntUser: any = {};
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  public address: any;
  adrss: any;
  addrs: any;
  pwd: any;
  googleAddress: any;
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  constructor(
    private http: HttpClient,
    private _dealsService: DealsService,
    public _authService: AuthService,
    public loadingCtrl: NgxSpinnerService,
    private router: Router,
    private _users: DealsService,
    private route: ActivatedRoute,
    public zone: NgZone
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    document.getElementById('focusDiv').focus();
    this.InitialCall();

    this.pwd = JSON.parse(localStorage.getItem('currentUser')).password;
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;

    this._users.getDetails().subscribe(
      res => {
        this.loggedUser = res;
        console.log(this.loggedUser);
        for (let i = 0; i < this.loggedUser.length; i++) {
          if (this.id == this.loggedUser[i]._id) {
            this.loggedUser1 = this.loggedUser[i];
            this.crntUser = this.loggedUser[i];
            console.log(this.crntUser);
          }
        }
        if (
          this.crntUser.address.addressLine == '' ||
          this.crntUser.address.addressLine == null ||
          this.crntUser.address.addressLine == 'Not yet update' ||
          (this.crntUser.address.city == '' ||
            this.crntUser.address.city == undefined ||
            this.crntUser.address.city == 'Not yet update')
        ) {
          this.crntUser.address.addressLine = '';
          this.crntUser.address.city = '';
          console.log(this.crntUser.address.city);
          console.log(this.crntUser.address.addressLine);
        }
        this.loadingCtrl.hide();

        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      }
    );
  }

  updateUser() {
    this.loadingCtrl.show();
    localStorage.setItem('firstname', JSON.stringify(this.crntUser.firstname));
    console.log(this.addr != undefined || this.addr != null);
    if (this.addr != undefined || this.addr != null) {
      this.crntUser.address.city = this.addr;
    }
    console.log(this.crntUser);

    this._users.updateCustomer(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
        localStorage.setItem(
          'currentUpdateAddr',
          JSON.stringify(this.crntUser)
        );
        this.updatePostName();
        // this.removeLS();
        //this.updateReviewSellerName();
        //this.updateReviewBuyerName();
        this.loadingCtrl.hide();
        if (this.checkpassword == true) {
          document.getElementById('closePwdModal').click();
          document.getElementById('openPwdModal').click();
          this.removeLS();
          // this._authService.logoutUser();
        } else {
          document.getElementById('openUpdateModal').click();
        }
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateuser';
        this.postTrackInformation();
        // this.success = 'Updated successfully!';
        // setTimeout(() => {
        //   this.success = '';
        //   if(this.checkpassword == true){
        //     document.getElementById("closePwdModal").click();
        //     this._authService.logoutUser();
        //     this.router.navigate(['/login']);
        //   }
        // }, 2000);
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateuser';
        this.postTrackInformation();
      }
    );
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

  updatePostName() {
    console.log(this.id);
    this._users.updatePostName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateNamePost';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateNamePost';
        this.postTrackInformation();
      }
    );
  }

  updateReviewSellerName() {
    console.log(this.id);
    this._users.updateReviewSellerName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateSellerNameReview';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateSellerNameReview';
        this.postTrackInformation();
      }
    );
  }

  updateReviewBuyerName() {
    console.log(this.id);
    this._users.updateReviewBuyerName(this.crntUser, this.id).subscribe(
      res => {
        console.log(res);
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateBuyerNameReview';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateBuyerNameReview';
        this.postTrackInformation();
      }
    );
  }

  handleInput(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return true;
    return false;
  }

  InitialCall() {
    for (let i = 0; i < this.loggedUser1.length; i++) {
      if (this.id == this.loggedUser1[i]._id) {
        console.log(this.loggedUser1[i])
        this.crntUser.firstname = this.loggedUser1[i].firstname;
        this.crntUser.address.addressLine = this.loggedUser1[
          i
        ].address.addressLine;
        //this.crntUser.address.address1 = this.loggedUser[i].address.address1;
        //this.crntUser.address.city.formatted_address = this.loggedUser[i].address.city.formatted_address;
        console.log(this.loggedUser1[i])
      }
    }
    console.log(this.crntUser);
  }

  onSubmit() {
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();
    this.InitialCall();
  }

  changePwd() {
    document.getElementById('openChangePwdModal').click();
    this.notOldpwderr = '';
    this.mytemplateForm1.reset();
    this.mytemplateForm2.reset();
    document.getElementById('firstDiv').style.display = 'block';
    document.getElementById('secondDiv').style.display = 'none';
  }
  verifyPwd() {
    if (this.crntUser.oldotp == this.pwd) {
      this.notOldpwderr = '';
      document.getElementById('secondDiv').style.display = 'block';
      document.getElementById('firstDiv').style.display = 'none';
      this.checkpassword = true;
    } else {
      this.notOldpwderr = 'You have entered wrong password';
    }
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
