import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private _dealsUrl = "http:localhost:3200/api/deals";
  private _postUrl = "http:localhost:3200/api/post"

  constructor(private http:HttpClient) { }

  getDeals(){
    return this.http.get<any>(this._dealsUrl)
  }

  getPost(){
    return this.http.get<any>(this._postUrl)
  }
}
