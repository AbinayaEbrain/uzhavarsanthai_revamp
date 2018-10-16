import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private _dealsUrl = "http://localhost:3200/api/deals";
  private _postUrl ="http://localhost:3200/api/post";
  private _getUrl ="http://localhost:3200/api/details"

  constructor(private http:HttpClient) { }

  getDeals(){
    return this.http.get<any>(this._dealsUrl)
  }

  addPost(data){
    return this.http.post<any>(this._postUrl,data)
  }

  getDetails(){
    return this.http.get<any>(this._getUrl);
  }

  editDeals(data,id){
    return this.http.put<any>(this._dealsUrl + "/" + id ,data)
  }

  deletedeal(id){
    return this.http.delete<any>(this._dealsUrl + "/" + id )
  }
}
