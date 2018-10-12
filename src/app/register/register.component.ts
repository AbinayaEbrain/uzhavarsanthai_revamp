import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registeredUserData = {};
  
  constructor(private _auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  post(){
    // console.log(this.registeredUserData);
    this._auth.registerUser(this.registeredUserData)
      .subscribe((data:any) =>{
           console.log(data)
           console.log(data.user.phone)
           localStorage.setItem('token',data.token)
           localStorage.setItem('currentUser',JSON.stringify(data.user));
           this.router.navigate(['/deals'])
       
        err => console.log(err)
      }
      )
  }
}
