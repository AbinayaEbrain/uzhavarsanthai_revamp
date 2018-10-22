import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DealsComponent } from './deals/deals.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';
import { UserDealsComponent } from './user-deals/user-deals.component'
import { ViewmoreComponent } from './viewmore/viewmore.component'
import { UserDealsEditComponent } from './user-deals-edit/user-deals-edit.component'

const routes: Routes = [
  {
    path:'',
    redirectTo:'/deals',
    pathMatch:'full'
  },
  {
    path : 'login',
    component: LoginComponent
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
   
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent,RegisterComponent,DealsComponent,PostComponent]