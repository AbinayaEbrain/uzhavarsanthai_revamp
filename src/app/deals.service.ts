import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  timeout,
  retryWhen,
  take,
  concat,
  share,
  delayWhen
} from 'rxjs/operators';
import { timer, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private _getCountUrl = 'https://uzhavarsanthai.herokuapp.com/api/getCount';
  // https://farmers-market-ebrain.herokuapp.com
  private _dealsUrl = 'https://uzhavarsanthai.herokuapp.com/api/deals';
  private _postUrl = 'https://uzhavarsanthai.herokuapp.com/api/post';
  private _getUrl = 'https://uzhavarsanthai.herokuapp.com/api/details';

  // Multipost
  private _multiPostUrl = 'https://uzhavarsanthai.herokuapp.com/api/multipost';
  private _getMultiUrl = 'https://uzhavarsanthai.herokuapp.com/api/getMultipost';
  private _getSingleMultiUrl = 'https://uzhavarsanthai.herokuapp.com/api/singleMultipost';
  private _updateMultiPost = 'https://uzhavarsanthai.herokuapp.com/api/updateMultipost';
  private _deleteMultiPost = 'https://uzhavarsanthai.herokuapp.com/api/dltMultiPost'

  private _getCategoryUrl = 'https://uzhavarsanthai.herokuapp.com/api/category';
  //Deactivate URL
  private deactiveUrl =
    'https://uzhavarsanthai.herokuapp.com/api/admin-user/deactive';
  //Active URL
  private activeUrl =
    'https://uzhavarsanthai.herokuapp.com/api/admin-user/active';
  private updateuserurl = 'http://localhost:5000/api/updateuser';
  // private uploadUrl = 'https://uzhavarsanthai.herokuapp.com/api/sendImage';
  private uploadUrl = 'https://uzhavarsanthai.herokuapp.com/api/sendImage';
  private notificationtoallurl = 'https://uzhavarsanthai.herokuapp.com/api/notificationtoall';
  private notificationtospecificurl ="https://uzhavarsanthai.herokuapp.com/api/notificationospecificeusers";
  private notificationtoPostedProductUrl="https://uzhavarsanthai.herokuapp.com/api/notificationforpost";
  private orderReqmailUrl = "http://localhost:5000/api/sendorderrequest";
  private storeOrderReqUrl = "http://localhost:5000/api/storeorderrequest";
  private _getOrderReqUrl = "http://localhost:5000/api/getorderrequest";
  private sendSellerSmsUrl = "http://localhost:5000/api/sendordersmstoseller";
  private sendBuyerSmsUrl = "http://localhost:5000/api/sendbuyersmsUrl";

  constructor(private http: HttpClient) {}

  sendImage(Image : FormData) {
     return this.http.post(this.uploadUrl, Image)
    //  .pipe(
    //   timeout(2500),
    //   retryWhen(errors => errors.pipe(delayWhen(val => timer(val * 1000)))),
    //   take(2),
    //   // concat(throwError('This is an error!')),
    //   share()
    // );
  }

  getSingleMultiPost(id) {
    return this.http.get<any>(this._getSingleMultiUrl + '/' + id);
  }

  getMultiPost() {
    return this.http.get<any>(this._getMultiUrl);
  }

  updateMultiPost(data, id) {
    return this.http.post<any>(this._updateMultiPost + '/' + id, data);
  }

  deleteMultiPost(id) {
    return this.http.delete<any>(this._deleteMultiPost + '/' + id);
  }

  addPost(data) {
    return this.http.post<any>(this._postUrl, data);
  }

  getDeals() {
    return this.http.get<any>(this._dealsUrl);
  }

  updateCustomer(data, id) {
    console.log(data);
    return this.http.put<any>(this.updateuserurl + '/' + id, data);
  }

  addMultiPost(data) {
    return this.http.post<any>(this._multiPostUrl, data);
  }

  getDetails() {
    return this.http.get<any>(this._getUrl);
  }

  editDeals(data, id) {
    return this.http.put<any>(this._dealsUrl + '/' + id, data);
  }

  editCategory(data, id) {
    return this.http.put<any>(this._getCategoryUrl + '/' + id, data);
  }

  deletedeal(id) {
    return this.http.delete<any>(this._dealsUrl + '/' + id);
  }

  deleteCate(id) {
    return this.http.delete<any>(this._getCategoryUrl + '/' + id);
  }

  deleteUser(id) {
    return this.http.delete<any>(this._getUrl + '/' + id);
  }

  getCategory() {
    return this.http.get<any>(this._getCategoryUrl);
  }

  //deactivate account
  deactivateAccount(data, id) {
    return this.http.post<any>(this.deactiveUrl + '/' + id, data);
  }

  //activate account
  activateAccount(data, id) {
    return this.http.post<any>(this.activeUrl + '/' + id, data);
  }

  getCount(productName, productId, ipAddress) {
    return this.http.post<any>(this._getCountUrl, {
      productName,
      productId,
      ipAddress
    });
  }
  //notificationToAll
  notificationToAll(data) {
    return this.http.post<any>(this.notificationtoallurl, data);
  }

  //notificationspecific users
  notificationTospecificUsers(data) {
    return this.http.post<any>(this.notificationtospecificurl, data);
  }

  notificationToPostedProduct(data){
    return this.http.post<any>(this.notificationtoPostedProductUrl, data);
  }

  sendOrderReqmail(data){
    return this.http.post<any>(this.orderReqmailUrl, data);
  }

  storeOrderRequest(data){
    return this.http.post<any>(this.storeOrderReqUrl, data);
  }

  getOrderRequest() {
    return this.http.get<any>(this._getOrderReqUrl);
  }

  sendOrderSmsSeller(data){
    console.log(data);
    return this.http.post<any>(this.sendSellerSmsUrl, data);
  }

  sendOrderSmsBuyer(data){
    console.log(data);
    return this.http.post<any>(this.sendBuyerSmsUrl, data);
  }
}
