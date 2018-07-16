import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public pagevar = [];

  constructor(private _pageService: PageService) { }

  ngOnInit() {
    this._pageService.getPage()
      .subscribe(data => this.pagevar = data['dm_page']);
  }

}
