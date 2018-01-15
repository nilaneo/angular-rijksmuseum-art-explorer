import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  constructor() {
    this.selectedArtObjectNumber = null;
    this.searchQuery = '';
    this.sortOrder = 'objecttype';
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

export const rootComponentDeclaration = {
  rmRoot: {
    bindings: {},
    controller: RootComponent,
    template
  }
};
