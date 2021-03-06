import { Component, OnInit ,NgZone} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealsService } from '../deals.service';
import { AuthService } from '../auth.service';
import { Router, ParamMap } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // public updateAddressData: any = {};
  gettoken:any;
  submitted:any;
  role:any;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  userAddress : any;
  id:any;
  credits:any;
  currentuserAddress : any;
  currentUserid:any;
  currentUserName:any;
  currentUserPwd:any;
  currentUserPhone:any;
  currentUserRole:any;
  currentUserRoleStatus:any;
  currentUserCredits:any;
  currentUserStatus:any;
  successMsg:any;
  roleStatus:any
  crntUser: any = {};
  public updateAddressData: any = {};
  public trackInformationData: any = {};
  crdits:any;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
        console.log(this.addrKeys);
        console.log(this.addr )
    });
  }

  constructor(public loadingCtrl: NgxSpinnerService,
              private _dealsService: DealsService,
              public zone: NgZone,
              private router: Router,
              private _auth: AuthService) 
    { }


  ngOnInit() {
  this.gettoken = this._auth.loggedIn();
        document.getElementById('focusDiv').focus();
        if(localStorage.getItem('currentUser')){
          this.currentUserid = JSON.parse(localStorage.getItem('currentUser'))._id;
          this.currentUserName = JSON.parse(localStorage.getItem('currentUser')).firstname;
          this.currentUserPwd = JSON.parse(localStorage.getItem('currentUser')).password;
          this.currentUserPhone = JSON.parse(localStorage.getItem('currentUser')).phone;
          this.currentUserCredits = JSON.parse(localStorage.getItem('currentUser')).credits;
          this.currentUserStatus = JSON.parse(localStorage.getItem('currentUser')).status;
        }
        console.log(this.currentUserid);

    this.loadingCtrl.show();
    setTimeout(() => {
      this.loadingCtrl.hide();
  }, 1000);
  if(this.currentUserid){
    this.getSingleUser();
  }
    this.checkAddress();
  }

  getSingleUser(){
    this._dealsService.getSingleUser(this.currentUserid).subscribe(data =>{
      console.log(data);
      this.crntUser = data;
      this.roleStatus = data.roleStatus;
      this.role = data.role;
      this.credits = data.credits;
      this.trackInformationData.response = 'Success';
      this.trackInformationData.apiName = 'getSingleUser';
      this.postTrackInformation();
    },err =>{
      console.log(err);
      this.trackInformationData.response = 'Failure';
      this.trackInformationData.error = err.statusText;
      this.trackInformationData.apiName = 'getSingleUser';
      this.postTrackInformation();
    })

  }

  checkAddress(){
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.currentUserid == res[i]._id) {
            console.log(res)
            this.userAddress = res[i].address.addressLine;
            console.log(this.userAddress )
          }
        }
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      }
    );
  }

  getUser(){
    var pacContainerInitialized = false;
     $('#city').keypress(function() {
      if (!pacContainerInitialized) {
        console.log("df")
              $('.pac-container').css('z-index', '9999');
              pacContainerInitialized = true;
      }
});
if(this.gettoken == true && this.role =='seller'){
  console.log(this.userAddress == null || this.userAddress == '')
  if(this.userAddress == null || this.userAddress == ''){
      // document.getElementById("updateAddressConfirmationModal").click();
      this.router.navigate(['/products'])
    }else{
        this.router.navigate(['/post']);
    }
}
  else if (this.role =='buyer'){
  this.router.navigate(['/buyerAsSeller'])
}
else{
  this.router.navigate(['/post']);
}
}


  confirmAddAddr(){
    document.getElementById("closeAddressModal1").click();
    document.getElementById("updateAddressModal").click();
  }

  updateAddress(){
    this.updateAddressData.firstname = this.currentUserName;
    this.updateAddressData.password =   this.currentUserPwd ;
    this.updateAddressData.phone = this.currentUserPhone;
    this.updateAddressData.roleStatus = this.roleStatus;
    this.updateAddressData.status = this.currentUserStatus;
    this.updateAddressData.role = this.role;
    this.updateAddressData.credits = this.credits;
    this.updateAddressData.address = this.addr;
    console.log(this.updateAddressData)
    this._dealsService.updateCustomerAddress(this.updateAddressData, this.currentUserid).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('currentUpdateAddr', JSON.stringify(this.updateAddressData));
        this.loadingCtrl.hide();
        document.getElementById('closeAddressModal').click();
        document.getElementById("openConfirmModal").click();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateuseraddress';
        this.postTrackInformation();
        // this.router.navigate(['/post'])
        // this.successMsg = 'Updated successfully!';
        // setTimeout(() => {
        //   this.router.navigateByUrl('/dummy', { skipLocationChange: true });
        //   setTimeout(() => this.router.navigate(['/post']),100);
        // }, 100);

      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateuseraddress';
        this.postTrackInformation();
      }
    );
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
