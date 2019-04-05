import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserDetail, User } from 'src/app/shared/User';
import { SearchUsersService } from 'src/app/core/http/search-users.service';
import { UserService } from 'src/app/core/services/user.detail.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  @ViewChild('queryInput')
  queryInput: ElementRef;
  query = '';
  users: UserDetail[];
  countOfRows = 10;
  page = 0;
  loading = false;

  constructor(
    private userService: SearchUsersService,
    private userDetailService: UserService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.queryInput.nativeElement.focus();

    const lastIdSearch = this.userService.lastIdSearch;

    if (lastIdSearch)  {
      this.query = this.userService.lastNameSearch;
      this.users = this.userService.cashedUsersDetailArr[lastIdSearch];
    } else {
      const storage = localStorage.getItem('lastQuery');
      this.query = storage ? storage : '';
      if (this.query) { this.search(); }
    }
  }

  search(page = 0) {
    if (this.query.length === 0) { return; }
    this.loading = true;
    this.userService.getUsersDetail(this.query, undefined,  page + 1)
      .subscribe((usersDetail: UserDetail[]) => {
      this.users = usersDetail;
      this.loading = false;
      this.page = page;
    },
    err => {
      this.notifier.notify('error', err);
    });
  }
}
