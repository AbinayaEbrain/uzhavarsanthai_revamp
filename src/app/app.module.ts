import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { DealsService } from './deals.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { UserDealsComponent } from './user-deals/user-deals.component';
import { FilterdataPipe } from './filterdata.pipe';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import {PasswordValidatorDirective} from '../app/register/password.validator.directive';
import { UserDealsEditComponent } from './user-deals-edit/user-deals-edit.component';
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
import { HotdealsComponent } from './hotdeals/hotdeals.component';





@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserDealsComponent,
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
    ViewcategoryComponent,
    HotdealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,


  ],
  providers: [AuthService,DealsService,AuthGuard,ViewcategoryComponent,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
