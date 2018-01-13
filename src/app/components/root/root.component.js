import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  constructor() {
    this.selectedArtObjectNumber = null;
    this.searchQuery = '';
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = null;
  }

  onSearch($event) {
    this.searchQuery = $event.searchQuery;
  }

  onSelect($event) {
    this.selectedArtObjectNumber = $event.objectNumber;
  }

  onPageChange($event) {
    this.currentPage = $event.newCurrentPage;
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
