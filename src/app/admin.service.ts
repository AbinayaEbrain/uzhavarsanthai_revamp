import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _postCatUrl = "http://localhost:3200/api/category";

  constructor(private http:HttpClient) { }

  addCate(data){
    return this.http.post<any>(this._postCatUrl,data)
  }

}
