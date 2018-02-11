import { Subject } from 'rxjs/Subject';

import {
  RijksmuseumApiService,
  IArtObjectsListResponseData,
  IArtObjectDetailsResponseData,
  IArtObjectDetails,
} from './rijksmuseum-api.service';
import { SortOrder, defaultSortOrderToken } from '../../values/sort-orders.value';

describe('rijksmuseumApiService', () => {
  let rijksmuseumApiService: RijksmuseumApiService;
  let httpClient: {
    get: jasmine.Spy,
  };
  let httpClientGetSubject: Subject<any>;

  beforeEach(() => {
    httpClient = {
      get: jasmine.createSpy(),
    };

    httpClientGetSubject = new Subject();
    httpClient.get.and.returnValue(httpClientGetSubject.asObservable());
    rijksmuseumApiService = new RijksmuseumApiService(httpClient as any, SortOrder.ARTIST_ASC);
  });

  describe('getList', () => {
    let getListResult: Promise<IArtObjectsListResponseData>;

    describe('when all params are passed', () => {
      beforeEach(() => {
        getListResult = rijksmuseumApiService.getList({
          searchQuery: 'some search query',
          sortOrder: SortOrder.RELEVANCE,
          page: 23,
          pageSize: 5,
        });
      });

      it('should make get request for collection with passed params', () => {
        expect(httpClient.get).toHaveBeenCalledWith('https://www.rijksmuseum.nl/api/en/collection', {
          params: {
            format: 'json',
            key: '3tYxhQmI',
            q: 'some search query',
            s: SortOrder.RELEVANCE,
            ps: '5',
            p: '23',
          },
        });
      });

      describe('when get request is done', () => {
        let artObjectsListResponseData: IArtObjectsListResponseData;

        beforeEach(() => {
          artObjectsListResponseData = {
            artObjects: [
              { objectNumber: 'abc123', title: 'Art #1' },
              { objectNumber: 'bcd345', title: 'Art #2' },
            ],
            count: 2,
          };

          httpClientGetSubject.next(artObjectsListResponseData);
          httpClientGetSubject.complete();
        });

        describe('returned value', () => {
          it('should be promise resolved by response\'s data', (done) => {
            getListResult.then((value) => {
              expect(value).toEqual(artObjectsListResponseData);
            }).then(done, done.fail);
          });
        });
      });
    });

    describe('when params are not passed', () => {
      beforeEach(() => {
        getListResult = rijksmuseumApiService.getList();
      });

      it('should make get request for collection with passed params', () => {
        expect(httpClient.get).toHaveBeenCalledWith('https://www.rijksmuseum.nl/api/en/collection', {
          params: {
            format: 'json',
            key: '3tYxhQmI',
            q: '',
            s: SortOrder.ARTIST_ASC,
            ps: '10',
            p: '1',
          },
        });
      });

      describe('when get request is done', () => {
        let artObjectsListResponseData: IArtObjectsListResponseData;

        beforeEach(() => {
          artObjectsListResponseData = {
            artObjects: [
              { objectNumber: 'abc123', title: 'Art #1' },
              { objectNumber: 'bcd345', title: 'Art #2' },
            ],
            count: 2,
          };

          httpClientGetSubject.next(artObjectsListResponseData);
          httpClientGetSubject.complete();
        });

        describe('returned value', () => {
          it('should be promise resolved by response\'s data', (done) => {
            getListResult.then((value) => {
              expect(value).toEqual(artObjectsListResponseData);
            }).then(done, done.fail);
          });
        });
      });
    });
  });

  describe('getDetails', () => {
    let getDetailsResult: Promise<IArtObjectDetails>;

    beforeEach(() => {
      getDetailsResult = rijksmuseumApiService.getDetails('abc123');
    });

    it('should make get request for details', () => {
      expect(httpClient.get).toHaveBeenCalledWith('https://www.rijksmuseum.nl/api/en/collection/abc123', {
        params: {
          format: 'json',
          key: '3tYxhQmI',
        },
      });
    });

    describe('when details request is done', () => {
      let artObjectDetailsResponseData: IArtObjectDetailsResponseData;

      beforeEach(() => {
        artObjectDetailsResponseData = {
          artObject: {
            longTitle: 'very long title',
            description: 'nice art object',
            webImage: {
              url: '...',
            },
          },
        };

        httpClientGetSubject.next(artObjectDetailsResponseData);
        httpClientGetSubject.complete();
      });

      describe('returned value', () => {
        it('should be promise resolved by response\'s data', (done) => {
          getDetailsResult.then((value) => {
            expect(value).toEqual(artObjectDetailsResponseData);
          }).then(done, done.fail);
        });
      });
    });
  });
});
