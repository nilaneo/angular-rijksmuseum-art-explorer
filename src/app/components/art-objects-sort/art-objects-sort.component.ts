import { SortOrder } from '../../values/sort-orders.value';
import template from './art-objects-sort.component.html';
import './art-objects-sort.component.css';

export interface OnSortOrderChangeEvent {
  newSortOrder: SortOrder
}

export class ArtObjectsSortComponent {
  sortOrders = SortOrder;
  sortOrder: SortOrder;
  onSortOrderChange: (data: { $event: OnSortOrderChangeEvent }) => void;

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
