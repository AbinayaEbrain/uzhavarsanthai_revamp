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

  constructor(private router:Router,private _auth:AuthService,private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
  }, 1000);
   
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
          localStorage.setItem('payload', JSON.stringify(res.payload));
          localStorage.setItem('token',res.token);

          let user =  localStorage.getItem('currentUser');
          console.log()
          // localStorage.setItem('id',data._id)
          //  localStorage.setItem('userDeviceId', btoa(data));
          this.loadingCtrl.hide();
          this.router.navigate(['/post']);

       },
        err =>{
          this.loadingCtrl.hide();
          if(err.statusText === 'Unauthorized'){
            console.log('Ooops!');
             this.errormsg ='Check Phone Number and Password !'
           }
        }
        
     
      )
  }


  register(){
    this.router.navigate(['/register']);
  }




}

