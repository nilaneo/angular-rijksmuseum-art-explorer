import { sortOrdersToken } from '../../values/sort-orders.value';
import template from './art-objects-sort.component.html';
import './art-objects-sort.component.css';

export class ArtObjectsSortComponent {
  sortOrder;
  onSortOrderChange;

  static get $inject() {
    return [sortOrdersToken];
  }
  constructor(
    public sortOrders
  ) {}

  changeSortOrder() {
    this.onSortOrderChange({
      $event: {
        newSortOrder: this.sortOrder
      }
    });
  }
}

export const artObjectsSortComponentName = 'rmArtObjectsSort';
export const artObjectsSortComponentOptions = {
  bindings: {
    sortOrder: '<',
    onSortOrderChange: '&'
  },
  controller: ArtObjectsSortComponent,
  template
};
