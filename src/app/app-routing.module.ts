import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DealsComponent } from './deals/deals.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { UserDealsComponent } from './user-deals/user-deals.component'
import { ViewmoreComponent } from './viewmore/viewmore.component'
import { UserDealsEditComponent } from './user-deals-edit/user-deals-edit.component'
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import {LocationdealsComponent} from '../app/locationdeals/locationdeals.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path : 'login',
    component: LoginComponent
},
{
  path : 'home',
  component: HomeComponent
},
  { 
    path : 'register',
    component: RegisterComponent
  },
  { 
    path : 'deals',
    component: DealsComponent
  },
  { 
    path : 'location',
    component: LocationdealsComponent
  },
  {
    path : 'user-deals-edit/:id',
    component: UserDealsEditComponent
  },
  { 
    path : 'user-deals',
    component: UserDealsComponent
  },
  { 
    path : 'user-deals/:id',
    component: UserDealsComponent
  },
  { 
    path : 'viewmore/:id',
    component: ViewmoreComponent
  },
  { 
    path : 'viewmore/:id',
    component: ViewmoreComponent
  },
  { 
    path : 'post', 
    component: PostComponent,
    canActivate:[AuthGuard]
  },
  { 
    path : 'post/:id', 
    component: PostComponent,
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
},
{ 
  path: 'category', 
  component: CategoryComponent, 
},
{ 
  path: 'category/:id', 
  component: CategoryComponent, 
},
{ 
  path: 'admin-user', 
  component: AdminUserComponent, 
},
{ 
  path: 'admin-user/:id', 
  component: AdminUserComponent, 
},
{
  path: 'admin-deals',
  component: AdminDealsComponent
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent,RegisterComponent,DealsComponent,PostComponent]