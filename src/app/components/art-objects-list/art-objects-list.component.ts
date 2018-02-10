import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import {
  RijksmuseumApiService,
  IArtObject,
  IArtObjectsListResponseData,
} from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import { SortOrder } from '../../values/sort-orders.value';

import template from './art-objects-list.component.html';
import './art-objects-list.component.css';

export interface IOnSelectEvent {
  objectNumber: string;
}

export interface IOnListLoadEvent {
  artObjectsListResponseData: IArtObjectsListResponseData;
}

@Component({
  selector: 'rm-art-objects-list',
  template,
})
export class ArtObjectsListComponent implements OnChanges {
  public artObjects: IArtObject[] | undefined;
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
    this.rijksmuseumApiService
      .getList({
        searchQuery: this.searchQuery,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize,
      })
      .then((data) => {
        this.artObjects = data.artObjects;
        this.listLoad.emit({ artObjectsListResponseData: data });
      });
  }
}
