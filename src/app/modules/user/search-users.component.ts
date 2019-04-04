import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserDetail, User } from 'src/app/shared/User';
import { SearchUsersService } from 'src/app/core/http/search-users.service';
import { UserService } from 'src/app/core/services/user.detail.service';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/core/services/previousRoute.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  @ViewChild('queryInput')
  queryInput: ElementRef;
  query: string = '';
  users: UserDetail[];
  countOfRows: number = 10;
  page: number = 0;
  defaultImgPath: string = './assets/empty.png';
  loading: boolean = false;
  currentUrl: string;
  previousUrl: string;

  constructor(
    private userService: SearchUsersService,
    private userDetailService: UserService,
    private router: Router,
    private previousRoute: PreviousRouteService,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.queryInput.nativeElement.focus();
    if (this.previousRoute.getPreviousUrl().slice(0, 6) == '/user/') {
      this.userDetailService.showAlertAboutUnsavedChanges();
    }

    const lastIdSearch = this.userService.lastIdSearch;

    if (lastIdSearch)  {
      this.query = this.userService.lastNameSearch;
      this.users = this.userService.cashedUsersDetailArr[lastIdSearch];
    }
  }

  search() {
    if (this.query.length === 0) return;
    this.loading = true;
    this.userService.getUsersDetail(this.query, undefined, this.page + 1).subscribe((usersDetail: UserDetail[])=>{
      this.users = usersDetail;
      this.loading = false;
    },
    err => {
      this.notifier.notify('error', err);
    });
  }

  paginate(event) {
    this.page = event.page;
    this.search();
  }
}