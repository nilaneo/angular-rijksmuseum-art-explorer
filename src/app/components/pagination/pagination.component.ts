import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import template from './pagination.component.html';
import './pagination.component.css';

export interface IOnPageChangeEvent {
  newCurrentPage: number;
}

export interface IOnPageSizeChangeEvent {
  newPageSize: number;
}

@Component({
  selector: 'rm-pagination',
  template,
})
export class PaginationComponent implements OnInit {
  public newPageSize = 1;
  public pageSizeOptions = [5, 10, 15, 20, 25];
  @Input() public currentPage: number | undefined;
  @Input() public totalPages: number | undefined;
  @Input() public pageSize: number | undefined;
  @Output() public pageChange = new EventEmitter<IOnPageChangeEvent>();
  @Output() public pageSizeChange =  new EventEmitter<IOnPageSizeChangeEvent>();

  public ngOnInit() {
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
    this.pageSizeChange.emit({ newPageSize: this.newPageSize });
  }

  private goToPage(newCurrentPage: number) {
    this.pageChange.emit({ newCurrentPage });
  }
}
