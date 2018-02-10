import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RijksmuseumApiService } from './services/rijksmuseum-api/rijksmuseum-api.service';
import { defaultSortOrderToken, SortOrder } from './values/sort-orders.value';

import { RootComponent } from './components/root/root.component';
import { ArtObjectsListComponent } from './components/art-objects-list/art-objects-list.component';
import { ArtObjectDetailsComponent } from './components/art-object-details/art-object-details.component';
import { ArtObjectsSearchComponent } from './components/art-objects-search/art-objects-search.component';
import { ArtObjectsSortComponent } from './components/art-objects-sort/art-objects-sort.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    RijksmuseumApiService,
    { provide: defaultSortOrderToken, useValue: SortOrder.RELEVANCE},
  ],
  declarations: [
    RootComponent,
    ArtObjectsListComponent,
    ArtObjectDetailsComponent,
    ArtObjectsSearchComponent,
    ArtObjectsSortComponent,
    PaginationComponent,
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
