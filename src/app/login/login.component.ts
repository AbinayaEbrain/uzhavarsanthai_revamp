import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'
import { AuthService } from '../auth.service';
import { DealsService } from '../deals.service';
// loader 
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData={}
  errormsg;
  id : any
  user:any
  ipAddress:any

  constructor(private router:Router,private _auth:AuthService,private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
  }, 1000);
 

  // this._auth.get_ipAddress().subscribe(data => {
  //   this.ipAddress = data;
  //   console.log(data);

  // }

}



  
  logform(){
    // console.log(this.loginUserData);
    this.loadingCtrl.show();
    this._auth.logInUser(this.userData)
      .subscribe(
       res =>{
          console.log(this.userData)
          console.log(res.payload)
          console.log(res);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
          localStorage.setItem('payload', JSON.stringify(res.payload));
          localStorage.setItem('token',res.token);
          // localStorage.setItem('ipAddress', this.ipAddress.ip);

          this.user =  JSON.parse(localStorage.getItem('firstname'));
          console.log(this.user)
          // localStorage.setItem('id',res._id)
          // localStorage.setItem('userDeviceId', btoa(res));
          
          if(this.user === "Admin"){
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/post']);
          }
          this.loadingCtrl.hide();
       },
        err =>{
          this.loadingCtrl.hide();
          if(err.statusText === 'Unauthorized'){
            console.log('Ooops!');
             this.errormsg ='Invalid Phone Number and Password !'
           }
        }

      )
  }


  register(){
    this.router.navigate(['/register']);
  }




}

