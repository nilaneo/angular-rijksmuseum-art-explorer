import { defaultSortOrderToken } from '../../values/sort-orders.value';
import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  selectedArtObjectNumber;
  searchQuery;
  sortOrder;
  currentPage;
  pageSize;
  totalPages;

  static get $inject() {
    return [defaultSortOrderToken];
  }
  constructor(defaultSortOrder) {
    this.selectedArtObjectNumber = null;
    this.searchQuery = '';
    this.sortOrder = defaultSortOrder;
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = null;
  }

  onSearch($event) {
    this.searchQuery = $event.searchQuery;
    this.currentPage = 1;
  }

  onSortOrderChange($event) {
    this.sortOrder = $event.newSortOrder;
    this.currentPage = 1;
  }

  onSelect($event) {
    this.selectedArtObjectNumber = $event.objectNumber;
  }

  onPageChange($event) {
    this.currentPage = $event.newCurrentPage;
  }

  onPageSizeChange($event) {
    this.pageSize = $event.newPageSize;
  }

  onListLoad($event) {
    this.totalPages = Math.ceil($event.data.count / this.pageSize);
  }
}

export const rootComponentName = 'rmRoot';
export const rootComponentOptions = {
  bindings: {},
  controller: RootComponent,
  template
};
