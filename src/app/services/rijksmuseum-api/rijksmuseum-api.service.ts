import { IHttpService } from 'angular';
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

export class RijksmuseumApiService {
  static get $inject() {
    return ['$http', defaultSortOrderToken];
  }

  constructor(
    private $http: IHttpService,
    private defaultSortOrder: SortOrder,
  ) {}

  public getList({
    searchQuery = '',
    sortOrder = this.defaultSortOrder,
    page = 1,
    pageSize = 10,
  }: IGetListParams = {}) {
    return this.$http
      .get<IArtObjectsListResponseData>('https://www.rijksmuseum.nl/api/en/collection', {
        params: {
          format: 'json',
          key: '3tYxhQmI',
          q: searchQuery,
          s: sortOrder,
          ps: pageSize,
          p: page,
        },
      })
      .then((response) => response.data);
  }

  public getDetails(objectNumber: string) {
    return this.$http
      .get<IArtObjectDetailsResponseData>(`https://www.rijksmuseum.nl/api/en/collection/${objectNumber}`, {
        params: {
          format: 'json',
          key: '3tYxhQmI',
        },
      })
      .then((response) => response.data.artObject);
  }
}

export const rijksmuseumApiServiceToken = 'rijksmuseumApiService';
export const rijksmuseumApiServiceDeclaration = {
  [rijksmuseumApiServiceToken]: RijksmuseumApiService,
};
