import { PaginationComponent } from './pagination.component';

describe('paginationComponent', () => {
  let paginationComponent: PaginationComponent;

  beforeEach(() => {
    paginationComponent = new PaginationComponent();
  });

  describe('$onInit', () => {
    it('should set newPageSize if pageSize is defined', () => {
      paginationComponent.pageSize = 42;

      paginationComponent.$onInit();

      expect(paginationComponent.newPageSize).toBe(42);
    });

    it('should not change newPageSize if pageSize is undefined', () => {
      const previousNewPageSize = paginationComponent.newPageSize;
      paginationComponent.pageSize = undefined;

      paginationComponent.$onInit();

      expect(paginationComponent.newPageSize).toBe(previousNewPageSize);
    });
  });

  describe('onClickPrevious', () => {
    it('should got to previous page if current page is defined', () => {
      paginationComponent.currentPage = 42;
      paginationComponent.onPageChange = jest.fn();

      paginationComponent.onClickPrevious();

      expect(paginationComponent.onPageChange).toHaveBeenCalledWith({
        $event: {
          newCurrentPage: 41,
        },
      });
    });

    it('should do nothing if current page is undefined', () => {
      paginationComponent.currentPage = undefined;
      paginationComponent.onPageChange = jest.fn();

      paginationComponent.onClickPrevious();

      expect(paginationComponent.onPageChange).not.toHaveBeenCalled();
    });
  });

  describe('onClickNext', () => {
    it('should got to previous page if current page is defined', () => {
      paginationComponent.currentPage = 42;
      paginationComponent.onPageChange = jest.fn();

      paginationComponent.onClickNext();

      expect(paginationComponent.onPageChange).toHaveBeenCalledWith({
        $event: {
          newCurrentPage: 43,
        },
      });
    });

    it('should do nothing if current page is undefined', () => {
      paginationComponent.currentPage = undefined;
      paginationComponent.onPageChange = jest.fn();

      paginationComponent.onClickNext();

      expect(paginationComponent.onPageChange).not.toHaveBeenCalled();
    });
  });

  describe('onChoosePageSize', () => {
    it('should pass event to onPageSizeChange', () => {
      paginationComponent.newPageSize = 25;
      paginationComponent.onPageSizeChange = jest.fn();

      paginationComponent.onChoosePageSize();

      expect(paginationComponent.onPageSizeChange).toHaveBeenCalledWith({
        $event: {
          newPageSize: 25,
        },
      });
    });
  });
});
