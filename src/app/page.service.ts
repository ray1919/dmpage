import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPage } from './page';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _url = 'http://192.168.1.178/scripts/api.php/dm_page?filter=drug_id,eq,1&order[]=id,asc&transform=1';
  constructor(private http: HttpClient) {}

    getPage(): Observable<any> {
        return this.http.get<any>(this._url);
    }
}
