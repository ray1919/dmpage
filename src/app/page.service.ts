import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PageService {

  private _url1 = 'http://192.168.1.178/scripts/api.php/dm_page?filter=drug_id,eq,';
  private _url2 = '&order[]=id,asc&transform=1';
  private _url;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.message || 'Something bad happened; please try again later.');
  }

  getPage(id: number): Observable<any> {
    this._url = this._url1 + id + this._url2;
      return this.http.get<any>(this._url)
        .pipe(
          catchError(this.handleError)
        );
  }
}
