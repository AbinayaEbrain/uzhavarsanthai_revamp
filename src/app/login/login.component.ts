import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData={}
  errormsg;

  constructor(private router:Router) { }

  ngOnInit() {
  }
  register(){
    this.router.navigate(['/register']);
  }
  post(){
    this.router.navigate(['/post']);
  }

  
}

