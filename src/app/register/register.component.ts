import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

declare let ClientIP: any;
declare var swal :any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  privateIP ;
  publicIP;
  registeredUserData = {
    address : {
      city:'',
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
 
  
  constructor(private _auth:AuthService,private router:Router,public loadingCtrl: NgxSpinnerService,private http: HttpClient) { 

    this.privateIP = ClientIP;

    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip'];
    });

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
    
    this.registeredUserData.privateIP = this.privateIP
   
    this.registeredUserData.status = "ACTIVE"
    this.loadingCtrl.show();
    this._auth.registerUser(this.registeredUserData)
      .subscribe( 
        res =>{
          this.loadingCtrl.hide();
           console.log(res)
           console.log(res.user.phone)
           console.log(this.registeredUserData)
          //  alert(this.registeredUserData)
           localStorage.setItem('token',res.token)
           localStorage.setItem('currentUser',JSON.stringify(res.user));
           localStorage.setItem('firstname',JSON.stringify(res.user.firstname));
           //this.router.navigate(['/login'])
           this.success = "Registered successfully!"

           setTimeout(() => {
            // swal.close();
            this.loadingCtrl.hide();
            this.router.navigate(['/post']);
        }, 2000);

        if(res.statusText == 'Unauthorized'){
          //console.log('Ooops!');
          this.errormsg ='Check Email and Password !'
          this.loadingCtrl.hide();
        }
      },
        err =>{
          console.log(err)
          if(err.statusText == 'Unauthorized'){
            console.log('Ooops!');
            this.errormsg ='Phone Number already exist!'
            setTimeout(()=>{
             this.errormsg=''
            },3000)
            
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


