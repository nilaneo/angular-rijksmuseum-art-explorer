import { defaultSortOrderToken, SortOrder } from '../../values/sort-orders.value';
import { IOnSearchEvent } from '../art-objects-search/art-objects-search.component';
import { IOnSortOrderChangeEvent } from '../art-objects-sort/art-objects-sort.component';
import { IOnListLoadEvent, IOnSelectEvent } from '../art-objects-list/art-objects-list.component';
import { IOnPageChangeEvent, IOnPageSizeChangeEvent } from '../pagination/pagination.component';

import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  public selectedArtObjectNumber: string | undefined;
  public searchQuery = '';
  public sortOrder: SortOrder;
  public currentPage = 1;
  public pageSize = 10;
  public totalPages: number | undefined;

  static get $inject() {
    return [defaultSortOrderToken];
  }
  constructor(private defaultSortOrder: SortOrder) {
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

  public onPageChange($event: IOnPageChangeEvent) {
    this.currentPage = $event.newCurrentPage;
  }

  public onPageSizeChange($event: IOnPageSizeChangeEvent) {
    this.pageSize = $event.newPageSize;
  }

  public onListLoad($event: IOnListLoadEvent) {
    this.totalPages = Math.ceil($event.artObjectsListResponseData.count / this.pageSize);
  }
}

export const rootComponentName = 'rmRoot';
export const rootComponentOptions = {
  bindings: {},
  controller: RootComponent,
  template,
};
