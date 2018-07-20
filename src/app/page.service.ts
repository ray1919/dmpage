import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPage } from './page';
import { IList } from './list';
import { IImage } from './image';

@Injectable({
    providedIn: 'root',
})
export class PageService {

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

  getPage(id: number): Observable<IPage[]> {
    const _url1 = 'http://192.168.1.178/scripts/api.php/dm_page?filter=drug_id,eq,';
    const _url2 = '&order[]=id,asc&transform=1';
    const _url = _url1 + id + _url2;
    return this.http.get<any>(_url)
      .pipe(
        map(res => res.dm_page),
        catchError(this.handleError)
      );
  }

  getName(id: number): Observable<IList> {
    const _url1 = 'http://192.168.1.178/scripts/api.php/dm_list?filter=id,eq,';
    const _url2 = '&transform=1';
    const _url = _url1 + id + _url2;
    return this.http.get<any>(_url)
      .pipe(
        map(res => res.dm_list[0]),
        catchError(this.handleError)
      );
  }

  getImage(id: number): Observable<IImage[]> {
    const _url1 = 'http://192.168.1.178/scripts/api.php/dm_image?filter=drug_id,eq,';
    const _url2 = '&columns=fig_id,filename&transform=1&order[]=fig_id,asc';
    const _url = _url1 + id + _url2;
    return this.http.get<any>(_url)
      .pipe(
        map(res => res.dm_image),
        catchError(this.handleError)
      );
  }

  searchName(term: string): Observable<IList[]> {
    if (!term.trim()) {
      return of([]);
    }
    const nameurl = `http://192.168.1.178/scripts/api.php/dm_list?filter[]=status,eq,1&filter[]=name,cs,${term}&exclude=status&transform=1`;
    return this.http.get<any>(nameurl)
      .pipe(
        map(res => res.dm_list),
        tap(_ => console.log(`found name matching "${term}"`)),
        catchError(this.handleError)
      );
  }

  searchChinese(term: string): Observable<IList[]> {
    if (!term.trim()) {
      return of([]);
    }
    // tslint:disable-next-line:max-line-length
    const nameurl = `http://192.168.1.178/scripts/api.php/dm_list?filter[]=status,eq,1&filter[]=chinese,cs,${term}&exclude=status&transform=1`;
    return this.http.get<any>(nameurl)
      .pipe(
        map(res => res.dm_list),
        tap(_ => console.log(`found Chinese matching "${term}"`)),
        catchError(this.handleError)
      );
  }

  searchClass(term: string): Observable<IList[]> {
    if (!term.trim()) {
      return of([]);
    }
    // tslint:disable-next-line:max-line-length
    const nameurl = `http://192.168.1.178/scripts/api.php/dm_list?filter[]=status,eq,1&filter[]=class,cs,${term}&exclude=status&transform=1`;
    return this.http.get<any>(nameurl)
      .pipe(
        map(res => res.dm_list),
        tap(_ => console.log(`found class matching "${term}"`)),
        catchError(this.handleError)
      );
  }
}
