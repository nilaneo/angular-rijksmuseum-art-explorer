import { PaginationComponent } from './pagination.component';

describe('paginationComponent', () => {
  let paginationComponent: PaginationComponent;

  beforeEach(() => {
    paginationComponent = new PaginationComponent();
  });

  describe('ngOnInit', () => {
    it('should set newPageSize if pageSize is defined', () => {
      paginationComponent.pageSize = 42;

      paginationComponent.ngOnInit();

      expect(paginationComponent.newPageSize).toBe(42);
    });

    it('should not change newPageSize if pageSize is undefined', () => {
      const previousNewPageSize = paginationComponent.newPageSize;
      paginationComponent.pageSize = undefined;

      paginationComponent.ngOnInit();

      expect(paginationComponent.newPageSize).toBe(previousNewPageSize);
    });
  });

  describe('onClickPrevious', () => {
    it('should got to previous page if current page is defined', () => {
      paginationComponent.currentPage = 42;
      spyOn(paginationComponent.pageChange, 'emit');

      paginationComponent.onClickPrevious();

      expect(paginationComponent.pageChange.emit)
        .toHaveBeenCalledWith({ newCurrentPage: 41 });
    });

    it('should do nothing if current page is undefined', () => {
      paginationComponent.currentPage = undefined;
      spyOn(paginationComponent.pageChange, 'emit');

      paginationComponent.onClickPrevious();

      expect(paginationComponent.pageChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('onClickNext', () => {
    it('should got to previous page if current page is defined', () => {
      paginationComponent.currentPage = 42;
      spyOn(paginationComponent.pageChange, 'emit');

      paginationComponent.onClickNext();

      expect(paginationComponent.pageChange.emit)
        .toHaveBeenCalledWith({ newCurrentPage: 43 });
    });

    it('should do nothing if current page is undefined', () => {
      paginationComponent.currentPage = undefined;
      spyOn(paginationComponent.pageChange, 'emit');

      paginationComponent.onClickNext();

      expect(paginationComponent.pageChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('onChoosePageSize', () => {
    it('should emit pageSizeChange event', () => {
      paginationComponent.newPageSize = 25;
      spyOn(paginationComponent.pageSizeChange, 'emit');

      paginationComponent.onChoosePageSize();

      expect(paginationComponent.pageSizeChange.emit)
        .toHaveBeenCalledWith({ newPageSize: 25 });
    });
  });
});
