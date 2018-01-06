import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-object-details.component.html';

export class ArtObjectDetailsComponent {
  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }
  constructor(rijksmuseumApiService) {
    console.log('ArtObjectDetailsComponent created!')
  }
}

export const artObjectDetailsDeclaration = {
  rmArtObjectDetails: {
    bindings: {},
    controller: ArtObjectDetailsComponent,
    template
  }
};
