import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }


  getParcs(): Observable<any> {
    return this.http.get(endpoint.api.listParcs);
  }

  getTypes(): Observable<any> {
    return this.http.get(endpoint.api.listTypes);
  }

  getRegions(): Observable<any> {
    return this.http.get(endpoint.api.listRegions);
  }

}
