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
      .subscribe((data:any) =>{
       
          console.log(this.userData)
          console.log(data.payload)
          console.log(data);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('payload', JSON.stringify(data.payload));
          localStorage.setItem('token',data.token);

          let user =  localStorage.getItem('currentUser');
          console.log()
          // localStorage.setItem('id',data._id)
          //  localStorage.setItem('userDeviceId', btoa(data));
          this.router.navigate(['/post']);

      
        err =>{
          console.log(err)
          alert("Invalid Username and Password")
        }
      }
      )

  }


  register(){
    this.router.navigate(['/register']);
  }

}

