import {Component, Input, OnInit, Output} from '@angular/core';
import {SearchUsersService} from '../../../core/http/search-users.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input('countOfRows')
  countOfRows = 10;
  @Input('pageLinkSize')
  pageLinkSize = 3;
  @Input('currentPage')
  currentPage = 0;
  @Output() loadData = new EventEmitter();
  pages = new Array(this.pageLinkSize);
  get countOfList(): number {
    return Math.floor(this.currentPage / this.pageLinkSize);
  }

  constructor(private search: SearchUsersService) {}
  ngOnInit() {}
  next() {
    const currentPage = this.currentPage + this.pageLinkSize - (this.currentPage % this.pageLinkSize);
    this.loadData.emit(this.currentPage);
    console.log('currentPage', currentPage);
  }
  prev() {
    const currentPage = this.currentPage - this.pageLinkSize - (this.currentPage % this.pageLinkSize);
    this.loadData.emit(currentPage);
    console.log('currentPage', currentPage);
  }
  paginate(i: number) {
    console.log('i', i);
    this.loadData.emit(i);
  }
}
