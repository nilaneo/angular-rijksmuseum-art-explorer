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
  });
});
