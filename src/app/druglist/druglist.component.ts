import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PageService } from '../page.service';
import { IList } from '../list';

@Component({
  selector: 'app-druglist',
  templateUrl: './druglist.component.html',
  styleUrls: ['./druglist.component.css']
})
export class DruglistComponent implements OnInit {
  public druglist: IList[];

  constructor(
    private _pageService: PageService,
    private location: Location) { }

  ngOnInit() {
    this._pageService.getList()
    .subscribe( data => this.druglist = data,
                error => console.log(error),
                () => console.log('getList got a complete notification')
    );
  }

  goBack(): void {
    this.location.back();
  }
}
