import { SortOrder } from '../../values/sort-orders.value';
import template from './art-objects-sort.component.html';
import './art-objects-sort.component.css';

export interface IOnSortOrderChangeEvent {
  newSortOrder: SortOrder | undefined;
}

export class ArtObjectsSortComponent {
  public sortOrders = SortOrder;
  public sortOrder: SortOrder | undefined;
  public onSortOrderChange: (data: { $event: IOnSortOrderChangeEvent }) => void;

  public changeSortOrder() {
    this.onSortOrderChange({
      $event: {
        newSortOrder: this.sortOrder,
      },
    });
  }
}

export const artObjectsSortComponentName = 'rmArtObjectsSort';
export const artObjectsSortComponentOptions = {
  bindings: {
    sortOrder: '<',
    onSortOrderChange: '&',
  },
  controller: ArtObjectsSortComponent,
  template,
};
