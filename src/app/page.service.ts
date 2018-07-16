import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _url1 = 'http://192.168.1.178/scripts/api.php/dm_page?filter=drug_id,eq,';
  private _url2 = '&order[]=id,asc&transform=1';
  private _url;
  constructor(private http: HttpClient) {}

    getPage(id: number): Observable<any> {
      this._url = this._url1 + id + this._url2;
        return this.http.get<any>(this._url);
    }
}
