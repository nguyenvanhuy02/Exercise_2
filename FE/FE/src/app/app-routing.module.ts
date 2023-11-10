import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./security/login/login.component";
import {ListComponent} from "./component/user/list/list.component";
import {AdminService} from "./security/guard/admin.service";
import {SignupComponent} from "./security/signup/signup.component";
import {DetailComponent} from "./component/user/detail/detail.component";
import {HomeComponent} from "./component/user/home/home.component";
import {ProfileComponent} from "./component/user/profile/profile.component";
import {LoginService} from "./security/guard/login.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginService]},
  {path: 'signup', component: SignupComponent, canActivate: [LoginService]},
  {path: '', component: HomeComponent},
  {path: 'detail/:id', component: DetailComponent , canActivate: [AdminService]},
  {path: 'profile', component: ProfileComponent},
  {path: 'list', component: ListComponent , canActivate: [AdminService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
