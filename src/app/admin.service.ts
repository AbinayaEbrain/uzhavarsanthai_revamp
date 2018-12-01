import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _postCatUrl = "http://localhost:5000/api/category";
  

  constructor(private http:HttpClient) { }

  addCate(data){
    return this.http.post<any>(this._postCatUrl,data)
  }

  postFile(prfImgData) {
    const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    const options = new RequestOptions({ headers: headers });

    const formData: FormData = new FormData();
    formData.append('photo', prfImgData, prfImgData.name);
    //formData.append('venueid', venueId);

    return this.http
      .post(this._postCatUrl, formData)
      .pipe(map(res => res));
  }

  

// handleError(error) {
//   console.log(error)
// }
}
