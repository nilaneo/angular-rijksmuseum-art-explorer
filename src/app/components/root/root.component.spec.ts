import { RootComponent } from './root.component';
import { SortOrder, defaultSortOrderToken } from '../../values/sort-orders.value';

describe('rootComponent', () => {
  let rootComponent: RootComponent;

  beforeEach(() => {
    rootComponent = new RootComponent(SortOrder.ARTIST_ASC);
  });

  it('should save default sort order as current', () => {
    expect(rootComponent.sortOrder).toBe(SortOrder.ARTIST_ASC);
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

  describe('onSortOrderChange', () => {
    describe('when new sort order is undefined', () => {
      beforeEach(() => {
        rootComponent.currentPage = 42;
        rootComponent.sortOrder = SortOrder.RELEVANCE;
        rootComponent.onSortOrderChange({
          newSortOrder: undefined,
        });
      });

      it('should set sort order to default', () => {
        expect(rootComponent.sortOrder).toBe(SortOrder.ARTIST_ASC);
      });

      it('should set current page to 1', () => {
        expect(rootComponent.currentPage).toBe(1);
      });
    });

    describe('when new sort order is not undefined', () => {
      beforeEach(() => {
        rootComponent.currentPage = 42;
        rootComponent.onSortOrderChange({
          newSortOrder: SortOrder.CHRONOLOGIC,
        });
      });

      it('should save sort order from event', () => {
        expect(rootComponent.sortOrder).toBe(SortOrder.CHRONOLOGIC);
      });

      it('should set current page to 1', () => {
        expect(rootComponent.currentPage).toBe(1);
      });
    });
  });

  describe('onListLoad', () => {
    describe('when count is a multiple of page size', () => {
      beforeEach(() => {
        rootComponent.pageSize = 10;
        rootComponent.onListLoad({
          artObjectsListResponseData: {
            artObjects: [],
            count: 20,
          },
        });
      });

      it('should calculate and save total pages', () => {
        expect(rootComponent.totalPages).toBe(2);
      });
    });

    describe('when last page is not full', () => {
      beforeEach(() => {
        rootComponent.pageSize = 10;
        rootComponent.onListLoad({
          artObjectsListResponseData: {
            artObjects: [],
            count: 24,
          },
        });
      });

      it('should calculate and save total pages', () => {
        expect(rootComponent.totalPages).toBe(3);
      });
    });

    describe('when count is 0', () => {
      beforeEach(() => {
        rootComponent.pageSize = 10;
        rootComponent.onListLoad({
          artObjectsListResponseData: {
            artObjects: [],
            count: 0,
          },
        });
      });

      it('should calculate and save total pages', () => {
        expect(rootComponent.totalPages).toBe(0);
      });
    });
  });
});
