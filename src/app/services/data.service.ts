import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  private apikey = '5zLyjhf1Ntc6xhYTSyBlJUiBlo5zyFfi';

  private httpOptions = {
    headers: new HttpHeaders({
      'apikey': this.apikey
    })
  };


  getParcs(): Observable<any> {
    return this.http.get(endpoint.api.listParcs);
  }

  getTypes(): Observable<any> {
    return this.http.get(endpoint.api.listTypes);
  }

  getRegions(): Observable<any> {
    return this.http.get(endpoint.api.listRegions, this.httpOptions);
  }
  getDetailParc(slugParc: string): Observable<any> {
    return this.http.get(`${endpoint.api.detailParc}/${slugParc}`);
  }

}
