import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private _dealsUrl = "https://farmers-marker-app.herokuapp.com/api/deals";
  private _postUrl ="https://farmers-marker-app.herokuapp.com/api/post";
  private _getUrl ="https://farmers-marker-app.herokuapp.com/api/details";
  private _getCategoryUrl ="https://farmers-marker-app.herokuapp.com/api/category";
  private _getSubCategoryUrl ="https://farmers-marker-app.herokuapp.com/api/subcategory";
  //Deactivate URL
  private deactiveUrl ="https://farmers-marker-app.herokuapp.com/api/admin-user/deactive";
  //Active URL
  private activeUrl ="https://farmers-marker-app.herokuapp.com/api/admin-user/active";

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

  getSubCategory(){
    return this.http.get<any>(this._getSubCategoryUrl)
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
