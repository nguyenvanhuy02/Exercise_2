import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './security/login/login.component';
import { ListComponent } from './component/user/list/list.component';
import { HeaderComponent } from './component/header/header.component';
import {ToastrModule} from "ngx-toastr";
import { SignupComponent } from './security/signup/signup.component';
import { DetailComponent } from './component/user/detail/detail.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { HomeComponent } from './component/user/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    HeaderComponent,
    SignupComponent,
    DetailComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
