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
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
