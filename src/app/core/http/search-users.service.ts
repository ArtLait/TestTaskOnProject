import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UsersResponse, UserDetail } from '../../shared/User';
import { NotifierService } from 'angular-notifier';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs/internal/observable/of';

@Injectable({providedIn: 'root'})
export class SearchUsersService {
    cashedUsersDetail: any = {};
    cashedUsersDetailArr: any = {};
    lastIdSearch: string;
    lastNameSearch: string;
    lastPage: number;

    constructor(private http: HttpClient, private notifier: NotifierService) {}

    getUsers(userName, perPage = 10, page = 1): Observable<User[]> {
        return this.http.get<User[]>(`${environment.host}search/users?q=${userName}&per_page=${perPage}&page=${page}`)
        .pipe(map((res: UsersResponse) => (res.items)));
    }

    getUsersDetail(userName, perPage = 10, page = 1): Observable<UserDetail[]> {
      const usersDetail$ = new Subject<UserDetail[]>();
        this.lastNameSearch = userName;
        this.lastIdSearch = userName + perPage + page;
        this.lastPage = page;
        localStorage.setItem('lastQuery', this.lastNameSearch);
        const cashed = this.cashedUsersDetailArr[this.lastIdSearch];
        if (cashed) {
          return of(cashed);
        } else {
          this.getUsers(userName, perPage, page).subscribe((users: User[]) => {
            const userDetailsOf = [];
            users.forEach((item) => {
                userDetailsOf.push(this.getUserDetail(item.login));
            });
            forkJoin(...userDetailsOf).subscribe((usersDetail: UserDetail[]) => {
                this.casheUsersDetail(usersDetail, userName, perPage, page);
                usersDetail$.next(usersDetail);
            },
            (err) => {
                const message = err && err.message;
                this.notifier.notify('error', message);
                const weakUsers: UserDetail[] = <UserDetail[]>users;
                usersDetail$.next(weakUsers);
            });
            }, (err) => {
              this.notifier.notify('error', err && err.message);
            });
        }
        return usersDetail$;
    }

    casheUsersDetail(usersDetail: UserDetail[], name: string, perPage: number, page: number) {
        this.cashedUsersDetailArr[this.lastIdSearch] = usersDetail;
        usersDetail.forEach((userDetail: UserDetail) => {
            if (userDetail.login) { this.cashedUsersDetail[userDetail.login] = userDetail; };
        });
    }

    getUserDetail(userName): Observable<UserDetail> {
        return this.http.get<UserDetail>(`${environment.host}users/${userName}`);
    }
}
