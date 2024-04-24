import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../constants/constants';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    parcs$: Observable<any[]> = EMPTY;
    types$: Observable<any[]> = EMPTY;
    regions$: Observable<any[]> = EMPTY;

  constructor(private http: HttpClient) {
    this.loadAllData();
  }

    loadAllData(): void {
        this.parcs$ = this.http.get<any[]>(endpoint.api.listParcs);
        this.types$ = this.http.get<any[]>(endpoint.api.listTypes);
        this.regions$ = this.http.get<any[]>(endpoint.api.listRegions);
    }

  getParcsApi(): Observable<any> {
    return this.http.get(endpoint.api.listParcs);
  }

  getTypesApi(): Observable<any> {
    return this.http.get(endpoint.api.listTypes);
  }

  getRegionsApi(): Observable<any> {
    return this.http.get(endpoint.api.listRegions);
  }
  getDetailParcApi(slugParc: string): Observable<any> {
    return this.http.get(`${endpoint.api.detailParc}/${slugParc}`);
  }
  getReseauxSociauxParcApi(idParc: number ): Observable<any> {
    return this.http.get(`${endpoint.api.detailParc}/${idParc}/reseauxSociaux`);
  }

}
