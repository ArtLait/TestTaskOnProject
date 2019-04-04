import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUsersComponent } from './search-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PreviousRouteService } from 'src/app/core/services/previousRoute.service';

const routes: Routes = [
  {
    path: '',
    component: SearchUsersComponent
  },
  {
    path: 'user/:name',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PreviousRouteService]
})
export class SearchUsersRoutingModule {}