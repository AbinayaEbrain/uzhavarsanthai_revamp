import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registeredUserData = {}
  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }

  post(){
    // console.log(this.registeredUserData);
    this._auth.registerUser(this.registeredUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
}
