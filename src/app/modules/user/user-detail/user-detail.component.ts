import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from '../../../core/services/user.detail.service';

import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/shared/User';
import { NotifierService } from 'angular-notifier';
import validators from '../../../configs/validator.config';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetailForm = this.fb.group({
    url: ['', Validators.required],
    firstName: ['', Validators.compose([Validators.required, Validators.pattern(validators.checkForCapitalFirstLetter)])],
    lastName: ['', Validators.compose([Validators.required, Validators.pattern(validators.checkForMissingLetters('w'))])],
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^((?!w).)*$')])]
  });

  userDetail: UserDetail;
  changed = false;
  saved = false;
  error = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder
              ) {}

  ngOnInit() {
    this.route.data.
      subscribe((data: {userDetail: UserDetail}) => {
        this.userDetail = data.userDetail;
        this.initForm(this.userDetail);
      });
    this.userDetailForm.valueChanges.subscribe(res => {
      this.userService.changed = true;
      this.getFormValidationErrors();
    });
  }

  initForm(userDetail: UserDetail) {
    const name = userDetail.name ? userDetail.name.split(' ') : [userDetail.login];
    this.userDetailForm.controls['url'].setValue(userDetail.avatar_url);
    this.userDetailForm.controls['firstName'].setValue(name[0]);
    this.userDetailForm.controls['lastName'].setValue(name[1]);
    this.userDetailForm.controls['email'].setValue(userDetail.email);
    this.getFormValidationErrors();
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
    this.back();
  }

  onBlur(url: string) {
    if (this.userDetail) { this.userDetail.avatar_url = url; }
  }

  back() {
    this.router.navigate(['/']);
  }
}
