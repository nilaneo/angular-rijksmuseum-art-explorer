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

  $onInit() {
    this.rijksmuseumApiService
      .getList()
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
      onSelect: '&'
    },
    controller: ArtObjectsListComponent,
    template
  }
};
