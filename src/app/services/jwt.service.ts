import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as constants from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  isAuthentification: BehaviorSubject<boolean> = new  BehaviorSubject<boolean>(false);

  constructor() { }

  updateToken(status: boolean){
    this.isAuthentification.next(status);
  }
  setJwt(jwt:string){
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_JWT, jwt);
  }

  getJwt(): string | null {
    return localStorage.getItem(constants.CURRENT_JWT) || null;
  }

  removeJwt(){
    this.updateToken(false);
    return localStorage.removeItem(constants.CURRENT_JWT);
  }

}

