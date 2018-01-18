import { IOnChanges, IOnChangesObject } from 'angular';
import { rijksmuseumApiServiceToken, RijksmuseumApiService, ArtObject, ArtObjectsListResponseData } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import { SortOrder } from '../../values/sort-orders.value';

import template from './art-objects-list.component.html';
import './art-objects-list.component.css';

export interface OnSelectEvent {
  objectNumber: string
}

export interface OnListLoadEvent {
  artObjectsListResponseData: ArtObjectsListResponseData
}

export class ArtObjectsListComponent implements IOnChanges {
  artObjects: Array<ArtObject>;
  selectedArtObjectNumber: string;
  searchQuery: string;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  onSelect: (data: { $event: OnSelectEvent}) => void;
  onListLoad: (data: { $event: OnListLoadEvent}) => void;

  static get $inject () {
    return [rijksmuseumApiServiceToken];
  }

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService
  ) {}

  $onChanges(changes: IOnChangesObject) {
    if (
      'searchQuery' in changes ||
      'sortOrder' in changes ||
      'page' in changes ||
      'pageSize' in changes
    ) {
      this.loadList();
    }
  }

  loadList() {
    this.rijksmuseumApiService
      .getList({
        searchQuery: this.searchQuery,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize
      })
      .then((data) => {
        this.artObjects = data.artObjects;
        this.onListLoad({
          $event: {
            artObjectsListResponseData: data
          }
        });
      });
  }

  selectArtObject(artObject: ArtObject) {
    this.selectedArtObjectNumber = artObject.objectNumber;
    this.onSelect({
      $event: {
        objectNumber: this.selectedArtObjectNumber
      }
    });
  }

  isSelected(artObject: ArtObject) {
    return artObject.objectNumber === this.selectedArtObjectNumber;
  }
}

export const artObjectsListComponentName = 'rmArtObjectsList';
export const artObjectsListComponentOptions = {
  bindings: {
    searchQuery: '<',
    sortOrder: '<',
    page: '<',
    pageSize: '<',
    onSelect: '&',
    onListLoad: '&'
  },
  controller: ArtObjectsListComponent,
  template
};
