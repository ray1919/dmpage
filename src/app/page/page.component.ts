import { Component, OnInit } from '@angular/core';
import { IPage } from '../page';
import { IList } from '../list';
import { IImage } from '../image';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public pagevar: IPage[];
  public namevar: IList;
  public imgvar: IImage[];
  public errorMsg;

  constructor(
    private _pageService: PageService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._pageService.getName(id)
    .subscribe( data => this.namevar = data,
                error => this.errorMsg = error,
                () => console.log('getName got a complete notification')
    );
    this._pageService.getPage(id)
    .subscribe( data => this.pagevar = data,
                error => this.errorMsg = error,
                () => console.log('getPage got a complete notification')
    );
    this._pageService.getImage(id)
    .subscribe( data => this.imgvar = data,
                error => this.errorMsg = error,
                () => console.log('getImage got a complete notification')
    );
  }

}
