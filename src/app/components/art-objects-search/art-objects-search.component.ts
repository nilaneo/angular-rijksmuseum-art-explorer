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
  @Output() public search = new EventEmitter<IOnSearchEvent>();

  public onSubmit(searchQuery: string) {
    this.search.emit({ searchQuery });
  }
}
