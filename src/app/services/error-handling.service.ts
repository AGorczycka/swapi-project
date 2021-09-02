import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  private errorMessage: string | null = null;

  public handleError(err: HttpErrorResponse) {
    err.error instanceof ErrorEvent 
      ? this.errorMessage = `Error: ${err.error.message}`
      : this.errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    window.alert(this.errorMessage);
    return throwError(err);
  }
}