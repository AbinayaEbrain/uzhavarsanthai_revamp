import { Component, OnInit ,ViewChild,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css']
})
export class UpdateaddressComponent implements OnInit {
  myCredit: any;
credits: any;
crdDeals = [];
crdDeals1 = [];
userDeals = [];
userDeals1 = [];
submitted:any;
getPrdtName = [];
id: any;
deal: any;
errMsg: any;
errMsg1: any;
success: any;
queryString: any;
successMsg:any;
p: any;
d: any;
errMsg2: any;
hideProduct = true;
multiPost = [];
currentUserid:any;
currentUserName:any;
currentUserPwd:any;
currentUserPhone:any;
currentUserRole:any;
currentUserRoleStatus:any;
currentUserCredits:any;
currentUserStatus:any;
userAddress : any;
singleMultiArray = [];
public updateAddressData: any = {};
public addrKeys: string[];
public addr: {
  formatted_address: '';
};
crntUser: any = {};
roleStatus: any;
role: any;

crdits:any;
setAddress(addrObj) {
  this.zone.run(() => {
    this.addr = addrObj;
    this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys);
      console.log(this.addr )
  });
}

constructor(
  private _dealsService: DealsService,
  private route: ActivatedRoute,
  private router: Router,
  public zone: NgZone,
  public loadingCtrl: NgxSpinnerService,
) { }

ngOnInit() {
  document.getElementById('focusDiv').focus();
this.currentUserid = JSON.parse(localStorage.getItem('currentUser'))._id;
this.currentUserName = JSON.parse(localStorage.getItem('currentUser')).firstname;
this.currentUserPwd = JSON.parse(localStorage.getItem('currentUser')).password;
this.currentUserPhone = JSON.parse(localStorage.getItem('currentUser')).phone;
this.currentUserRole = JSON.parse(localStorage.getItem('currentUser')).role;
this.currentUserRoleStatus = JSON.parse(localStorage.getItem('currentUser')).roleStatus;
this.currentUserCredits = JSON.parse(localStorage.getItem('currentUser')).credits;
this.currentUserStatus = JSON.parse(localStorage.getItem('currentUser')).status;
this.getSingleUser();
}

getSingleUser() {
  this._dealsService.getSingleUser(this.currentUserid).subscribe(
    data => {
      console.log(data);
      this.crntUser = data;
      this.roleStatus = data.roleStatus;
      this.role = data.role;
      this.credits = data.credits;

    },
    err => {
      console.log(err);
    }
  );
}

updateAddress(){
  this.updateAddressData.firstname = this.currentUserName;
  this.updateAddressData.password =   this.currentUserPwd ;
  this.updateAddressData.phone = this.currentUserPhone;
  this.updateAddressData.roleStatus =  this.roleStatus;
  this.updateAddressData.status = this.currentUserStatus;
  this.updateAddressData.role = this.role ;
  this.updateAddressData.credits = this.credits ;
  this.updateAddressData.address = this.addr;
  console.log(this.updateAddressData)
  this._dealsService.updateCustomerAddress(this.updateAddressData, this.currentUserid).subscribe(
    res => {
      console.log(res);
      localStorage.setItem('currentUpdateAddr', JSON.stringify(this.updateAddressData));
      this.loadingCtrl.hide();
      // document.getElementById('closeAddressModal').click();
      document.getElementById("openConfirmModal").click();
    },
    err => {
      console.log(err);
    }
  );
}
}
