import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { ListComponent } from './list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DruglistComponent } from './druglist/druglist.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'page/:id', component: PageComponent },
    { path: 'druglist', component: DruglistComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
export const routingComponents = [ PageComponent,
    ListComponent,
    PageNotFoundComponent,
    DruglistComponent ];
