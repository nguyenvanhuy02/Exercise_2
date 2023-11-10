import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "../../model/security/login-form";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login_url= 'http://localhost:8080/api/v1/auth/login'

  constructor(private httpClient: HttpClient) {
  }

  login(loginForm: LoginForm): Observable<any> {
    return this.httpClient.post<any>(this.login_url, loginForm);
  }

}
