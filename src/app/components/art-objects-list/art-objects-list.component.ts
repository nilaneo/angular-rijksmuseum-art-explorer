import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  RijksmuseumApiService,
  IArtObject,
  IArtObjectsListResponseData,
} from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import { SortOrder } from '../../values/sort-orders.value';

export interface IOnSelectEvent {
  objectNumber: string;
}

export interface IOnListLoadEvent {
  artObjectsListResponseData: IArtObjectsListResponseData;
}

@Component({
  selector: 'rm-art-objects-list',
  templateUrl: './art-objects-list.component.html',
  styleUrls: ['./art-objects-list.component.css'],
})
export class ArtObjectsListComponent implements OnChanges {
  public artObjects$: Observable<IArtObject[]> | undefined;
  public selectedArtObjectNumber: string | undefined;
  @Input() public searchQuery: string | undefined;
  @Input() public sortOrder: SortOrder | undefined;
  @Input() public page: number | undefined;
  @Input() public pageSize: number | undefined;
  @Output() public select = new EventEmitter<IOnSelectEvent>();
  @Output() public listLoad = new EventEmitter<IOnListLoadEvent>();

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService,
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (
      'searchQuery' in changes ||
      'sortOrder' in changes ||
      'page' in changes ||
      'pageSize' in changes
    ) {
      this.loadList();
    }
  }

  public selectArtObject(artObject: IArtObject) {
    this.selectedArtObjectNumber = artObject.objectNumber;
    this.select.emit({ objectNumber: this.selectedArtObjectNumber });
  }

  public isSelected(artObject: IArtObject) {
    return artObject.objectNumber === this.selectedArtObjectNumber;
  }

  private loadList() {
    this.artObjects$ = this.rijksmuseumApiService
      .getList({
        searchQuery: this.searchQuery,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize,
      })
      .do((data) => {
        this.listLoad.emit({ artObjectsListResponseData: data });
      })
      .map((data) => data.artObjects);
  }
}
