import { Component, OnInit, ViewChild, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { DealsService } from '../deals.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare var $:any;
declare var swal: any;
declare var google: any;


@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit, AfterViewChecked {
  reviewlngthErr: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('loginform') mytemplateForm1: NgForm;
  @ViewChild('postform') mytemplateForm2: NgForm;
  @ViewChild('queryform') mytemplateForm3: NgForm;
  @ViewChild('forgotpwdform') mytemplateForm4: NgForm;

  rqstId : any;
  show = 3;
  id = '';
  viewmore = [];
  viewPost = [];
  userData = {};
  requestPerson = [];
  time: any;
  public postProduct: any = {};
  public querydata: any = {};
  public requestData: any ={};
  public cancelOrderData: any ={};
  resetPasswordObj: any = {};
  city: any;
  state: any;
  userName = '';
  adrsArray: any;
  public previousUrl: any;
  private sendSignUpMail = 'https://uzhavarsanthai.herokuapp.com/api/sendMailSignUp';
  private orderCancelmail = 'https://uzhavarsanthai.herokuapp.com/api/sendordercancelrequest';
  imageArray = '';
  imageMultiArray = '';
  arrayImage = [];
  slideConfig:any;
  getToken : any;
  lastvisit:any;
  reqId:any;
  requestSent:any;
  buyerName:any;
  buyerPhone:any;
  submitted:any;
  buyerAddress : any;
  buyerCity = {};
  orderRequestMsg:any;
  loggedUser:any;
  wholedata: any;
  wholedata1: any;
  user: any;
  authorize:any;
  visitId:any;
  deactiveErrorMsg: any;
  adminVerifyErr: any;
  errormsg;
  verifyPhone1: any = {};
  errMsgVerfi: any;
  phoneObj: any = {};
  errormsg1: any;
  optsent: any;
  signUoptsent:any;
  phnErr: any;
  verifymsg:any;
  notEqual: any;
  message: any;
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
  success: any;
  signErrormsg :any;
  signUpNumbrExisterrormsg:any;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  orderLiveStatus:any;
  orderCancelMsg:any;
  disputeArr : any = [];
  reviewArr : any = [];
  reviewlngth:any;


  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
        console.log(this.addrKeys);
    });
  }

  constructor(
    private _dealsService: DealsService,
    private router: Router,
    public zone: NgZone,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public loadingCtrl: NgxSpinnerService,
    private location: Location,
    private _auth: AuthService,
    private http: HttpClient
  ) {
      this.registeredUserData.address.location = '';
      this.registeredUserData.address.city = '';
      this.querydata.requiredUnit = '';
  }

  ngOnInit() {
    //this.userName = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.id = this.route.snapshot.params['id'];
    this.loadingCtrl.show();
    this.lastvisit = localStorage.getItem('lastvisitproductid');
    this.scrollToBottom();  
    if(this.id){
      this.getDeals();
      this.getMultiPostDeals();
    }
  }
  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  getDeals(){
    this._dealsService.getDeals().subscribe(
      res => {
        this.viewPost = res;
        console.log(this.viewPost);
        for (let i = 0; i < this.viewPost.length; i++) {
          if (this.id == this.viewPost[i]._id) {
            this.postProduct.id = this.viewPost[i]._id;
            this.postProduct.category = this.viewPost[i].category;
            this.postProduct.categoryId = this.viewPost[i].categoryId;
            this.postProduct.name = this.viewPost[i].name;
            this.postProduct.quantity = this.viewPost[i].quantity;
            this.postProduct.qnty = this.viewPost[i].qnty;
            this.postProduct.subQuantity = this.viewPost[i].subQuantity;
            this.postProduct.subqnty = this.viewPost[i].subqnty;
            this.postProduct.price = this.viewPost[i].price;
            this.postProduct.bulk = this.viewPost[i].bulk;
            this.postProduct.description = this.viewPost[i].description;
            this.postProduct.avlPlace = this.viewPost[
              i
            ].avlPlace.formatted_address;
            this.postProduct.accountId = this.viewPost[i].accountId;
            this.imageArray = this.viewPost[i].image;
            this.time = this.viewPost[i].validityTime;
            this.postProduct.firstName = this.viewPost[i].username;
            this.postProduct.lastName = this.viewPost[i].lastname;
            this.postProduct.phone = this.viewPost[i].userNumber;
            this.postProduct.userAddressLine = this.viewPost[i].userAddressLine;
            this.postProduct.address = this.viewPost[i].userAddress;
            this.postProduct.dispute = this.viewPost[i].dispute;
            this.postProduct.productreview = this.viewPost[i].productreview;
            this.getToken = localStorage.getItem('token');
            var check = this.viewPost[i].orderrequests;

            if(this.getToken && check){
              this.requestPerson = this.viewPost[i].orderrequests;
              for (let i = 0; i < this.requestPerson.length; i++) {
                this.orderLiveStatus = this.requestPerson[i].orderStatus;
                this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))._id;
                if(this.loggedUser == this.requestPerson[i].requestedPersonId && this.orderLiveStatus == "Order created"){
                  this.requestSent = "Order Request Sent!"
                }
              }
            }

            this.loadingCtrl.hide();
          }
        }
        this.postProduct.validityTime = this.datePipe.transform(
          this.time,
          'dd/MM/yyyy'
        );
        this.disputeArr = this.postProduct.dispute;
        console.log(this.disputeArr);
        
        this.reviewArr = this.postProduct.productreview;
        console.log(this.reviewArr);
        if(this.reviewArr != undefined){
        this.reviewlngth = this.reviewArr.length;
        console.log(this.reviewlngth);
      }
      if(this.reviewArr == 0){
        this.reviewlngthErr = 'No review';
      }
        this.arrayImage = this.imageArray.split(',');
        // this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
        this.slideConfig = {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: false,
          arrows: false,
          autoplay: false,
          autoplaySpeed: 1500
        };
      },
      err => console.log(err)
    );
  }

  getMultiPostDeals(){
    this._dealsService.getMultiPost().subscribe(res =>{
      for(let i = 0 ; i < res.length ; i++){
        if(res[i]._id == this.id){
          this.postProduct.category = res[i].category;
            this.postProduct.categoryId = res[i].categoryId;
            this.postProduct.description = res[i].description;
            this.postProduct.firstName = res[i].username;
            this.postProduct.bulk = res[i].bulk;
            this.time = res[i].validityTime;
            this.imageMultiArray = res[i].image;
        }
      }

      this.postProduct.validityTime = this.datePipe.transform(
        this.time,
        'dd/MM/yyyy'
      );
      if(this.imageMultiArray){
        this.arrayImage = this.imageMultiArray.split(',');
      }

      this.loadingCtrl.hide();
    },err =>{
      console.log(err);
      this.loadingCtrl.hide();
    });
  }

openloginModal(){
  this.mytemplateForm1.reset();
  document.getElementById("openLoginModal").click();
  document.getElementById("hideForm").style.display="block";
  document.getElementById("showForm").style.display="none";
  document.getElementById("secondDiv").style.display="none";
}

sendQuery(){
  this.loadingCtrl.show();
  var a = "UZ"
  this.reqId = Math.floor(100000 + Math.random() * 900000);
  console.log(this.reqId);
  this.querydata.requestId = a+ "-" +this.reqId;
  this.buyerName = JSON.parse(localStorage.getItem('currentUser')).firstname;
  this.buyerPhone = JSON.parse(localStorage.getItem('currentUser')).phone;
  this.buyerAddress = JSON.parse(localStorage.getItem('currentUser')).address.addressLine;
  this.buyerCity = JSON.parse(localStorage.getItem('currentUser')).address.city.formatted_address;
  this.querydata.buyerName =  this.buyerName;
  this.querydata.buyerPhone =  this.buyerPhone;
  this.querydata.buyerAddress =  this.buyerAddress;
  this.querydata.buyerCity =  this.buyerCity;
  this.querydata.buyerId = JSON.parse(localStorage.getItem('currentUser'))._id;
  //seller data
  this.querydata.sellerName = this.postProduct.firstName;
  this.querydata.sellerPhone = this.postProduct.phone;
  this.querydata.sellerAddress =   this.postProduct.userAddressLine;
  this.querydata.sellerCity = this.postProduct.address;
  this.querydata.sellerId = this.postProduct.accountId;
  //prduct data
  this.querydata.prdctId = this.postProduct.id;
  this.querydata.prdctCategory = this.postProduct.category;
  this.querydata.prdctCategoryId =  this.postProduct.categoryId;
  this.querydata.prdctName = this.postProduct.name;
  this.querydata.prdctUnit = this.postProduct.qnty;
  this.querydata.prdctQty = this.postProduct.quantity
  this.querydata.prdctAvlplace = this.postProduct.avlPlace;
  this.querydata.image = this.imageArray;
  this.querydata.status = 'Order created';
  let curntDte = new Date().getTime();
  this.querydata.createdAt = curntDte;

  this._dealsService.sendOrderReqmail(this.querydata).subscribe(
    res => {
      console.log(res);
      this.storeOrderRequest();
      this.mytemplateForm3.reset();
        this.orderRequestMsg = 'We got your order query, we get back to you soon!';
        document.getElementById("closeRequirementModal").click();
         setTimeout(() => {
             this.orderRequestMsg='';
         },3000)
        this.router.navigate(['/my-order']);
        this.loadingCtrl.hide();
    },
    err => {console.log(err);
      this.loadingCtrl.hide();}
  );

// this.smsToSeller();
// this.smsToBuyer();

}

//store order request
storeOrderRequest(){
    this.loadingCtrl.show();
  this._dealsService.storeOrderRequest(this.querydata).subscribe(
    res => {
      console.log(res);
      this.requestData.orderRqstId = res._id;
      console.log(this.requestData.orderRqstId);
      this.mapWithPost();
    },
    err => console.log(err)
  );
}

//sms to seller
smsToSeller(){
  this._dealsService.sendOrderSmsSeller(this.querydata).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
}
//sms to buyer
smsToBuyer(){
  this._dealsService.sendOrderSmsBuyer(this.querydata).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
}

//map with post
mapWithPost(){
  this.requestData.requestedProductId = this.id;
  this.requestData.requestedPersonId = JSON.parse(localStorage.getItem('currentUser'))._id;
  this.requestData.orderStatus = 'Order created';
  console.log(this.requestData);

  this._dealsService.mapUserIdinPost(this.requestData).subscribe(
    res => {
      console.log(res);
      this.loadingCtrl.hide();
    },
    err => {console.log(err);
      this.loadingCtrl.hide();}
  );
}

  slickInit(e) {
    console.log('slick initialized');
  }

  goToBack() {
    this.location.back();
  }

  checkBuyer() {
    console.log('function works');
    this.getToken = localStorage.getItem('token');
    if (
      this.getToken == null ||
      this.getToken == undefined ||
      this.getToken == ''
    ) {
      console.log('not logged');
      var a = 'wait for login';
      localStorage.setItem('authorization', JSON.stringify(a));
      localStorage.setItem('lastvisitproductid',this.id);
      this.errormsg ='';
      this.adminVerifyErr ='';
      this.deactiveErrorMsg ='';
      this.mytemplateForm1.reset();
     this.openloginModal();

    }else {
      console.log('logged');
      // this.openModal();
    }
  }

  //login myModal
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

  logform() {
    this.loadingCtrl.show();
    this._auth.logInUser(this.userData).subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('status', JSON.stringify(res.user.status));
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
          console.log('2');
          this.router.navigate(['/admin']);
        } else {

          if (this.wholedata === 'ACTIVE' && this.wholedata1 === 'Active') {
		    if(this.authorize){

              this.visitId = this.route.snapshot.params['id'];
              // this.router.navigate(['/viewmore/' + this.visitId ]);
              document.getElementById("closeLoginModal").click();
              this.router.navigateByUrl('/dummy', { skipLocationChange: true });
              setTimeout(() => this.router.navigate(['/viewmore/' + this.visitId ]),100);

              localStorage.removeItem('authorization');
            }else{
              if (previousUrl1 == '/blog-view') {
                this.router.navigate(['/blog']);
              } else if(role == "seller") {
                this.router.navigate(['/products']);
              }else{
                this.router.navigate(['/my-order']);
              }
            }
          }
        else if(this.wholedata != 'ACTIVE') {
          console.log('8');
            this.deactiveErrorMsg = 'Your account has been deactivated !';
            // setTimeout(() => {
            //   this.deactiveErrorMsg = '';
            // }, 3000);
          }else if(this.wholedata1 != 'Active'  && role == "seller"){
            console.log('9');
            this.adminVerifyErr = 'Stay cool until get confirmation from Uzhavarsanthai to login!';
            this.mytemplateForm1.reset();
            this.removeLS();
          }else if(this.wholedata1 != 'Active' && role == "buyer"){
            this.router.navigate(['/my-order']);
          }
          this.loadingCtrl.hide();
        }
      },
      err => {
        this.loadingCtrl.hide();
        if (err.statusText === 'Unauthorized') {
          console.log('10');
          this.errormsg = 'Invalid Phone Number and Password !';
          // setTimeout(() => {
          //   this.errormsg = '';
          // }, 3000);
        }
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
  }

    toggle() {
      this.mytemplateForm1.reset();
      this.mytemplateForm4.reset();
      document.getElementById('hideForm').style.display = 'none';
      document.getElementById('showForm').style.display = 'block';
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
          this.optsent = 'OTP has been sent to this number successfully! '+ resultpath;
          setTimeout(() => {
            this.optsent = '';
          }, 3000);
          document.getElementById('showForm').style.display = 'none';
          document.getElementById('secondDiv').style.display = 'block';
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
        }
      );
    }

    phnTen() {
      if (this.phoneObj.phone1.length !== 10) {
        //alert(this.registeredUserData.phone.length)
        this.phnErr = 'Phone number must be 10 digits';
        setTimeout(() => {
          this.phnErr = '';
        }, 3000);
        //alert(this.phnErr)
      }
    }

    phnTen1() {
      if (this.phoneObj.phone.length !== 10) {
        //alert(this.registeredUserData.phone.length)
        this.phnErr = 'Phone number must be 10 digits';
        setTimeout(() => {
          this.phnErr = '';
        }, 3000);
        //alert(this.phnErr)
      }
    }

    register() {
      this.mytemplateForm2.reset();
      var pacContainerInitialized = false;
       $('#city').keypress(function() {
        if (!pacContainerInitialized) {
          console.log("df")
                $('.pac-container').css('z-index', '9999');
                pacContainerInitialized = true;
        }
});
        document.getElementById("closeLoginModal").click();
        document.getElementById("openSignupModal").click();
        document.getElementById("signUpfirstDiv").style.display="block";
        document.getElementById("signUpsecondDiv").style.display="none";
        document.getElementById("afterotpverified").style.display="none";
        this.signUpNumbrExisterrormsg ='';


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
      if (value != value1) {
        this.notEqual = "Password doesn't match";
        // setTimeout(() => {
        //   this.notEqual = '';
        // }, 3000);
      } else {
        this.notEqual = '';
      }
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
            }, 3000);
            this.phoneObj.phone1 = '';
            document.getElementById('firstDiv').style.display = 'none';
            document.getElementById('hideForm').style.display = 'block';
          },
          err => {
            console.log(err);
          }
        );
    }

    //register modal
    showLogin(){
      document.getElementById("closeSignUpModal").click();
      document.getElementById("openLoginModal").click();
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
              this.visitId = this.route.snapshot.params['id'];
              document.getElementById("closeSignUpModal").click();
              this.router.navigateByUrl('/dummy', { skipLocationChange: true });
              setTimeout(() => this.router.navigate(['/viewmore/' + this.visitId ]),100);
              localStorage.removeItem('authorization');

            }else{
            this.router.navigate(['/my-order']);
            }
          }
          if (res.statusText == 'Unauthorized') {
            this.signErrormsg = 'Check phone number and Password !';
            this.loadingCtrl.hide();
          }
        },
        err => {
          console.log(err);
          if (err.statusText == 'Unauthorized') {
            this.errormsg = 'Phone number already exist!';
            this.loadingCtrl.hide();
          }
        }
      );
    }

    signUpSendOtp() {
      if (this.errMsgVerfi) {
        this.errMsgVerfi = '';
      }
      console.log(this.phoneObj);
      let resultpath = this.phoneObj.phone;
      console.log(resultpath)
      let OTP = '';
      for (let i = 0; i < 6; i++) {
        OTP += resultpath[Math.floor(Math.random() * 10)];
      }
      this.phoneObj.otp = OTP;
      this._auth.sendOtp(this.phoneObj).subscribe(
        res => {
          console.log(res);
          this.signUoptsent = 'OTP has been sent to this number successfully! '+ resultpath;
          setTimeout(() => {
            this.signUoptsent = '';
          }, 3000);
          document.getElementById('signUpfirstDiv').style.display = 'none';
          document.getElementById('signUpsecondDiv').style.display = 'block';
        },
        err => {
          console.log(err);
          if (err.statusText == 'Unauthorized') {
            this.signUpNumbrExisterrormsg = 'Phone number is already registered!';
            //document.getElementById("hideGetOtp").style.display="none";
            this.loadingCtrl.hide();
          }
        }
      );
    }

    sigunUpverifyOtp() {
      console.log(this.phoneObj.otp);
      if (this.verifyPhone1.verifyPhone == this.phoneObj.otp) {
        this.verifymsg = 'Your otp has been verified!';
        setTimeout(() => {
          this.verifymsg = '';
        }, 3000);
        document.getElementById('signUpsecondDiv').style.display = 'none';
        document.getElementById('afterotpverified').style.display = 'block';
      } else {
        this.errMsgVerfi = 'You have entered invalid OTP';
        // document.getElementById('verify').style.display = 'none';
        document.getElementById('resend').style.display = 'block';
        this.verifyPhone1.verifyPhone = '';
      }
    }

    handleInput(evt) {
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return true;
      return false;
    }

//create order modal
createOrederModal(){
  this.mytemplateForm3.reset();
  document.getElementById("openOrderReqModal").click();
  this.querydata.urgency = '';
  this.querydata.requiredUnit = '';
}

cancelOrderModal(){
  document.getElementById("cancelOrderReqModal").click();
}

cancelOrderReq(){
  this.postProduct.orderStatus = 'Order cancelled';

  this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))._id;
  this.postProduct.buyerId = this.loggedUser;
  this.visitId = this.route.snapshot.params['id'];
  this.postProduct.requestedProductId = this.visitId;
  this.postProduct.orderRqstId = this.rqstId;
 
  console.log(this.postProduct);
  this._dealsService.cancelOrderStatus(this.postProduct,this.visitId).subscribe(
    res => {
      console.log(res);
      // this.updateOrderRqst();
      this.orderCancelMsg = "Order Request Cancelled!";
      setTimeout(() => {
        this.orderCancelMsg ='';
          document.getElementById("closeCancelOrderModal").click();
          // this.router.navigateByUrl('/dummy', { skipLocationChange: true });
          // setTimeout(() => this.router.navigate(['/viewmore/' + this.visitId ]),100);
          this.router.navigate(['/my-order']);
      }, 3000);
    },
    err => {
      console.log(err);
    }
  );
}

updateOrderRqst(){
  this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))._id;
  this.postProduct.buyerId = this.loggedUser;
  this.postProduct.status = 'Order cancelled';
  this.postProduct.sellerStatus = 'Order created';
  console.log(this.postProduct);
  this._dealsService.updateViewOrderRqst(this.postProduct).subscribe(data =>{
    console.log(data);
    let dataResult = {};
    for(let i = 0 ; i < data.result.length ; i++){
      dataResult = data.result[i];
      this.rqstId = data.result[i]._id;
      console.log(this.rqstId);
    }
    console.log(dataResult);
    this.cancelOrderReq();
    if (data) {
      this.http
        .post<any>(this.orderCancelmail, dataResult)
        .subscribe(
          data => {
            if (data) {
              console.log(data);
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  },err =>{
    console.log(err);
  })
}

increaseShow() {
  this.show += 3;
}

}
