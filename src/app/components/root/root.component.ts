import { defaultSortOrderToken, SortOrder } from '../../values/sort-orders.value';
import { OnSearchEvent } from '../art-objects-search/art-objects-search.component';
import { OnSortOrderChangeEvent } from '../art-objects-sort/art-objects-sort.component';
import { OnListLoadEvent, OnSelectEvent } from '../art-objects-list/art-objects-list.component';
import { OnPageChangeEvent, OnPageSizeChangeEvent } from '../pagination/pagination.component';

import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  selectedArtObjectNumber: string;
  searchQuery = '';
  sortOrder: SortOrder;
  currentPage = 1;
  pageSize = 10;
  totalPages: number;

  static get $inject() {
    return [defaultSortOrderToken];
  }
  constructor(defaultSortOrder: SortOrder) {
    this.sortOrder = defaultSortOrder;
  }

  onSearch($event: OnSearchEvent) {
    this.searchQuery = $event.searchQuery;
    this.currentPage = 1;
  }

  onSortOrderChange($event: OnSortOrderChangeEvent) {
    this.sortOrder = $event.newSortOrder;
    this.currentPage = 1;
  }

  onSelect($event: OnSelectEvent) {
    this.selectedArtObjectNumber = $event.objectNumber;
  }

  onPageChange($event: OnPageChangeEvent) {
    this.currentPage = $event.newCurrentPage;
  }

  onPageSizeChange($event: OnPageSizeChangeEvent) {
    this.pageSize = $event.newPageSize;
  }

  onListLoad($event: OnListLoadEvent) {
    this.totalPages = Math.ceil($event.artObjectsListResponseData.count / this.pageSize);
  }
}

export const rootComponentName = 'rmRoot';
export const rootComponentOptions = {
  bindings: {},
  controller: RootComponent,
  template
};
