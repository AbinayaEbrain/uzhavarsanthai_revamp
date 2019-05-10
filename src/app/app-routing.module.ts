import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DealsComponent } from './deals/deals.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import { UserDealsEditComponent } from './user-deals-edit/user-deals-edit.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import { LocationdealsComponent } from '../app/locationdeals/locationdeals.component';
import { HomeComponent } from './home/home.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminIpComponent } from './admin-ip/admin-ip.component';
import { DealscategoryComponent } from '../app/dealscategory/dealscategory.component';
import { ViewcategoryComponent } from '../app/viewcategory/viewcategory.component';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { DeactiveDealsComponent } from '../app/deactive-deals/deactive-deals.component';
import { UserProductsComponent } from '../app/user-products/user-products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from 'src/app/blog/blog.component';
import { BlogViewComponent } from 'src/app/blog-view/blog-view.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupRequestComponent } from 'src/app/signup-request/signup-request.component';
import { OrderRequestComponent } from 'src/app/order-request/order-request.component';
import { BuyerAsSellerComponent } from './buyer-as-seller/buyer-as-seller.component';
import { SellerOrderRequestsComponent } from './seller-order-requests/seller-order-requests.component';
import { MyOrderComponent } from 'src/app/my-order/my-order.component';
import { CreditsComponent } from './credits/credits.component';

import { DummyComponent } from 'src/app/dummy/dummy.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'deals',
    component: DealsComponent
  },
  {
    path: 'location',
    component: LocationdealsComponent
  },
  {
    path: 'user-deals-edit/:id',
    component: UserDealsEditComponent
  },
  {
    path: 'viewmore/:id',
    component: ViewmoreComponent
  },
  {
    path: 'viewmore/:id',
    component: ViewmoreComponent
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: PostComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'category/:id/category',
    component: CategoryComponent
  },
  {
    path: 'admin-user',
    component: AdminUserComponent
  },
  {
    path: 'admin-user/:id',
    component: AdminUserComponent
  },
  {
    path: 'admin-deals',
    component: AdminDealsComponent
  },
  {
    path: 'admin-view/:id',
    component: AdminViewComponent
  },
  {
    path: 'admin-ip',
    component: AdminIpComponent
  },
  {
    path: 'dealCategory',
    component: DealscategoryComponent
  },
  {
    path: 'viewCategory/:id',
    component: ViewcategoryComponent
  },
  {
    path: 'updateuser',
    component: UserProfileComponent
  },
  {
    path: 'expired-products',
    component: DeactiveDealsComponent
  },
  {
    path: 'products',
    component: UserProductsComponent
  },
  {
    path: 'products/:id',
    component: UserProductsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog-view',
    component: BlogViewComponent
  },
  {
    path: 'blog/:id',
    component: BlogComponent
  },
  {
    path: 'blog-view/:id',
    component: BlogViewComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'signup-request',
    component: SignupRequestComponent
  },
  {
    path: 'order-request',
    component: OrderRequestComponent
  },
  {
    path: 'dummy',
    component: DummyComponent
  },
  {
    path: 'buyerAsSeller',
    component: BuyerAsSellerComponent
  },
  {
    path: 'seller-order-requests',
    component: SellerOrderRequestsComponent
  },
  {
    path: 'my-order',
    component: MyOrderComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  DealsComponent,
  PostComponent
];
