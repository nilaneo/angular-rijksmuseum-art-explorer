import template from './pagination.component.html';
import './pagination.component.css';

export interface IOnPageChangeEvent {
  newCurrentPage: number;
}

export interface IOnPageSizeChangeEvent {
  newPageSize: number;
}

export class PaginationComponent {
  public newPageSize = 1;
  public pageSizeOptions = [5, 10, 15, 20, 25];
  public currentPage: number | undefined;
  public totalPages: number | undefined;
  public pageSize: number | undefined;
  public onPageChange: (data: { $event: IOnPageChangeEvent }) => void;
  public onPageSizeChange: (data: { $event: IOnPageSizeChangeEvent }) => void;

  public $onInit() {
    if (this.pageSize !== undefined) {
      this.newPageSize = this.pageSize;
    }
  }

  public onClickPrevious() {
    if (this.currentPage !== undefined) {
      this.goToPage(this.currentPage - 1);
    }
  }

  public onClickNext() {
    if (this.currentPage !== undefined) {
      this.goToPage(this.currentPage + 1);
    }
  }

  public onChoosePageSize() {
    this.onPageSizeChange({
      $event: {
        newPageSize: this.newPageSize,
      },
    });
  }

  private goToPage(newCurrentPage: number) {
    this.onPageChange({
      $event: {
        newCurrentPage,
      },
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
    onPageSizeChange: '&',
  },
  controller: PaginationComponent,
  template,
};
