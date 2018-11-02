import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { IP } from "./ip";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3200/api/register";
  private _logInUrl = "http://localhost:3200/api/login";

  constructor(private http:HttpClient,private route:Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  logInUser(data){
    return this.http.post<any>(this._logInUrl,data)
  }

   //auth guard
   loggedIn(){
    return !!localStorage.getItem('token')
  }

  roleAdmin(){
    
    let role = JSON.parse(localStorage.getItem('firstname'));
   
    if(role == 'Admin'){
      return !!role
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
    this.route.navigate(['/deals'])
  }

  get_ipAddress(): Observable<any>{
    return this.http.get('https://jsonip.com')
        .map( data => {
        return data;
        })
}
// getIpAddress(): Observable<any> {
//   return this.http
//     .get<IP>("https://freegeoip.net/json/?callback").pipe(
//       map(response => response || {}),
//       catchError(this.handleError)
//     );
// }

// private handleError(error: HttpErrorResponse): Observable<any> {
//   console.error("observable error: ", error);
//   return observableThrowError(error);
// }
}
