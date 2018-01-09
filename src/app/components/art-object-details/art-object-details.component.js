import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-object-details.component.html';
import './art-object-details.component.css';

export class ArtObjectDetailsComponent {
  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }

  constructor(rijksmuseumApiService) {
    this.objectNumber = null;
    this.artObjectDetails = null;
    this.rijksmuseumApiService = rijksmuseumApiService;
  }

  $onChanges(changes) {
    if ('objectNumber' in changes) {
      this.artObjectDetails = null;
      this.loadDetails();
    }
  }

  loadDetails() {
    if (this.objectNumber) {
      this.rijksmuseumApiService
        .getDetails(this.objectNumber)
        .then((artObjectDetails) => {
          this.artObjectDetails = artObjectDetails;
        });
    }
  }
}

export const artObjectDetailsDeclaration = {
  rmArtObjectDetails: {
    bindings: {
      objectNumber: '<'
    },
    controller: ArtObjectDetailsComponent,
    template
  }
};
