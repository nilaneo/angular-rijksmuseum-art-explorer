import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SortOrder } from '../../values/sort-orders.value';
import template from './art-objects-sort.component.html';
import './art-objects-sort.component.css';

export interface IOnSortOrderChangeEvent {
  newSortOrder: SortOrder | undefined;
}

@Component({
  selector: 'rm-art-objects-sort',
  template,
})
export class ArtObjectsSortComponent {
  public sortOrders = SortOrder;
  @Input() public sortOrder: SortOrder | undefined;
  @Output() public sortOrderChange = new EventEmitter<IOnSortOrderChangeEvent>();

  public changeSortOrder(newSortOrder: SortOrder) {
    this.sortOrderChange.emit({ newSortOrder });
  }
}
