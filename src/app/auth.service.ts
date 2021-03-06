import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = 'https://uzhavarsanthai.herokuapp.com/api/register';
  private _logInUrl = 'https://uzhavarsanthai.herokuapp.com/api/login';
  private _blogUrl = 'https://uzhavarsanthai.herokuapp.com/api/blog';
  private _blogViewUrl = 'https://uzhavarsanthai.herokuapp.com/api/blogview';
  private _blogEditUrl = 'https://uzhavarsanthai.herokuapp.com/api/blogedit';
  private _blogGetOneUrl = 'https://uzhavarsanthai.herokuapp.com/api/blogetone';
  private _blogDeleteUrl = 'https://uzhavarsanthai.herokuapp.com/api/blogdel';
  private _sendOtp = 'https://uzhavarsanthai.herokuapp.com/api/sendotpverf';
  private _forgotPwd = 'https://uzhavarsanthai.herokuapp.com/api/forgotPwd';
  private _resetPasswordUrl =
    'https://uzhavarsanthai.herokuapp.com/api/resetPassword';
  private _devicedataeUrl =
    'https://uzhavarsanthai.herokuapp.com/api/getdevicedata';

  // send sms to sender for signup
  private _sendsmsToSeller =
    'https://uzhavarsanthai.herokuapp.com/api/sendSmsToSeller';

  private _deviceTokenUrl = "https://uzhavarsanthai.herokuapp.com/api/deviceToken";
  private _fcmNotificationUrl = "https://uzhavarsanthai.herokuapp.com/api/fcmNotification";
  private _fcmNotificationAdminUrl = "https://uzhavarsanthai.herokuapp.com/api/fcmNotificationAdmin";

  constructor(private http: HttpClient, private route: Router) {}

  sendOtp(data) {
    return this.http.post<any>(this._sendOtp, data);
  }

  sendSignUpreqst(data) {
    return this.http.post<any>(this._sendsmsToSeller, data);
  }

  forgotPassword(data) {
    return this.http.post<any>(this._forgotPwd, data);
  }

  resetPassword(data, phone) {
    return this.http.post<any>(this._resetPasswordUrl + '/' + phone, data);
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  logInUser(data) {
    return this.http.post<any>(this._logInUrl, data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserName() {
    let username = JSON.parse(localStorage.getItem('firstname'));
    return username;
  }

  blogUserData(data) {
    return this.http.post<any>(this._blogUrl, data);
  }

  blogGetData() {
    return this.http.get<any>(this._blogViewUrl);
  }

  blogGetOneData(id) {
    return this.http.get<any>(this._blogGetOneUrl + '/' + id);
  }

  blogEditData(data, id) {
    console.log(data);
    return this.http.put<any>(this._blogEditUrl + '/' + id, data);
  }

  blogDeleteData(id) {
    return this.http.delete<any>(this._blogDeleteUrl + '/' + id);
  }

  roleAdmin() {
    let role = JSON.parse(localStorage.getItem('firstname'));

    if (role == 'Admin') {
      return !!role;
    }
  }

  roleStatus() {
    let roleStatus = JSON.parse(localStorage.getItem('roleStatus'));

    if (roleStatus == 'Admin') {
      return !!roleStatus;
    }
  }

  roleBuyer() {
    let role1 = JSON.parse(localStorage.getItem('role'));

    if (role1 == 'buyer') {
      return role1;
    }
  }

  checkOS(){
  let OS = JSON.parse(localStorage.getItem('browserOS'));
  let browser = JSON.parse(localStorage.getItem('browser'));
  if (OS == 'Android OS' && browser == 'chromium-webview') {
    return false;
  }else{
    return true;
  }
}

  deviceData(data) {
    return this.http.post<any>(this._devicedataeUrl, data);
  }

  findActive() {
    let status = JSON.parse(localStorage.getItem('status'));
    if (status == 'ACTIVE') {
      return !!status;
    } else {
      localStorage.removeItem('payload');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('Address');
      localStorage.removeItem('Address1');
      localStorage.removeItem('googleLat');
      localStorage.removeItem('googleLong');
      localStorage.removeItem('ipAddress');
      localStorage.removeItem('status');
      localStorage.removeItem('firstname');
      localStorage.removeItem('Image');
      localStorage.removeItem('credits');
      localStorage.removeItem('currentUpdateAddr');
      localStorage.removeItem('roleStatus');
    }
  }

  //get token from interceptor
  getToken() {
    return localStorage.getItem('token');
  }

  postDeviceToken(user){
    return this.http.post<any>(this._deviceTokenUrl,user)
  }

  postFcmNotification(user){
    return this.http.post<any>(this._fcmNotificationUrl,user)
  }

  postFcmNotificationAdmin(user){
    return this.http.post<any>(this._fcmNotificationAdminUrl,user)
  }

  //logout
  logoutUser() {
    localStorage.removeItem('payload');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('Address');
    localStorage.removeItem('Address1');
    localStorage.removeItem('googleLat');
    localStorage.removeItem('googleLong');
    localStorage.removeItem('ipAddress');
    localStorage.removeItem('status');
    localStorage.removeItem('firstname');
    localStorage.removeItem('Image');
    localStorage.removeItem('role');
    localStorage.removeItem('roleStatus');
    localStorage.removeItem('lastvisitproductid');
    localStorage.removeItem('credits');
    localStorage.removeItem('logged');
    localStorage.removeItem('browser');
    localStorage.removeItem('browserVer');
    localStorage.removeItem('browserOS');
    localStorage.removeItem('privateIP');
    this.route.navigate(['/deals']);
  }
}
