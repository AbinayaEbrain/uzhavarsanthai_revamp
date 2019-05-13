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
  private _getMultiUrl =
    'https://uzhavarsanthai.herokuapp.com/api/getMultipost';
  private _getSingleMultiUrl =
    'https://uzhavarsanthai.herokuapp.com/api/singleMultipost';
  private _updateMultiPost =
    'https://uzhavarsanthai.herokuapp.com/api/updateMultipost';
  private _deleteMultiPost =
    'https://uzhavarsanthai.herokuapp.com/api/dltMultiPost';

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
  private notificationtoallurl =
    'https://uzhavarsanthai.herokuapp.com/api/notificationtoall';
  private notificationtospecificurl =
    'https://uzhavarsanthai.herokuapp.com/api/notificationospecificeusers';
  private notificationtoPostedProductUrl =
    'https://uzhavarsanthai.herokuapp.com/api/notificationforpost';
  private orderReqmailUrl = 'https://uzhavarsanthai.herokuapp.com/api/sendorderrequest';
  private storeOrderReqUrl = 'https://uzhavarsanthai.herokuapp.com/api/storeorderrequest';
  private _getOrderReqUrl = 'https://uzhavarsanthai.herokuapp.com/api/getorderrequest';
  private _updateOrderReqUrl = "https://uzhavarsanthai.herokuapp.com/api/updateorderrequest";
  private _getSinleOrderReqUrl =
    'https://uzhavarsanthai.herokuapp.com/api/getSingleOrderRequest';
    private _getSinleOrderReqUrl1 =
    'https://uzhavarsanthai.herokuapp.com/api/getSingleOrderRequest1';
  private sendSellerSmsUrl = 'https://uzhavarsanthai.herokuapp.com/api/sendordersmstoseller';
  private sendBuyerSmsUrl = 'https://uzhavarsanthai.herokuapp.com/api/sendbuyersmsUrl';
  private mapUserIdPostUrl = "http://localhost:5000/api/mapuserpostUrl";
  private mapProductReviewPostUrl = "http://localhost:5000/api/mapproductreviewpostUrl";
  private _posReviewtUrl = 'http://localhost:5000/api/postreviewrating';
  private mapProductReviewUserUrl = "http://localhost:5000/api/mapproductreviewuserUrl";


  private _orderReqPosturl = 'https://uzhavarsanthai.herokuapp.com/api/orderReqPost';
  private _cancelOrderRequestUrl = "https://uzhavarsanthai.herokuapp.com/api/updateViewPost";

  private _cancelRqstViewMore = "https://uzhavarsanthai.herokuapp.com/api/updatevieworderrequest";

  // Dispute
  private _postDispute = "http://localhost:5000/api/disputePost";
  private _getDispute = "https://uzhavarsanthai.herokuapp.com/api/getDispute";
  private _updatePostDispute = "http://localhost:5000/api/updateDisputePost";
  private _updateUserDispute = "http://localhost:5000/api/updateDisputeUser";
  private _updateUserSellerDispute = "http://localhost:5000/api/updateDisputeUserSeller";

    // Buyer Dispute
    private _postDisputeUrl = 'http://localhost:5000/api/postdispute';
    private _updatePostBuyerDispute = "http://localhost:5000/api/updateBuyerDisputePost";
    private _buyerUpdateUserDispute = "http://localhost:5000/api/buyerupdateDisputeUser";
    private _updateUserBuyerDispute = "http://localhost:5000/api/updateDisputeUserBuyer";
  // Credit
  private _updateUserCreditArr = "http://localhost:5000/api/updateCreditArr";
  private _updateUserCreditArrCredit = "http://localhost:5000/api/updateCreditArrCredit";
  private _sendticketUrl = "http://localhost:5000/api/sendticket";
  private _getticketUrl = "http://localhost:5000/api/getticket";

  constructor(private http: HttpClient) {}

  sendImage(Image: FormData) {
    return this.http.post(this.uploadUrl, Image);
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

  notificationToPostedProduct(data) {
    return this.http.post<any>(this.notificationtoPostedProductUrl, data);
  }

  sendOrderReqmail(data) {
    return this.http.post<any>(this.orderReqmailUrl, data);
  }

  storeOrderRequest(data) {
    return this.http.post<any>(this.storeOrderReqUrl, data);
  }

  getOrderRequest() {
    return this.http.get<any>(this._getOrderReqUrl);
  }

  getSingleOrderRequest(id) {
    return this.http.get<any>(this._getSinleOrderReqUrl + '/' + id);
  }

  getSingleOrderRequest1(id) {
    return this.http.get<any>(this._getSinleOrderReqUrl1 + '/' + id);
  }

  editOrderRequest(data, id) {
    return this.http.put<any>(this._updateOrderReqUrl + '/' + id, data);
  }

  updateViewOrderRqst(data){
    return this.http.post<any>(this._cancelRqstViewMore, data);
  }

  sendOrderSmsSeller(data){
    return this.http.post<any>(this.sendSellerSmsUrl, data);
  }

  sendOrderSmsBuyer(data) {
    return this.http.post<any>(this.sendBuyerSmsUrl, data);
  }

  addOrderReqPost(data, id) {
    return this.http.post<any>(this._orderReqPosturl  + '/' + id ,data);
  }

  mapUserIdinPost(data){
    return this.http.post<any>(this.mapUserIdPostUrl, data);
  }

  addReview(data) {
    return this.http.post<any>(this._posReviewtUrl, data);
  }

  mapProductReviewinPost(data){
    return this.http.post<any>(this.mapProductReviewPostUrl, data);
  }

  mapProductReviewinUser(data){
    return this.http.post<any>(this.mapProductReviewUserUrl, data);
  }

  cancelOrderStatus(data,id){
    return this.http.post<any>(this._cancelOrderRequestUrl + '/' + id, data);
  }

  // Dispute
  disputePost(data){
    return this.http.post<any>(this._postDispute, data);
  }

  getdispute() {
    return this.http.get<any>(this._getDispute);
  }

  updatePostDispute(data,id){
    return this.http.post<any>(this._updatePostDispute + '/' + id, data);
  }

  updateUserDispute(data,id){
    return this.http.post<any>(this._updateUserDispute + '/' + id, data);
  }

  updateSellerUserDispute(data,id){
    return this.http.post<any>(this._updateUserSellerDispute + '/' + id, data);
  }


  // Buyer Dispute

  addDispute(data) {
    return this.http.post<any>(this._postDisputeUrl, data);
  }

  updatePostBuyerDispute(data,id){
    return this.http.post<any>(this._updatePostBuyerDispute + '/' + id, data);
  }

  buyerUpdateUserDispute(data,id){
    return this.http.post<any>(this._buyerUpdateUserDispute + '/' + id, data);
  }

  updateBuyerUserDispute(data,id){
    return this.http.post<any>(this._updateUserBuyerDispute + '/' + id, data);
  }

  // Credit
  updateUserCreditArr(data,id){
    return this.http.post<any>(this._updateUserCreditArr + '/' + id, data);
  }

  updateUserCreditArrCredit(data,id){
    return this.http.post<any>(this._updateUserCreditArrCredit + '/' + id, data);
  }
//send ticket
  sendTicket(data) {
    return this.http.post<any>(this._sendticketUrl, data);
  }
//get all ticket
getTickets() {
  return this.http.get<any>(this._getticketUrl);
}
}
