import template from './art-objects-search.component.html';
import './art-objects-search.component.css';

export class ArtObjectsSearchComponent {
  searchQuery = '';
  onSearch;

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
