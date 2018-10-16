import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'
import { AuthService } from '../auth.service';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData={}
  errormsg;
  id : any

  constructor(private router:Router,private _auth:AuthService,private _dealsService:DealsService) { }

  ngOnInit() {
  }

  logform(){
    // console.log(this.loginUserData);
  
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
          this.router.navigate(['/post']);

       },
        err =>{
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

