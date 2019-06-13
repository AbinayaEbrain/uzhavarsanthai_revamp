import { Component, OnInit ,ViewChild,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
declare var swal: any;
declare var $:any;
@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
    @ViewChild('updateAddressform') mytemplateForm: NgForm;
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
    public _auth:AuthService,
    public zone: NgZone,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {
    for (let i = 1; i <= this.userDeals.length; i++) {
      this.userDeals.push('Angular ${i}.0');
    }
    for (let i = 1; i <= this.userDeals1.length; i++) {
      this.userDeals1.push('Angular ${i}.0');
    }
  }

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

    console.log(this.currentUserid)
    this.loadingCtrl.show();
    this.checkAddress();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSingleUser();
  }

  getSingleUser() {
    this._dealsService.getSingleUser(this.id).subscribe(
      data => {
        console.log(data);
        this.crntUser = data;
        this.roleStatus = data.roleStatus;
        this.role = data.role;
        this.credits = data.credits;
        if (this.role == 'buyer' || this.roleStatus == 'Deactive') {
          this.loadingCtrl.hide();
        }

        if (this.role == 'seller' && this.roleStatus == 'Active') {
          this.getDeals();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  goToBack() {
    this.location.back();
  }

  getDeals() {
    this._dealsService.getDeals().subscribe(
      res => {
        let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        let l = 0;
        this.crdDeals = res;
        this.errMsg2 = '';
        console.log(this.crdDeals);
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            acntID == this.crdDeals[i].accountId &&
            this.crdDeals[i].validityTime > CurrentDate
          ) {
            this.userDeals[j] = this.crdDeals[i];
            this.getPrdtName[l] = this.userDeals[j].name;
            j++;
            l++;
          }
        }

        if (this.userDeals.length == 0) {
          this.errMsg = "Still you haven't post any deals";
          document.getElementById('hideSearchDiv').style.display = 'none';
        }
        this.loadingCtrl.hide();
        // this.getMultiArray();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

checkAddress(){
  this._dealsService.getDetails().subscribe(
    res => {
      this.loadingCtrl.hide();
      for (let i = 0; i < res.length; i++) {
        if (this.id == res[i]._id) {
          this.userAddress = res[i].address.addressLine;
          console.log(this.userAddress )
        }
      }
    },
    err => {
      console.log(err);
    }
  );
}

// confirmAddAddr(){
//   document.getElementById("closeAddressModal1").click();
//   document.getElementById("updateAddressModal").click();
// }

confirmAddAddrMobile(){
  document.getElementById("closeAddressModal1").click();
  this.router.navigate(['/updateAdderss'])
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
console.log(this.userAddress == null || this.userAddress == '')
if(this.userAddress == null || this.userAddress == ''){
  document.getElementById("updateAddressConfirmationModal").click();
  this.mytemplateForm.reset();
}else{
  this.router.navigate(['/post'])
}
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
        document.getElementById('closeAddressModal').click();
        document.getElementById("openConfirmModal").click();
        // this.successMsg = 'Updated successfully!';
        // setTimeout(() => {
        //   this.successMsg = '';
        //   this.router.navigateByUrl('/dummy', { skipLocationChange: true });
        //   setTimeout(() => this.router.navigate(['/products']),100);
        //   document.getElementById('closeAddressModal').click();
        // }, 2000);

      },
      err => {
        console.log(err);
      }
    );
  }

  checkSellerCredit() {
    console.log(this.credits);
    this.myCredit = this.credits.credits;
    console.log(this.myCredit);
    if (this.myCredit < 1) {
      console.log('No credit');
      swal({
        title: 'You have no credit!',
        text: 'If you post your product! Please pay MONEY show your PLANS.',
        imageUrl: '../../assets/Images/progress.gif'
      });
      this.router.navigate(['/subscription-plan']);
    } else {
      console.log('You have a credit');
      this.router.navigate(['/post']);
    }
  }

  // getMultiArray(){
  //   this._dealsService.getMultiPost().subscribe(res =>{
  //     console.log(res);

  //     let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
  //     let j = 0;
  //     let CurrentDate = new Date().toISOString();

  //     for(let i = 0 ; i < res.length ; i++){
  //       if (
  //         acntID == res[i].accountId &&
  //         res[i].validityTime > CurrentDate
  //       ){
  //         this.multiPost[j] = res[i];
  //         j++;
  //       }
  //     }
  //     this.getArray();
  //   },err =>{
  //     console.log(err);
  //   });
  // }

  // getArray(){
  //   this.singleMultiArray = this.userDeals.concat(this.multiPost);
  //   if (this.singleMultiArray.length == 0) {
  //     this.errMsg = "Still you haven't post any deals";
  //   }
  // }

  getActiveDeals() {
    this.queryString = '';
  }

  case() {
    console.log(this.queryString)
    console.log(this.errMsg2)
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.getPrdtName.length; i++) {
      if (this.queryString != this.getPrdtName[i]) {
        this.errMsg2 = 'Category is not available';
      }else{
        this.errMsg2 = '';
      }
    }
    if(this.queryString === ''){
      this.errMsg2 = '';
    }
    console.log(this.errMsg2)
  }

  getExpiredDeals() {
    this.loadingCtrl.show();
    this.queryString = '';
    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        this.crdDeals = res;
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            acntID == this.crdDeals[i].accountId &&
            this.crdDeals[i].validityTime < CurrentDate
          ) {
            this.userDeals1[j] = this.crdDeals[i];
            j++;
          }
        }
        if (this.userDeals1.length == 0) {
          this.errMsg1 = 'No expired products found';
          document.getElementById('hideSearchDiv').style.display = 'none';
        }
        // for (let j = 0; j < this.userDeals1.length; j++) {
        //   if (this.userDeals1[j].category == undefined) {
        //     this.loadingCtrl.show();
        //     this.errMsg1 = 'No expired products found';
        //     document.getElementById('hideEditBtn1').style.display = 'none';
        //     document.getElementById('hideDeleteBtn1').style.display = 'none';
        //     // document.getElementById('hideSearchDiv').style.display = 'none';
        //     document.getElementById('hide1').style.display = 'none';
        //     this.loadingCtrl.hide();
        //   }
        // }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  deleteuser() {
    this.loadingCtrl.show();

    this.id = this.route.snapshot.params['id'];
    this._dealsService.deletedeal(this.id).subscribe(
      res => {
        setTimeout(() => {
          this.success = 'Deleted successfully!';
          this.router.navigate(['/products']);
          this.loadingCtrl.hide();
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteMultiPost() {
    this.id = this.route.snapshot.params['id'];
    this._dealsService.deleteMultiPost(this.id).subscribe(
      res => {
        this.success = 'Deleted successfully!';

        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.router.navigate(['/products']);
          this.loadingCtrl.hide();
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
}
