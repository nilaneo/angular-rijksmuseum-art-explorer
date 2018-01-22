import { IOnChanges, IOnChangesObject } from 'angular';
import {
  rijksmuseumApiServiceToken,
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

export class ArtObjectsListComponent implements IOnChanges {
  public artObjects: IArtObject[] | undefined;
  public selectedArtObjectNumber: string | undefined;
  public searchQuery: string | undefined;
  public sortOrder: SortOrder | undefined;
  public page: number | undefined;
  public pageSize: number | undefined;
  public onSelect: (data: { $event: IOnSelectEvent}) => void ;
  public onListLoad: (data: { $event: IOnListLoadEvent}) => void;

  static get $inject() {
    return [rijksmuseumApiServiceToken];
  }

  constructor(
    private rijksmuseumApiService: RijksmuseumApiService,
  ) {}

  public $onChanges(changes: IOnChangesObject) {
    if (
      'searchQuery' in changes ||
      'sortOrder' in changes ||
      'page' in changes ||
      'pageSize' in changes
    ) {
      this.loadList();
    }
  }

  public loadList() {
    this.rijksmuseumApiService
      .getList({
        searchQuery: this.searchQuery,
        sortOrder: this.sortOrder,
        page: this.page,
        pageSize: this.pageSize,
      })
      .then((data) => {
        this.artObjects = data.artObjects;
        this.onListLoad({
          $event: {
            artObjectsListResponseData: data,
          },
        });
      });
  }

  public selectArtObject(artObject: IArtObject) {
    this.selectedArtObjectNumber = artObject.objectNumber;
    this.onSelect({
      $event: {
        objectNumber: this.selectedArtObjectNumber,
      },
    });
  }

  public isSelected(artObject: IArtObject) {
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
    onListLoad: '&',
  },
  controller: ArtObjectsListComponent,
  template,
};
