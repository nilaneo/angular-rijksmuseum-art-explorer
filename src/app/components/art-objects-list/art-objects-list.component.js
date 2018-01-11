import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-objects-list.component.html';
import './art-objects-list.component.css';

export class ArtObjectsListComponent {
  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }

  constructor(rijksmuseumApiService) {
    this.artObjects = null;
    this.selectedArtObjectNumber = null;
    this.rijksmuseumApiService = rijksmuseumApiService;
  }

  $onChanges(changes) {
    if ('searchQuery' in changes) {
      this.loadList();
    }
  }

  loadList() {
    this.rijksmuseumApiService
      .getList(this.searchQuery)
      .then((data) => {
        this.artObjects = data;
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

export const artObjectsListDeclaration = {
  rmArtObjectsList: {
    bindings: {
      title: '<',
      searchQuery: '<',
      onSelect: '&'
    },
    controller: ArtObjectsListComponent,
    template
  }
};
