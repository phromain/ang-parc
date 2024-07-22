import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {endpoint} from "../constants/constants";
import {BehaviorSubject} from "rxjs";
import {IEmail, IPassword, IRegister} from "../models/auth.model";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _username: string = "";
  private _password: string = "";

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  login() {
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.jwtService.removeJwt();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }


  constructor(private jwtService: JwtService, private  http: HttpClient) {
  }

    private apikey = '5zLyjhf1Ntc6xhYTSyBlJUiBlo5zyFfi';

    private httpOptions = {
    headers: new HttpHeaders({
      'apikey': this.apikey
    })
  };

  generateHttpOptions(headersObj?: { [key: string]: string }) {
    let headers = new HttpHeaders().set('apikey', this.apikey);

    if (headersObj) {
      for (let key in headersObj) {
        headers = headers.set(key, headersObj[key]);
      }
    }
    return { headers, responseType: 'text' };
  }

  onForgotPassword(username: string){
    const httpOptions = this.generateHttpOptions({ 'login': username });
    // @ts-ignore
    return this.http.post(`${endpoint.api.forgotPassword}`,{}, httpOptions, { observe: 'response', responseType: 'text' });
  }

  onValideResetToken(token: string){
    const httpOptions = this.generateHttpOptions();
    // @ts-ignore
    return this.http.get(`${endpoint.api.validToken}/${token}`, httpOptions, { observe: 'response' });
  }

  onResetPassword(token: string | null, data: IPassword){
    const httpOptions = this.generateHttpOptions();
// @ts-ignore
    return this.http.post(`${endpoint.api.resetPassword}/${token}`,data, httpOptions, { observe: 'response', responseType: 'text' });
  }


  onForgotUsername(data: IEmail){
    const httpOptions = this.generateHttpOptions();
    // @ts-ignore
    return this.http.post(`${endpoint.api.forgotUsername}`,data, httpOptions, { observe: 'response', responseType: 'text' });
  }

  onRegister(data: IRegister){
    const httpOptions = this.generateHttpOptions();
    // @ts-ignore
    return this.http.post(`${endpoint.api.register}`,data, httpOptions, { observe: 'response', responseType: 'text' });
  }

  onLogin(login: string, password: string){
    const httpOptions = this.generateHttpOptions({ 'login': login , 'password':password });
    // @ts-ignore
    return this.http.post(`${endpoint.api.login}`,{}, httpOptions, { observe: 'response'});
  }

  onConfirmPin(login: string, password: string, pin:string){
    const httpOptions = this.generateHttpOptions({ 'login': login , 'password':password,'pin':pin });
    // @ts-ignore
    return this.http.post(`${endpoint.api.loginVerify}`,{}, httpOptions, { observe: 'response' });
  }




  // Getters && Setters
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
