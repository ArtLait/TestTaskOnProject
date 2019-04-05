import { Injectable } from '@angular/core';
import { UserDetail } from 'src/app/shared/User';
import { SearchUsersService } from '../http/search-users.service';
import { NotifierService } from 'angular-notifier';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    saved = false;
    changed = false;

  constructor(
      private searchService: SearchUsersService,
      private notifier: NotifierService) {}

  getUserDetail(name: string): Observable<UserDetail> {
      const result$ = new Subject<UserDetail>();
      const cashed = this.searchService.cashedUsersDetail[name];
      if (cashed) {
          result$.next(cashed);
          return result$;
      }
      return this.searchService.getUserDetail('name');
  }

  canLeavePage() {
    return !(this.changed && !this.saved);
  }
}
