import template from './art-objects-search.component.html';
import './art-objects-search.component.css';

export interface IOnSearchEvent {
  searchQuery: string;
}

export class ArtObjectsSearchComponent {
  public searchQuery = '';
  public onSearch: (data: { $event: IOnSearchEvent}) => void;

  public onSubmit() {
    this.onSearch({
      $event: {
        searchQuery: this.searchQuery,
      },
    });
  }
}

export const artObjectsSearchComponentName = 'rmArtObjectsSearch';
export const artObjectsSearchComponentOptions = {
  bindings: {
    onSearch: '&',
  },
  controller: ArtObjectsSearchComponent,
  template,
};
