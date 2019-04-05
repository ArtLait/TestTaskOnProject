import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUsersComponent } from './search-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolverService } from './user-detail/user-detail.resolver';
import {SearchUsersGuard} from '../../core/guards/search-users.guard';

const routes: Routes = [
  {
    path: '',
    component: SearchUsersComponent,
    canActivate: [SearchUsersGuard]
  },
  {
    path: 'user/:name',
    component: UserDetailComponent,
    resolve: {
      userDetail: UserDetailResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SearchUsersRoutingModule {}
