import { Component, OnInit } from '@angular/core';
import { IPage } from '../page';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public pagevar: IPage[] = [];
  public errorMsg;

  constructor(
    private _pageService: PageService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._pageService.getPage(id)
      .subscribe(data => this.pagevar = data['dm_page'],
                  error => this.errorMsg = error);
  }

}
