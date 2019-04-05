
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router/src';
import {EMPTY, Observable, of} from 'rxjs';
import { SearchUsersService } from 'src/app/core/http/search-users.service';
import { UserDetail } from 'src/app/shared/User';
import {catchError} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class UserDetailResolverService implements Resolve<UserDetail> {
  constructor(private searchService: SearchUsersService,
              private notifier: NotifierService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDetail> | Observable<never> {
    const name = route.paramMap.get('name');

    const cashed = this.searchService.cashedUsersDetail[name];
    if (cashed) { return of(cashed); }
    return this.searchService.getUserDetail(name)
      .pipe(catchError((err) => {
        this.notifier.notify('error', 'Data is not loaded!');
        return EMPTY;
      }));
  }
}
