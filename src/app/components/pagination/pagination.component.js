import template from './pagination.component.html';
import './pagination.component.css';

export class PaginationComponent {
  constructor() {
    this.pageSizeOptions = [5, 10, 15, 20, 25];
  }

  $onInit() {
    this.newPageSize = this.pageSize;
  }

  onClickPrevious() {
    this.goToPage(this.currentPage - 1);
  }

  onClickNext() {
    this.goToPage(this.currentPage + 1);
  }

  goToPage(newCurrentPage) {
    this.onPageChange({
      $event: {
        newCurrentPage
      }
    });
  }

  onChoosePageSize() {
    this.onPageSizeChange({
      $event: {
        newPageSize: this.newPageSize
      }
    });
  }
}

export const paginationDeclaration = {
  rmPagination: {
    bindings: {
      currentPage: '<',
      totalPages: '<',
      pageSize: '<',
      onPageChange: '&',
      onPageSizeChange: '&'
    },
    controller: PaginationComponent,
    template
  }
};
