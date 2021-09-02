import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  public getData(dataSource: any, id: number): any {
    const url = `${this.baseUrl}/${dataSource}/${id}`;
    return this.http.get<any>(url);
  }
}