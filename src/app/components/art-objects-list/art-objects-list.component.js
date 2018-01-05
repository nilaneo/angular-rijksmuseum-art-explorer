import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-objects-list.component.html';

export class ArtObjectsListComponent {
  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }
  constructor(rijksmuseumApiService) {
    console.log('ArtObjectsListComponent created!')
  }
}

export const artObjectsListDeclaration = {
  rmArtObjectsList: {
    bindings: {},
    controller: ArtObjectsListComponent,
    template
  }
};
