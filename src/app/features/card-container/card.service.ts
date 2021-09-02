import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public baseUrl: string = 'https://swapi.dev/api';

  private errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  public getDataCount(dataSource: any): any {
    const url = `${this.baseUrl}/${dataSource}`;
    return this.http.get<any>(url);
  }

  public getData(dataSource: any, id: number): any {
    const url = `${this.baseUrl}/${dataSource}/${id}`;
    //add error handing - see starships
    return this.http.get<any>(url);
  }

  public handleError(err: HttpErrorResponse) {
    err.error instanceof ErrorEvent 
      ? this.errorMessage = `Error: ${err.error.message}`
      : this.errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    window.alert(this.errorMessage);
    return throwError(err);
  }
}