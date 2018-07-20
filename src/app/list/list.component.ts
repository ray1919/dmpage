import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PageService } from '../page.service';
import { IList } from '../list';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  rows$: Observable<IList[]>;
  chineses$: Observable<IList[]>;
  classs$: Observable<IList[]>;

  private nameTerm = new Subject<string>();
  private chineseTerm = new Subject<string>();
  private classTerm = new Subject<string>();
  constructor(private _pageService: PageService) { }

  searchName(term: string): void {
    this.nameTerm.next(term);
  }

  searchChinese(term: string): void {
    this.chineseTerm.next(term);
  }

  searchClass(term: string): void {
    this.classTerm.next(term);
  }

  ngOnInit() {
    this.rows$ = this.nameTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this._pageService.searchName(term)),
    );
    this.chineses$ = this.chineseTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this._pageService.searchChinese(term)),
    );
    this.classs$ = this.classTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this._pageService.searchClass(term)),
    );
  }


}
