import { sortOrdersToken } from '../../values/sort-orders.value';
import template from './art-objects-sort.component.html';
import './art-objects-sort.component.css';

export class ArtObjectsSortComponent {
  static get $inject() {
    return [sortOrdersToken];
  }
  constructor(sortOrders) {
    this.sortOrders = sortOrders;
  }
  changeSortOrder() {
    this.onSortOrderChange({
      $event: {
        newSortOrder: this.sortOrder
      }
    });
  }
}

export const artObjectsSortDeclaration = {
  rmArtObjectsSort: {
    bindings: {
      sortOrder: '<',
      onSortOrderChange: '&'
    },
    controller: ArtObjectsSortComponent,
    template
  }
};
