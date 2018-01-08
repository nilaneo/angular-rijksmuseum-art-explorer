import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-object-details.component.html';
import './art-object-details.component.css';

export class ArtObjectDetailsComponent {
  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }
  constructor(rijksmuseumApiService) {
    this.objectNumber = 'SK-A-1115';
    this.artObjectDetails = null;
    this.rijksmuseumApiService = rijksmuseumApiService;
  }
  $onInit() {
    this.loadDetails();
  }
  loadDetails() {
    this.rijksmuseumApiService
      .getDetails(this.objectNumber)
      .then((artObjectDetails) => {
        this.artObjectDetails = artObjectDetails;
      });
  }
}

export const artObjectDetailsDeclaration = {
  rmArtObjectDetails: {
    bindings: {},
    controller: ArtObjectDetailsComponent,
    template
  }
};
