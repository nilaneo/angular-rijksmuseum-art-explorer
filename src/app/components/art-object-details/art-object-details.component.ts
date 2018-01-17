import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import template from './art-object-details.component.html';
import './art-object-details.component.css';

export class ArtObjectDetailsComponent {
  artObjectDetails;
  objectNumber;

  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }

  constructor(
    private rijksmuseumApiService
  ) {}

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

export const artObjectDetailsComponentName = 'rmArtObjectDetails';
export const artObjectDetailsComponentOptions = {
  bindings: {
    objectNumber: '<'
  },
  controller: ArtObjectDetailsComponent,
  template
};
