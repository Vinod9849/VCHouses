import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerationForm: FormGroup;
  user: User;
  userSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private alertyfy: AlertyfyService
  ) {}

  ngOnInit() {
    // this.registerationForm = new FormGroup(
    //   {
    //     userName: new FormControl(null, Validators.required),
    //     mobile: new FormControl(null, [
    //       Validators.required,
    //       Validators.maxLength(10),
    //     ]),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //     password: new FormControl(null, [
    //       Validators.required,
    //       Validators.minLength(8),
    //     ]),
    //     conformPassword: new FormControl(null, [Validators.required]),
    //   },
    //   this.passwordMatchingValidatior
    // );
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        mobile: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        conformPassword: [null, [Validators.required]],
      },
      { Validators: this.passwordMatchingValidatior }
    );
  }

  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }
  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get conformPassword() {
    return this.registerationForm.get('conformPassword') as FormControl;
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('conformPassword').value
      ? null
      : { notmatched: true };
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      //this.user = Object.assign(this.user, this.registerationForm.value);
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertyfy.success('Congrats, you are successfully registered.');
    } else {
      this.alertyfy.error('please enter valid input.');
    }
  }

  userData(): User {
    return (this.user = {
      userName: this.userName.value,
      mobile: this.mobile.value,
      email: this.email.value,
      password: this.password.value,
    });
  }
}
