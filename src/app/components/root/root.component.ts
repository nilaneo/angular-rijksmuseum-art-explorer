import { Component, Inject } from '@angular/core';

import { defaultSortOrderToken, SortOrder } from '../../values/sort-orders.value';
import { IOnSearchEvent } from '../art-objects-search/art-objects-search.component';
import { IOnSortOrderChangeEvent } from '../art-objects-sort/art-objects-sort.component';
import { IOnListLoadEvent, IOnSelectEvent } from '../art-objects-list/art-objects-list.component';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'rm-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent {
  public selectedArtObjectNumber: string | undefined;
  public searchQuery = '';
  public sortOrder: SortOrder;
  public currentPage = 1;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 15, 20, 25];
  public totalPages: number | undefined;

  constructor(
    @Inject(defaultSortOrderToken) private defaultSortOrder: SortOrder,
  ) {
    this.sortOrder = defaultSortOrder;
  }

  public onSearch($event: IOnSearchEvent) {
    this.searchQuery = $event.searchQuery;
    this.currentPage = 1;
  }

  public onSortOrderChange($event: IOnSortOrderChangeEvent) {
    if ($event.newSortOrder === undefined) {
      this.sortOrder = this.defaultSortOrder;
    } else {
      this.sortOrder = $event.newSortOrder;
    }
    this.currentPage = 1;
  }

  public onSelect($event: IOnSelectEvent) {
    this.selectedArtObjectNumber = $event.objectNumber;
  }

  public onPageChange($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  public onListLoad($event: IOnListLoadEvent) {
    this.totalPages = Math.ceil($event.artObjectsListResponseData.count / this.pageSize);
  }
}
