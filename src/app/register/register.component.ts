import { Component, OnInit ,ViewChild, ElementRef,NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUserData = {
    address : {
      city:{},
      location:''
    },
    gender:'',
    phone:'',
    privateIP:'',
    status:''
  };
  success : any
  errormsg:any
  phnErr:any
  ipAddress:any
  submitted:boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }


  constructor(private _auth:AuthService,public zone:NgZone,private router:Router,public loadingCtrl: NgxSpinnerService,private http: HttpClient) {


  this.registeredUserData.gender = ''
  this.registeredUserData.address.location = ''
  this.registeredUserData.address.city = ''
  }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
  }, 1000);
  }


  post(){

    this.registeredUserData.status = "ACTIVE"
    this.registeredUserData.address.city = this.addr
    this.loadingCtrl.show();
    this._auth.registerUser(this.registeredUserData)
      .subscribe(
        res =>{
          this.loadingCtrl.hide();
           localStorage.setItem('token',res.token)
           localStorage.setItem('currentUser',JSON.stringify(res.user));
           localStorage.setItem('firstname',JSON.stringify(res.user.firstname));
           localStorage.setItem('status', JSON.stringify(res.user.status));
           //this.router.navigate(['/login'])
           this.success = "Registered successfully!"
           this.router.navigate(['/products']);
          //  document.getElementById('hideButton').style.display ='none'
          //  document.getElementById('hideRestButton').style.display ='none'



        //    setTimeout(() => {
        //     // swal.close();
        //     this.loadingCtrl.hide();

        // }, 2000);

        if(res.statusText == 'Unauthorized'){
          this.errormsg ='Check Email and Password !'
          this.loadingCtrl.hide();
        }
      },
        err =>{
          console.log(err)
          if(err.statusText == 'Unauthorized'){
            this.errormsg ='Phone number already exist!'
            setTimeout(()=>{
             this.errormsg=''
           },15000)

             this.loadingCtrl.hide();
           }
        }

      )
  }

  phnTen(){
    if(this.registeredUserData.phone.length !== 10){
      //alert(this.registeredUserData.phone.length)
      this.phnErr = "Phone number must be 10 digits"
      setTimeout(()=>{
        this.phnErr=''
       },3000)
      //alert(this.phnErr)
    }
  }

  handleInput(evt)
			{
				var charCode = (evt.which) ? evt.which : evt.keyCode;
				if (charCode != 46 && charCode > 31
				&& (charCode < 48 || charCode > 57))
				return true;
				return false;
			}
}
