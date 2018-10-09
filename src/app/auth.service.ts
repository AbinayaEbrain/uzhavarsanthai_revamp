import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3200/api/register";
  private _logInUrl = "http://localhost:3200/api/login";
  constructor(private http:HttpClient) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  logInUser(data){
    return this.http.post<any>(this._logInUrl,data)
  }
}
