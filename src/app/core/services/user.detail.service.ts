import { Injectable } from "@angular/core";
import { UserDetail } from "src/app/shared/User";
import { SearchUsersService } from "../http/search-users.service";
import { NotifierService } from "angular-notifier";

@Injectable({providedIn: 'root'})
export class UserService {
    saved: boolean = false;
    changed: boolean = false;

    constructor(private searchService: SearchUsersService, private notifier: NotifierService) {}
    
    getUserDetail(name: string): UserDetail {
        return this.searchService.cashedUsersDetail[name];
    }

    showAlertAboutUnsavedChanges() {
        if (this.changed && !this.saved) {
            this.notifier.notify('error', 'You lost unsaved data!'); 
        }
    }
}