import { ArtObjectsListComponent } from './art-objects-list.component';
import {
  rijksmuseumApiServiceToken,
  IArtObjectsListResponseData,
} from '../../services/rijksmuseum-api/rijksmuseum-api.service';
import { SortOrder } from '../../values/sort-orders.value';

describe('artObjectsListComponent', () => {
  let artObjectsListComponent: ArtObjectsListComponent;
  let rijksmuseumApiService: { getList: jest.Mock };
  let getListDefer: any;

  beforeEach(() => {
    rijksmuseumApiService = {
      getList: jest.fn(),
    };

    getListDefer = {};
    getListDefer.promise = new Promise((resolve, reject) => {
      getListDefer.resolve = resolve;
      getListDefer.reject = reject;
    });

    rijksmuseumApiService.getList.mockReturnValue(getListDefer.promise);

    artObjectsListComponent = new ArtObjectsListComponent(rijksmuseumApiService as any);
    artObjectsListComponent.onListLoad = jest.fn();
  });

  describe('$inject', () => {
    it('should return list of dependencies', () => {
      expect(ArtObjectsListComponent.$inject).toEqual([rijksmuseumApiServiceToken]);
    });
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

      artObjectsListComponent.onSelect = jest.fn();

      artObjectsListComponent.selectArtObject(artObject);
    });

    it('should store selected art object number', () => {
      expect(artObjectsListComponent.selectedArtObjectNumber).toBe('abc123');
    });

    it('should pass event to onSelect', () => {
      expect(artObjectsListComponent.onSelect).toHaveBeenCalledWith({
        $event: {
          objectNumber: 'abc123',
        },
      });
    });
  });

  describe('$onChanges', () => {
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
            previousValue: 'some search query',
            currentValue: 'new search query',
          },
        };
        artObjectsListComponent.searchQuery = changes.searchQuery.currentValue;

        artObjectsListComponent.$onChanges(changes);
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

          getListDefer.resolve(artObjectsListResponseData);
        });

        it('should store art objects from result', () => {
          expect(artObjectsListComponent.artObjects).toEqual([
            { objectNumber: 'abc123', title: 'Art #1' },
            { objectNumber: 'bcd234', title: 'Art #2' },
          ]);
        });

        it('should pass event to onListLoad', () => {
          expect(artObjectsListComponent.onListLoad).toHaveBeenCalledWith({
            $event: {
              artObjectsListResponseData,
            },
          });
        });
      });
    });

    describe('when list params have not been changed', () => {
      beforeEach(() => {
        artObjectsListComponent.$onChanges({});
      });

      it('should not load new list', () => {
        expect(rijksmuseumApiService.getList).not.toHaveBeenCalled();
      });
    });
  });
});
