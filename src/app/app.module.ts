import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, Response } from '@angular/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { DealsService } from './deals.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { FilterdataPipe } from './filterdata.pipe';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import { PasswordValidatorDirective } from '../app/register/password.validator.directive';
import { UserDealsEditComponent } from './user-deals-edit/user-deals-edit.component';
import { DatePipe } from '@angular/common';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
// loader
import { NgxSpinnerModule } from 'ngx-spinner';
//import {googlemaps} from '../../node_modules/';
//pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import { LocationdealsComponent } from './locationdeals/locationdeals.component';
import { HomeComponent } from './home/home.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminIpComponent } from './admin-ip/admin-ip.component';
import { DealscategoryComponent } from './dealscategory/dealscategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';

//address
import { AgmCoreModule } from '@agm/core';
import { GooglePlacesDirective } from './google-places.directive';
//datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// carousal
import { SlickCarouselModule } from 'ngx-slick-carousel';

//file upload
import { FileUploadModule } from 'ng2-file-upload';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeactiveDealsComponent } from './deactive-deals/deactive-deals.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupRequestComponent } from './signup-request/signup-request.component';
import { OrderRequestComponent } from './order-request/order-request.component';
import { BuyerAsSellerComponent } from './buyer-as-seller/buyer-as-seller.component';
import { SellerOrderRequestsComponent } from './seller-order-requests/seller-order-requests.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { DummyComponent } from './dummy/dummy.component';
import { CreditsComponent } from './credits/credits.component';
import { AdminDisputeComponent } from './admin-dispute/admin-dispute.component';
import { DisputeMoreComponent } from './dispute-more/dispute-more.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FilterdataPipe,
    ViewmoreComponent,
    PasswordValidatorDirective,
    UserDealsEditComponent,
    AdminComponent,
    CategoryComponent,
    AdminUserComponent,
    AdminDealsComponent,
    LocationdealsComponent,
    HomeComponent,
    AdminViewComponent,
    AdminIpComponent,
    DealscategoryComponent,
    GooglePlacesDirective,
    ViewcategoryComponent,
    UserProfileComponent,
    DeactiveDealsComponent,
    UserProductsComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    BlogViewComponent,
    ReadMoreComponent,
    NotificationsComponent,
    SignupRequestComponent,
    OrderRequestComponent,
    DummyComponent,
    BuyerAsSellerComponent,
    SellerOrderRequestsComponent,
    MyOrderComponent,
    CreditsComponent,
    AdminDisputeComponent,
    DisputeMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FileUploadModule,
    BsDatepickerModule,
    SweetAlert2Module,
    SlickCarouselModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AuthService,
    DealsService,
    AuthGuard,
    ViewcategoryComponent,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
