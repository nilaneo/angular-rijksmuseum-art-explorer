import template from './art-objects-search.component.html';
import './art-objects-search.component.css';

export class ArtObjectsSearchComponent {
  constructor() {
    this.searchQuery = '';
  }

  onClick() {
    this.onSearch({
      $event: {
        searchQuery: this.searchQuery
      }
    });
  }
}

export const artObjectsSearchDeclaration = {
  rmArtObjectsSearch: {
    bindings: {
      onSearch: '&'
    },
    controller: ArtObjectsSearchComponent,
    template
  }
};
