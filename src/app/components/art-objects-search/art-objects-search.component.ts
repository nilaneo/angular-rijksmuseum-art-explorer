import { Component, Output, EventEmitter } from '@angular/core';

export interface IOnSearchEvent {
  searchQuery: string;
}

@Component({
  selector: 'rm-art-objects-search',
  templateUrl: './art-objects-search.component.html',
  styleUrls: ['./art-objects-search.component.css'],
})
export class ArtObjectsSearchComponent {
  @Output() public search = new EventEmitter<IOnSearchEvent>();

  public onSubmit($event: Event, searchQuery: string) {
    $event.preventDefault();
    this.search.emit({ searchQuery });
  }
}
