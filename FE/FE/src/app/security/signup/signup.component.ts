import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  // @ts-ignore
  const birthday = new Date(control.get('birthDay').value).getTime();
  const dateNow = new Date().getTime();
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000 || dateNow - birthday > 100 * 365 * 24 * 60 * 60 * 1000) {
    return {checkBirthDay: true};
  } else {
    return null;
  }
};

export const reConfirmPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.touched && password.value !== confirmPassword.value) {
    return {reConfirmPass: true};
  } else {
    return null;
  }
};
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// @ts-ignore
  rfAddUser: FormGroup;

  data1: any = {
    message: 'nousername'
  };
  data2: any = {
    message: 'noemail'
  };
  data3: any = {
    message: 'yes'
  };

  status = '';

  constructor(private userService: UserService,
              private builder: FormBuilder,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createUser();
  }

  createUser(): void {
    this.rfAddUser = this.builder.group({
        name: ['', [Validators.required,
          Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKL' +
            'MNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ]' +
            '[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]' +
            '+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ]' +
            '[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+' +
            '(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ]' +
            '[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$'),
          Validators.maxLength(50),
          Validators.minLength(5)]],
        birthDay: ['', [Validators.required]],
        email: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
        address: ['', Validators.required],
        userName: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required]]
      }, {validators: [checkBirthDay, reConfirmPass]}
    );
  }

  create(): void {
    if (this.rfAddUser?.valid) {
      this.userService.createUser(this.rfAddUser?.value).subscribe(
        data => {
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data1)) {
            this.toast.error('Username already exists');
          }
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data2)) {
            this.toast.error('Email already exists');
          }
          // tslint:disable-next-line:triple-equals
          if (JSON.stringify(data) == JSON.stringify(this.data3)) {
            this.status = 'Sign up Successful';
            this.toast.success('Sign up Successful');
            this.router.navigateByUrl('/login');
            this.resetFormAndData();
          }
        }
      );
    }
  }

  resetFormAndData(): void {
    this.ngOnInit();
  }

  checkEmail(email: string) {
    this.userService.checkEmail(email).subscribe(
      next => {
        if (next == true) {
          // @ts-ignore
          this.rfAddUser.controls.email.setErrors({'invalidEmail': true});
        }
      }
    );
  }

  checkUserName(userName: string) {
    this.userService.checkUserName(userName).subscribe(
      next => {
        if (next == true) {
          // @ts-ignore
          this.rfAddUser.controls.userName.setErrors({'invalidUserName': true});
        }
      }
    );
  }
}
