import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _postCatUrl = "https://farmers-market-ebrain.herokuapp.com/api/category";
  constructor(private http:HttpClient) { }

  addCate(data){
    return this.http.post<any>(this._postCatUrl,data)
  }

}
