import template from './art-objects-search.component.html';
import './art-objects-search.component.css';

export interface OnSearchEvent {
  searchQuery: string
}

export class ArtObjectsSearchComponent {
  searchQuery = '';
  onSearch: (data: { $event: OnSearchEvent}) => void;

  onSubmit() {
    this.onSearch({
      $event: {
        searchQuery: this.searchQuery
      }
    });
  }
}

export const artObjectsSearchComponentName = 'rmArtObjectsSearch';
export const artObjectsSearchComponentOptions = {
  bindings: {
    onSearch: '&'
  },
  controller: ArtObjectsSearchComponent,
  template
};
