import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //https://uzhavarsanthai.herokuapp.com/api/category
  private _postCatUrl = 'https://uzhavarsanthai.herokuapp.com/api/category';
  private _postContact = 'https://uzhavarsanthai.herokuapp.com/api/contact';
  private sendMail = 'https://uzhavarsanthai.herokuapp.com/api/sendMail';
  constructor(private http: HttpClient) {}

  addCate(data) {
    return this.http.post<any>(this._postCatUrl, data);
  }

  addContact(data) {
    this.http.post<any>(this._postContact, data).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.http.post<any>(this.sendMail, data).subscribe(
            data => {
              if (data) {
                console.log(data)
                console.log('success');
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // addNew(usercreds) {
  //   var headers = new Headers();
  //         var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
  //         var emailid = 'name=' + usercreds.username;

  //         headers.append('Content-Type', 'application/X-www-form-urlencoded');

  //         this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
  //             if(data.json().success) {
  //                 this.http.post('http://localhost:3333/sendmail', emailid, {headers: headers}).subscribe((data) => {
  //             if(data.json().success) {
  //               console.log('Sent successfully');
  //             }
  //          })
  //        }
  //     })
  //   }
}
