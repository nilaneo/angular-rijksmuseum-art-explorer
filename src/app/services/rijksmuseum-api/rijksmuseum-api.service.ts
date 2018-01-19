import { IHttpService } from 'angular';
import { defaultSortOrderToken, SortOrder } from '../../values/sort-orders.value';

export interface ArtObject {
  objectNumber: string
  title: string
}

export interface ArtObjectsListResponseData {
  artObjects: Array<ArtObject>
  count: number
}

export interface ArtObjectDetails {
  longTitle: string
  description: string
  webImage: {
    url: string
  }
}

export interface ArtObjectDetailsResponseData {
  artObject: ArtObjectDetails
}

export interface GetListParams {
  searchQuery?: string | undefined
  sortOrder?: SortOrder | undefined
  page?: number | undefined
  pageSize?: number | undefined
}

export class RijksmuseumApiService {
  static get $inject() {
    return ['$http', defaultSortOrderToken];
  }

  constructor(
    private $http: IHttpService,
    private defaultSortOrder: SortOrder
  ) {}

  getList({
    searchQuery = '',
    sortOrder = this.defaultSortOrder,
    page = 1,
    pageSize = 10
  }: GetListParams = {}) {
    return this.$http
      .get<ArtObjectsListResponseData>('https://www.rijksmuseum.nl/api/en/collection', {
        params: {
          format: 'json',
          key: '3tYxhQmI',
          q: searchQuery,
          s: sortOrder,
          ps: pageSize,
          p: page
        }
      })
      .then((response) => response.data);
  }

  getDetails(objectNumber: string) {
    return this.$http
      .get<ArtObjectDetailsResponseData>(`https://www.rijksmuseum.nl/api/en/collection/${objectNumber}`, {
        params: {
          format: 'json',
          key: '3tYxhQmI'
        }
      })
      .then((response) => response.data.artObject);
  }
}

export const rijksmuseumApiServiceToken = 'rijksmuseumApiService';
export const rijksmuseumApiServiceDeclaration = {
  [rijksmuseumApiServiceToken]: RijksmuseumApiService
};
