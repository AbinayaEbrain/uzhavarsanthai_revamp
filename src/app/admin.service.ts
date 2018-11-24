import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
