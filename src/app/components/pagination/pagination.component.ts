import template from './pagination.component.html';
import './pagination.component.css';

export interface OnPageChangeEvent {
  newCurrentPage: number
}

export interface OnPageSizeChangeEvent {
  newPageSize: number
}

export class PaginationComponent {
  newPageSize = 1;
  pageSizeOptions = [5, 10, 15, 20, 25];
  currentPage: number | undefined;
  totalPages: number | undefined;
  pageSize: number | undefined;
  onPageChange: (data: { $event: OnPageChangeEvent }) => void;
  onPageSizeChange: (data: { $event: OnPageSizeChangeEvent }) => void;

  $onInit() {
    if (this.pageSize !== undefined) {
      this.newPageSize = this.pageSize;
    }
  }

  onClickPrevious() {
    if (this.currentPage !== undefined) {
      this.goToPage(this.currentPage - 1);
    }
  }

  onClickNext() {
    if (this.currentPage !== undefined) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPage(newCurrentPage: number) {
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
