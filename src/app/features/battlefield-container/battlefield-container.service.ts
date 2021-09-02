import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldContainerService {
  public baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  public getData(dataSource: any, id: number): any {
    const url = `${this.baseUrl}/${dataSource}/${id}`;
    return this.http.get<any>(url);
  }

  public getDataCount(dataSource: any): any {
    const url = `${this.baseUrl}/${dataSource}`;
    return this.http.get<any>(url);
  }
}