import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from '../../../core/services/user.detail.service';

import { FormBuilder, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserDetail } from 'src/app/shared/User';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetailForm = this.fb.group({
    url: ['', Validators.required],
    firstName: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Z](\\w+)")])],
    lastName: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Z](\\w+)")])],
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^((?!w).)*$")])]
  });
  
  userDetail: UserDetail;
  defaultImgPath: string = './assets/empty.png';
  changed: boolean = false;
  saved: boolean = false;
  error: string = '';
  error2: string = '13123213';
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder
              ) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.userDetail = this.userService.getUserDetail(name);
    this.userDetailForm.valueChanges.subscribe(res => {
      this.userService.changed = true;
      this.getFormValidationErrors();
    })
  }

  getFormValidationErrors() {
    Object.keys(this.userDetailForm.controls).some(key => {
  
    const controlErrors: ValidationErrors = this.userDetailForm.get(key).errors;
    if (controlErrors != null) {
          this.error = `${key}: ${Object.keys(controlErrors)[0]}`;
          return true;
        }
      });
    }

  onSubmit() {
    this.userService.saved = true;
  }

  onBlur(url: string) {
    if (this.userDetail) this.userDetail.avatar_url = url;
  }

  back() {
    
    this.userService.showAlertAboutUnsavedChanges();
    this.router.navigate(['/']);
  }
}
