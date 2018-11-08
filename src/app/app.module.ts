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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';

//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
//import { faTwitter } from '@fortawesome/free-solid-svg-icons';



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
    AdminIpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
<<<<<<< HEAD
    FontAwesomeModule

=======
   
>>>>>>> 0df6cd5109dd508c8a366195a5be7e7e9b65656f
  ],
  providers: [AuthService,DealsService,AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
