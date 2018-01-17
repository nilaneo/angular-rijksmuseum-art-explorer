import template from './pagination.component.html';
import './pagination.component.css';

export class PaginationComponent {
  newPageSize;
  pageSizeOptions = [5, 10, 15, 20, 25];
  currentPage;
  totalPages;
  pageSize;
  onPageChange;
  onPageSizeChange;

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

export const paginationComponentName = 'rmPagination';
export const paginationComponentOptions = {
  bindings: {
    currentPage: '<',
    totalPages: '<',
    pageSize: '<',
    onPageChange: '&',
    onPageSizeChange: '&'
  },
  controller: PaginationComponent,
  template
};
