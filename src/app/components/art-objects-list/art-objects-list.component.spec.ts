import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ArtObjectsListComponent } from './art-objects-list.component';
import { IArtObjectsListResponseData } from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import { SortOrder } from '../../values/sort-orders.value';

describe('artObjectsListComponent', () => {
  let artObjectsListComponent: ArtObjectsListComponent;
  let rijksmuseumApiService: { getList: jasmine.Spy };
  let getListSubject: ReplaySubject<IArtObjectsListResponseData>;

  beforeEach(() => {
    rijksmuseumApiService = {
      getList: jasmine.createSpy(),
    };

    getListSubject = new ReplaySubject();

    rijksmuseumApiService.getList
      .and.returnValue(getListSubject.asObservable());

    artObjectsListComponent = new ArtObjectsListComponent(rijksmuseumApiService as any);
    spyOn(artObjectsListComponent.listLoad, 'emit');
  });

  describe('isSelected', () => {
    beforeEach(() => {
      artObjectsListComponent.selectedArtObjectNumber = 'abc123';
    });

    it('should return true if passed art object is selected', () => {
      const selectedArtObject = {
        objectNumber: 'abc123',
        title: 'some title',
      };

      expect(artObjectsListComponent.isSelected(selectedArtObject)).toBe(true);
    });

    it('should return false if passed art object is not selected', () => {
      const notSelectedArtObject = {
        objectNumber: 'foo123',
        title: 'some title',
      };

      expect(artObjectsListComponent.isSelected(notSelectedArtObject)).toBe(false);
    });
  });

  describe('selectArtObject', () => {
    beforeEach(() => {
      const artObject = {
        objectNumber: 'abc123',
        title: 'some title',
      };

      spyOn(artObjectsListComponent.select, 'emit');

      artObjectsListComponent.selectArtObject(artObject);
    });

    it('should store selected art object number', () => {
      expect(artObjectsListComponent.selectedArtObjectNumber).toBe('abc123');
    });

    it('should emit select event', () => {
      expect(artObjectsListComponent.select.emit)
        .toHaveBeenCalledWith({ objectNumber: 'abc123' });
    });
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      artObjectsListComponent.searchQuery = 'some search query';
      artObjectsListComponent.sortOrder = SortOrder.CHRONOLOGIC;
      artObjectsListComponent.page = 1;
      artObjectsListComponent.pageSize = 10;
    });

    describe('when some of list params have been changed', () => {
      beforeEach(() => {
        const changes = {
          searchQuery: {
            isFirstChange: () => false,
            firstChange: false,
            previousValue: 'some search query',
            currentValue: 'new search query',
          },
        };
        artObjectsListComponent.searchQuery = changes.searchQuery.currentValue;

        artObjectsListComponent.ngOnChanges(changes);
      });

      it('should load new list', () => {
        expect(rijksmuseumApiService.getList).toHaveBeenCalledWith({
          searchQuery: 'new search query',
          sortOrder: SortOrder.CHRONOLOGIC,
          page: 1,
          pageSize: 10,
        });
      });

      describe('when a new list is loaded', () => {
        let artObjectsListResponseData: IArtObjectsListResponseData;

        beforeEach(() => {
          artObjectsListResponseData = {
            artObjects: [
              { objectNumber: 'abc123', title: 'Art #1' },
              { objectNumber: 'bcd234', title: 'Art #2' },
            ],
            count: 2,
          };

          getListSubject.next(artObjectsListResponseData);
          getListSubject.complete();
        });

        it('should store art objects from result', (done: DoneFn) => {
          expect(artObjectsListComponent.artObjects$).toBeDefined();

          if (artObjectsListComponent.artObjects$) {
            artObjectsListComponent.artObjects$.subscribe((artObjects) => {
              expect(artObjects).toEqual([
                { objectNumber: 'abc123', title: 'Art #1' },
                { objectNumber: 'bcd234', title: 'Art #2' },
              ]);
              done();
            });
          } else {
            done();
          }
        });

        it('should emit listLoad event', (done: DoneFn) => {
          expect(artObjectsListComponent.artObjects$).toBeDefined();

          if (artObjectsListComponent.artObjects$) {
            artObjectsListComponent.artObjects$.subscribe(() => {
              expect(artObjectsListComponent.listLoad.emit)
                .toHaveBeenCalledWith({ artObjectsListResponseData });
              done();
            });
          } else {
            done();
          }
        });
      });
    });

    describe('when list params have not been changed', () => {
      beforeEach(() => {
        artObjectsListComponent.ngOnChanges({});
      });

      it('should not load new list', () => {
        expect(rijksmuseumApiService.getList).not.toHaveBeenCalled();
      });
    });
  });
});
