import { RootComponent } from './root.component';
import { SortOrder, defaultSortOrderToken } from '../../values/sort-orders.value';

describe('rootComponent', () => {
  let rootComponent: RootComponent;

  beforeEach(() => {
    rootComponent = new RootComponent(SortOrder.ARTIST_ASC);
  });

  describe('$inject', () => {
    it('should return list of dependencies', () => {
      expect(RootComponent.$inject).toEqual([defaultSortOrderToken]);
    });
  });

  describe('onSearch', () => {
    beforeEach(() => {
      rootComponent.currentPage = 42;

      rootComponent.onSearch({
        searchQuery: 'hello',
      });
    });

    it('should save searchQuery from event', () => {
      expect(rootComponent.searchQuery).toBe('hello');
    });

    it('should set current page to 1', () => {
      expect(rootComponent.currentPage).toBe(1);
    });
  });

  describe('onSelect', () => {
    beforeEach(() => {
      rootComponent.onSelect({
        objectNumber: 'qwe123',
      });
    });

    it('should save selected art object number from event', () => {
      expect(rootComponent.selectedArtObjectNumber).toBe('qwe123');
    });
  });

  describe('onPageChange', () => {
    beforeEach(() => {
      rootComponent.onPageChange({
        newCurrentPage: 42,
      });
    });

    it('should save current page from event', () => {
      expect(rootComponent.currentPage).toBe(42);
    });
  });

  describe('onPageSizeChange', () => {
    beforeEach(() => {
      rootComponent.onPageSizeChange({
        newPageSize: 100,
      });
    });

    it('should save current page from event', () => {
      expect(rootComponent.pageSize).toBe(100);
    });
  });
});
