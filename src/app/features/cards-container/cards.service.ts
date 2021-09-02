import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  public baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  public getDataCount(dataSource: any): any {
    const url = `${this.baseUrl}/${dataSource}`;
    return this.http.get<any>(url);
  }
}