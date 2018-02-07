import { Component, Output, EventEmitter } from '@angular/core';

import template from './art-objects-search.component.html';
import './art-objects-search.component.css';

export interface IOnSearchEvent {
  searchQuery: string;
}

@Component({
  selector: 'rm-art-objects-search',
  template,
})
export class ArtObjectsSearchComponent {
  public searchQuery = '';
  @Output() public onSearch = new EventEmitter<IOnSearchEvent>();

  public onSubmit() {
    this.onSearch.emit({
      searchQuery: this.searchQuery,
    });
  }
}
