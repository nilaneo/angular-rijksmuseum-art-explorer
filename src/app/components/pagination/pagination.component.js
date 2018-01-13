import template from './pagination.component.html';
import './pagination.component.css';

export class PaginationComponent {
  onClickPrevious() {
    this.onPageChange({
      $event: {
        newCurrentPage: this.currentPage - 1
      }
    });
  }

  onClickNext() {
    this.onPageChange({
      $event: {
        newCurrentPage: this.currentPage + 1
      }
    });
  }
}

export const paginationDeclaration = {
  rmPagination: {
    bindings: {
      currentPage: '<',
      totalPages: '<',
      onPageChange: '&'
    },
    controller: PaginationComponent,
    template
  }
};
