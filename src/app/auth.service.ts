import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/api/register";
  private _logInUrl = "http://localhost:5000/api/login";

  constructor(private http:HttpClient,private route:Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  logInUser(data){
    return this.http.post<any>(this._logInUrl,data)
  }

   loggedIn(){
    return !!localStorage.getItem('token')
  }

  roleAdmin(){
    
    let role = JSON.parse(localStorage.getItem('firstname'));
   
    if(role == 'Admin'){
      return !!role
   }

  }

  findActive(){
    let status = JSON.parse(localStorage.getItem('status'));
    if(status =='ACTIVE') {
    return !!status
    }
    else{
      localStorage.removeItem('payload')
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      localStorage.removeItem('Address')
      localStorage.removeItem('Address1')
      localStorage.removeItem('googleLat')
      localStorage.removeItem('googleLong')
      localStorage.removeItem('ipAddress')
      localStorage.removeItem('status')
      localStorage.removeItem('firstname')
    }
  }


  //get token from interceptor
  getToken(){
    return localStorage.getItem('token')
  }

  //logout
  logoutUser(){
    localStorage.removeItem('payload')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('Address')
    localStorage.removeItem('Address1')
    localStorage.removeItem('googleLat')
    localStorage.removeItem('googleLong')
    localStorage.removeItem('ipAddress')
    localStorage.removeItem('status')
    localStorage.removeItem('firstname')
    this.route.navigate(['/deals'])
  }

}
