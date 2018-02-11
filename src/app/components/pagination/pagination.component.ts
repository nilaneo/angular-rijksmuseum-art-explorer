import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IOnPageChangeEvent {
  newCurrentPage: number;
}

export interface IOnPageSizeChangeEvent {
  newPageSize: number;
}

@Component({
  selector: 'rm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  public pageSizeOptions = [5, 10, 15, 20, 25];
  @Input() public currentPage: number | undefined;
  @Input() public totalPages: number | undefined;
  @Input() public pageSize: number | undefined;
  @Output() public pageChange = new EventEmitter<IOnPageChangeEvent>();
  @Output() public pageSizeChange =  new EventEmitter<IOnPageSizeChangeEvent>();

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

  public onChoosePageSize(newPageSize: number) {
    this.pageSizeChange.emit({ newPageSize });
  }

  private goToPage(newCurrentPage: number) {
    this.pageChange.emit({ newCurrentPage });
  }
}
