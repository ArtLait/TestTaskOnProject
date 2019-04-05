import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import {UserService} from '../services/user.detail.service';
import {NotifierService} from 'angular-notifier';
import notifiaction from '../../configs/notifiaction.config';

@Injectable({providedIn: 'root'})
export class SearchUsersGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private notification: NotifierService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canLeaveThePage = this.userService.canLeavePage();
    if (!canLeaveThePage) { this.notification.notify('error', notifiaction.messages.exitWithoutChanges); }
    return canLeaveThePage;
  }
}
