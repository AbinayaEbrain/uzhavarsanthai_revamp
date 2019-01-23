import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  // https://farmers-market-ebrain.herokuapp.com
  private _dealsUrl = "https://uzhavarsanthai.herokuapp.com/api/deals";
  private _postUrl ="https://uzhavarsanthai.herokuapp.com/api/post";
  private _getUrl ="https://uzhavarsanthai.herokuapp.com/api/details";
  private _getCategoryUrl ="https://uzhavarsanthai.herokuapp.com/api/category";
  //Deactivate URL
  private deactiveUrl ="https://uzhavarsanthai.herokuapp.com/api/admin-user/deactive";
  //Active URL
  private activeUrl ="https://uzhavarsanthai.herokuapp.com/api/admin-user/active";
  private updateuserurl = "https://uzhavarsanthai.herokuapp.com/api/updateuser";
  private uploadUrl = "https://uzhavarsanthai.herokuapp.com/api/sendImage";
  constructor(private http:HttpClient) { }

  sendImage(Image: FormData) {
    return this.http.post(this.uploadUrl,Image);
  }
  getDeals(){
    return this.http.get<any>(this._dealsUrl)
  }
  updateCustomer(data,id){
    return this.http.put<any>(this.updateuserurl +  "/" + id ,data)
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

  editCategory(data,id){
    return this.http.put<any>(this._getCategoryUrl + "/" + id ,data)
  }

  deletedeal(id){
    return this.http.delete<any>(this._dealsUrl + "/" + id )
  }

  deleteCate(id){
    return this.http.delete<any>(this._getCategoryUrl + "/" + id )
  }

  deleteUser(id){
    return this.http.delete<any>(this._getUrl + "/" + id )
  }


  getCategory(){
    return this.http.get<any>(this._getCategoryUrl)
  }


  //deactivate account
  deactivateAccount(data,id){
    return this.http.put<any>(this.deactiveUrl + "/" + id ,data)
  }

    //activate account
    activateAccount(data,id){
      return this.http.put<any>(this.activeUrl + "/" + id ,data)
    }
  

}
