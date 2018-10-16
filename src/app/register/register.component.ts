import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registeredUserData = {
    address : {
      location:''
    },
    gender:''
  };
 
  
  constructor(private _auth:AuthService,private router:Router) { 

  // this.registeredUserData.address = {};

  this. registeredUserData.gender = ''
  this. registeredUserData.address.location = ''
  }

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

  handleInput(evt)
			{
				var charCode = (evt.which) ? evt.which : evt.keyCode;
				if (charCode != 46 && charCode > 31 
				&& (charCode < 48 || charCode > 57))
				return true;
				return false;
			} 
}


