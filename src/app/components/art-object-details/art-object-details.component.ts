import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IArtObjectDetails, RijksmuseumApiService } from '../../services/rijksmuseum-api/rijksmuseum-api.service';

@Component({
  selector: 'rm-art-object-details',
  templateUrl: './art-object-details.component.html',
  styleUrls: ['./art-object-details.component.css'],
})
export class ArtObjectDetailsComponent implements OnChanges {
  @Input() public objectNumber: string | undefined;
  public artObjectDetails$: Observable<IArtObjectDetails> | undefined;

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService,
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if ('objectNumber' in changes) {
      this.loadDetails();
    }
  }

  private loadDetails() {
    this.artObjectDetails$ = undefined;

    if (this.objectNumber) {
      this.artObjectDetails$ = this.rijksmuseumApiService.getDetails(this.objectNumber);
    }
  }
}
