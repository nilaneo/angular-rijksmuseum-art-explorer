import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IArtObjectDetails, RijksmuseumApiService } from '../../services/rijksmuseum-api/rijksmuseum-api.service';

@Component({
  selector: 'rm-art-object-details',
  templateUrl: './art-object-details.component.html',
  styleUrls: ['./art-object-details.component.css'],
})
export class ArtObjectDetailsComponent implements OnChanges {
  public artObjectDetails: IArtObjectDetails | undefined;
  @Input() public objectNumber: string | undefined;

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService,
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if ('objectNumber' in changes) {
      this.artObjectDetails = undefined;
      this.loadDetails();
    }
  }

  private loadDetails() {
    if (this.objectNumber) {
      this.rijksmuseumApiService
        .getDetails(this.objectNumber)
        .then((artObjectDetails) => {
          this.artObjectDetails = artObjectDetails;
        });
    }
  }
}
