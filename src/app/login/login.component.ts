import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData={}
  errormsg;

  constructor(private router:Router,private _auth:AuthService) { }

  ngOnInit() {
  }

  logform(){
    // console.log(this.loginUserData);
    
    this._auth.logInUser(this.userData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    this.router.navigate(['/post']);
  }
  register(){
    this.router.navigate(['/register']);
  }

}

