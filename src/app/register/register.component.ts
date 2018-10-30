import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';
declare var swal :any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registeredUserData = {
    address : {
      city:'',
      location:''
    },
    gender:''
  };
  success : any
  errormsg:any
  
 
  
  constructor(private _auth:AuthService,private router:Router,public loadingCtrl: NgxSpinnerService) { 

  // this.registeredUserData.address = {};

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
    // console.log(this.registeredUserData);
    this.loadingCtrl.show();
    this._auth.registerUser(this.registeredUserData)
      .subscribe( 
        res =>{
          this.loadingCtrl.hide();
           console.log(res)
           console.log(res.user.phone)
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
            },2000)
            
             this.loadingCtrl.hide();
           }
        }
      
      )
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


