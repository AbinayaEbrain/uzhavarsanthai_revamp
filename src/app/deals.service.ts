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

  private updateuserurl = 'https://uzhavarsanthai.herokuapp.com/api/updateuser';
  private _updatePostName = 'https://uzhavarsanthai.herokuapp.com/api/updateNamePost';
  private _updateReviewSellerName = 'https://uzhavarsanthai.herokuapp.com/api/updateSellerNameReview';
  private _updateReviewBuyerName = 'https://uzhavarsanthai.herokuapp.com/api/updateBuyerNameReview';

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
  private mapUserIdPostUrl = "https://uzhavarsanthai.herokuapp.com/api/mapuserpostUrl";
  //Review
  private mapProductReviewPostUrl = "https://uzhavarsanthai.herokuapp.com/api/mapproductreviewpostUrl";
  private _posReviewtUrl = 'https://uzhavarsanthai.herokuapp.com/api/postreviewrating';
  private _getReview = "https://uzhavarsanthai.herokuapp.com/api/getReview";
  private mapProductReviewUserUrl = "https://uzhavarsanthai.herokuapp.com/api/mapproductreviewuserUrl";


  private _orderReqPosturl = 'https://uzhavarsanthai.herokuapp.com/api/orderReqPost';
  private _cancelOrderRequestUrl = "https://uzhavarsanthai.herokuapp.com/api/updateViewPost";

  private _cancelRqstViewMore = "https://uzhavarsanthai.herokuapp.com/api/updatevieworderrequest";

  // Dispute
  private _postDispute = "https://uzhavarsanthai.herokuapp.com/api/disputePost";
  private _getSingleDispute = "https://uzhavarsanthai.herokuapp.com/api/getSingleDispute";
  private _getDispute = "https://uzhavarsanthai.herokuapp.com/api/getDispute";
  private _updateDispute = "https://uzhavarsanthai.herokuapp.com/api/updateDispute";
  private _updatePostDispute = "https://uzhavarsanthai.herokuapp.com/api/updateDisputePost";
  private _updateUserDispute = "https://uzhavarsanthai.herokuapp.com/api/updateDisputeUser";
  private _updateUserSellerDispute = "https://uzhavarsanthai.herokuapp.com/api/updateDisputeUserSeller";

  // Ticket
  private _getSingleTicket = "https://uzhavarsanthai.herokuapp.com/api/getSingleTicket";
  private _updateTicket = "https://uzhavarsanthai.herokuapp.com/api/updateTicket";

  // Resolve
  private _updatePostDisputeSolution = "https://uzhavarsanthai.herokuapp.com/api/updateDisputePostSolution";
  private _updateUserDisputeSolution = "https://uzhavarsanthai.herokuapp.com/api/updateDisputeUserSolution";
  private _updateUserSellerDisputeSolution = "https://uzhavarsanthai.herokuapp.com/api/updateDisputeUserSellerSolution";

    // Buyer Dispute
  private _postDisputeUrl = 'https://uzhavarsanthai.herokuapp.com/api/postdispute';
  private _getBuyerDispute = "https://uzhavarsanthai.herokuapp.com/api/getBuyerDispute";
  private _updatePostBuyerDispute = "https://uzhavarsanthai.herokuapp.com/api/updateBuyerDisputePost";
  private _buyerUpdateUserDispute = "https://uzhavarsanthai.herokuapp.com/api/buyerupdateDisputeUser";
  private _updateUserBuyerDispute = "https://uzhavarsanthai.herokuapp.com/api/updateDisputeUserBuyer";
  
  // Credit
  private _updateUserCreditArr = "https://uzhavarsanthai.herokuapp.com/api/updateCreditArr";
  private _updateUserCreditArrCredit = "http://localhost:5000/api/updateCreditArrCredit";
  private _sendticketUrl = "https://uzhavarsanthai.herokuapp.com/api/sendticket";
  private _getticketUrl = "https://uzhavarsanthai.herokuapp.com/api/getticket";

  //admin order closed
  private updateUserOrderRequestStatus = "https://uzhavarsanthai.herokuapp.com/api/mapuserOrderRequestStatus";
  
  //subscription
  private subscription = "https://uzhavarsanthai.herokuapp.com/api/subscription";
  private getSubscriptionUrl = "https://uzhavarsanthai.herokuapp.com/api/getSubscription";
  private updateSubscriptionUrl = "https://uzhavarsanthai.herokuapp.com/api/updateSubscription";
  private deleteSubscriptionUrl = 'https://uzhavarsanthai.herokuapp.com/api/dltSubscription';
  private getSingleSubscriptionUrl = 'https://uzhavarsanthai.herokuapp.com/api/getSingleSubscription';
  private updateUserSubscriptionUrl = "https://uzhavarsanthai.herokuapp.com/api/updateUserSubscription";
  private getCurrentuserCrditsUrl = "https://uzhavarsanthai.herokuapp.com/api/currentUserCredits";


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
    return this.http.put<any>(this.updateuserurl + '/' + id, data);
  }

  updatePostName(data, id) {
    return this.http.post<any>(this._updatePostName + '/' + id, data);
  }

  updateReviewSellerName(data, id) {
    return this.http.post<any>(this._updateReviewSellerName + '/' + id, data);
  }

  updateReviewBuyerName(data, id) {
    return this.http.post<any>(this._updateReviewBuyerName + '/' + id, data);
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
// review and rating 
  addReview(data) {
    return this.http.post<any>(this._posReviewtUrl, data);
  }

  getReview() {
    return this.http.get<any>(this._getReview);
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

  getSingleDispute(id) {
    return this.http.get<any>(this._getSingleDispute + '/' + id);
  }

  updateDispute(data,id){
    return this.http.post<any>(this._updateDispute + '/' + id, data);
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

  // Resolve
  updatePostDisputeSolution(data,id){
    return this.http.post<any>(this._updatePostDisputeSolution + '/' + id, data);
  }

  updateUserDisputeSolution(data,id){
    return this.http.post<any>(this._updateUserDisputeSolution + '/' + id, data);
  }

  updateSellerUserDisputeSolution(data,id){
    return this.http.post<any>(this._updateUserSellerDisputeSolution + '/' + id, data);
  }
 
  // Buyer Dispute
  addDispute(data) {
    return this.http.post<any>(this._postDisputeUrl, data);
  }

  getBuyerDispute() {
    return this.http.get<any>(this._getBuyerDispute);
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


  // Ticket
  sendTicket(data) {
    return this.http.post<any>(this._sendticketUrl, data);
  }

  getTickets() {
    return this.http.get<any>(this._getticketUrl);
  }

  getSingleTicket(id) {
    return this.http.get<any>(this._getSingleTicket + '/' + id);
  }

  updateTicket(data,id){
    return this.http.post<any>(this._updateTicket + '/' + id, data);
  }

  // Update admin closed status in order request
  updateOrderRequestStatus(data,id){
    return this.http.post<any>(this.updateUserOrderRequestStatus + '/' + id, data);
  }

  //subscription
  addsubscription(data){
     return this.http.post<any>(this.subscription,data);
  }

  getSubscription() {
    return this.http.get<any>(this.getSubscriptionUrl);
  }

  editSubscription(data, id) {
    return this.http.post<any>(this.updateSubscriptionUrl + '/' + id, data);
  }

  updateUserSubscription(data, id) {
    return this.http.post<any>(this.updateUserSubscriptionUrl + '/' + id, data);
  }

  deleteSubscription(id) {
    return this.http.delete<any>(this.deleteSubscriptionUrl + '/' + id);
  }

  getSingleSubscription(id) {
    return this.http.get<any>(this.getSingleSubscriptionUrl + '/' + id);
  }
  getCurrentCredit(id){
    return this.http.get<any>(this.getCurrentuserCrditsUrl + '/' + id);
  }
}
