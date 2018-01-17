import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-objects-list.component.html';
import './art-objects-list.component.css';

export class ArtObjectsListComponent {
  artObjects;
  selectedArtObjectNumber;
  searchQuery;
  sortOrder;
  page;
  pageSize;
  onSelect;
  onListLoad;

  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }

  constructor(
    private rijksmuseumApiService
  ) {}

  $onChanges(changes) {
    if (
      'searchQuery' in changes ||
      'sortOrder' in changes ||
      'page' in changes ||
      'pageSize' in changes
    ) {
      this.loadList();
    }
  }

  loadList() {
    this.rijksmuseumApiService
      .getList({
        searchQuery: this.searchQuery,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize
      })
      .then((data) => {
        this.artObjects = data.artObjects;
        this.onListLoad({
          $event: {
            data
          }
        });
      });
  }

  selectArtObject(artObject) {
    this.selectedArtObjectNumber = artObject.objectNumber;
    this.onSelect({
      $event: artObject
    });
  }

  isSelected(artObject) {
    return artObject.objectNumber === this.selectedArtObjectNumber;
  }
}

export const artObjectsListComponentName = 'rmArtObjectsList';
export const artObjectsListComponentOptions = {
  bindings: {
    searchQuery: '<',
    sortOrder: '<',
    page: '<',
    pageSize: '<',
    onSelect: '&',
    onListLoad: '&'
  },
  controller: ArtObjectsListComponent,
  template
};
