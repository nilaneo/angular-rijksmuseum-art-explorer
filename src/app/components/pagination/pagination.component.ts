import template from './pagination.component.html';
import './pagination.component.css';

export interface OnPageChangeEvent {
  newCurrentPage: number
}

export interface OnPageSizeChangeEvent {
  newPageSize: number
}

export class PaginationComponent {
  newPageSize: number;
  pageSizeOptions = [5, 10, 15, 20, 25];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (data: { $event: OnPageChangeEvent }) => void;
  onPageSizeChange: (data: { $event: OnPageSizeChangeEvent }) => void;

  $onInit() {
    this.newPageSize = this.pageSize;
  }

  onClickPrevious() {
    this.goToPage(this.currentPage - 1);
  }

  onClickNext() {
    this.goToPage(this.currentPage + 1);
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
