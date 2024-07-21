import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {endpoint} from "../constants/constants";
import {BehaviorSubject} from "rxjs";
import {IEmail} from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string = "";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login() {
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }


  constructor(private tokenService: TokenService, private  http: HttpClient) {
  }

    private apikey = '5zLyjhf1Ntc6xhYTSyBlJUiBlo5zyFfi';

    private httpOptions = {
    headers: new HttpHeaders({
      'apikey': this.apikey
    })
  };

  generateHttpOptions(username?: string) {
    let headers = new HttpHeaders().set('apikey', this.apikey);

    if (username) {
      headers = headers.set('login', username);
    }

    return { headers, responseType: 'text' };
  }
/*
  onLogin(data: ILogin) {
    return this.http.post(`${apiEndpoint.AuthEndpoint.login}`, data, { observe: 'response', responseType: 'text' });
  }

  onConfirmPin(data: IPin) {
    const headers = new HttpHeaders().set('username', this.getUsername());
    return this.http.post(`${apiEndpoint.AuthEndpoint.loginPin}`, data, { headers, observe: 'response', responseType: 'text' });
  }

  onForgotUsername(data: Iemail){
    return this.http.post(`${apiEndpoint.AuthEndpoint.forgotUsername}`, data, { observe: 'response', responseType: 'text' });
*/
  onForgotPassword(username: string){
    const httpOptions = this.generateHttpOptions(username);
    // @ts-ignore
    return this.http.post(`${endpoint.api.forgotPassword}`,{}, httpOptions, { observe: 'response', responseType: 'text' });
  }

  onForgotUsername(data: IEmail){
    const httpOptions = this.generateHttpOptions();
    // @ts-ignore
    return this.http.post(`${endpoint.api.forgotUsername}`,data, httpOptions, { observe: 'response', responseType: 'text' });
  }

  // Getters && Setters

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

}
