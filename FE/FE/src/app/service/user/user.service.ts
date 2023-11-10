import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = 'http://localhost:8080/api/v1/user'

  constructor(private httpClient: HttpClient) { }

  userList(pageNumber: number): Observable<any> {
    return this.httpClient.get<any>(this.api_url + '/list'+ '?page=' + pageNumber);
  }

  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(this.api_url + '/create', user);
  }

  checkEmail(email: string): Observable<any> {
    let dto = {
      email: email
    };
    return this.httpClient.post<any>(this.api_url + '/checkUniqueEmail', dto);
  }

  checkUserName(userName: string): Observable<any> {
    let dto = {
      userName: userName
    };
    return this.httpClient.post<any>(this.api_url + '/checkUniqueUserName', dto);
  }

  detailUser(id: number | undefined): Observable<any> {
    return this.httpClient.get<any>(this.api_url + '/detail/' + id);
  }
}
