import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { defaultSortOrderToken, SortOrder } from '../../values/sort-orders.value';

export interface IArtObject {
  objectNumber: string;
  title: string;
}

export interface IArtObjectsListResponseData {
  artObjects: IArtObject[];
  count: number;
}

export interface IArtObjectDetails {
  longTitle: string;
  description: string;
  webImage: {
    url: string;
  };
}

export interface IArtObjectDetailsResponseData {
  artObject: IArtObjectDetails;
}

export interface IGetListParams {
  searchQuery?: string | undefined;
  sortOrder?: SortOrder | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
}

@Injectable()
export class RijksmuseumApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(defaultSortOrderToken) private defaultSortOrder: SortOrder,
  ) {}

  public getList({
    searchQuery = '',
    sortOrder = this.defaultSortOrder,
    page = 1,
    pageSize = 10,
  }: IGetListParams = {}) {
    return this.httpClient
      .get<IArtObjectsListResponseData>('https://www.rijksmuseum.nl/api/en/collection', {
        params: {
          format: 'json',
          key: '3tYxhQmI',
          q: searchQuery,
          s: sortOrder,
          ps: String(pageSize),
          p: String(page),
        },
      })
      .toPromise();
  }

  public getDetails(objectNumber: string) {
    return this.httpClient
      .get<IArtObjectDetailsResponseData>(`https://www.rijksmuseum.nl/api/en/collection/${objectNumber}`, {
        params: {
          format: 'json',
          key: '3tYxhQmI',
        },
      })
      .map((data) => data.artObject)
      .toPromise();
  }
}
