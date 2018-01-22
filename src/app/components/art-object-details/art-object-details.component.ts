import { IOnChanges, IOnChangesObject } from 'angular';
import {
  rijksmuseumApiServiceToken,
  IArtObjectDetails,
  RijksmuseumApiService,
} from '../../services/rijksmuseum-api/rijksmuseum-api.service';

import template from './art-object-details.component.html';
import './art-object-details.component.css';

export class ArtObjectDetailsComponent implements IOnChanges {
  public artObjectDetails: IArtObjectDetails | undefined;
  public objectNumber: string | undefined;

  static get $inject() {
    return [rijksmuseumApiServiceToken];
  }

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService,
  ) {}

  public $onChanges(changes: IOnChangesObject) {
    if ('objectNumber' in changes) {
      this.artObjectDetails = undefined;
      this.loadDetails();
    }
  }

  public loadDetails() {
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
    objectNumber: '<',
  },
  controller: ArtObjectDetailsComponent,
  template,
};
