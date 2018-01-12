import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  constructor() {
    this.selectedArtObjectNumber = null;
    this.searchQuery = '';
    this.currentPage = 0;
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
}

export const rootComponentDeclaration = {
  rmRoot: {
    bindings: {},
    controller: RootComponent,
    template
  }
};
