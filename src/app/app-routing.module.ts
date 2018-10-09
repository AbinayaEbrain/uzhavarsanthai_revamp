import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DealsComponent } from './deals/deals.component';
import { PostComponent } from './post/post.component';

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
    path : 'post', 
    component: PostComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent,RegisterComponent,DealsComponent,PostComponent]