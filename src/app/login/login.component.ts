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
  wholedata:any
  deactiveErrorMsg:any
  submitted:boolean;

  constructor(private router:Router,private _auth:AuthService,private _dealsService:DealsService,public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
  }, 1000);
  }
  logform(){
    this.loadingCtrl.show();
    this._auth.logInUser(this.userData)
      .subscribe(
       res =>{
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('status', JSON.stringify(res.user.status));
          localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
          localStorage.setItem('payload', JSON.stringify(res.payload));
          localStorage.setItem('token',res.token);

          this.wholedata = JSON.parse(localStorage.getItem('status'))
          this.user =  JSON.parse(localStorage.getItem('firstname'));
          if(this.user === "Admin"){
            this.router.navigate(['/admin']);
          }
          else{
           
            if(this.wholedata ==="ACTIVE"){
              this.router.navigate(['/products']);
            }else{
           
              this.deactiveErrorMsg ='Your account has been deactivated !'

              setTimeout(() => {
                this.deactiveErrorMsg = ''
            }, 3000);
            }
            this.loadingCtrl.hide();
          }
        

         
          this.loadingCtrl.hide();
       },
        err =>{
          this.loadingCtrl.hide();
          if(err.statusText === 'Unauthorized'){
             this.errormsg ='Invalid Phone Number and Password !'
           }
        }
        
     
      )
  }


  register(){
    this.router.navigate(['/register']);
  }




}

