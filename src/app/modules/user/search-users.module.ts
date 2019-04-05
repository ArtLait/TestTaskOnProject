import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchUsersComponent } from './search-users.component';
import { SearchUsersRoutingModule } from './search-users.routing-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {PaginatorModule} from 'primeng/paginator';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {DataViewModule} from 'primeng/dataview';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolverService } from './user-detail/user-detail.resolver';
import {PaginatorComponent} from '../../shared/components/paginator/paginator.component';

@NgModule({
  declarations: [
    SearchUsersComponent,
    UserDetailComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    SearchUsersRoutingModule,
    DataViewModule,
    MessageModule
  ],
  providers: [UserDetailResolverService]
})
export class SearchUsersModule { }
