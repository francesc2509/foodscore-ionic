import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from '../services';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/shared/models';
import { PictureService } from 'src/app/shared/services/picture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;


  private pairMatch = (controlName1: string, controlName2: string) => {
    return (control: AbstractControl) => {
      const control1 = control.get(controlName1);
      const control2 = control.get(controlName2);

      if (!control1 || !control2) { return null; }
      return control1.value === control2.value ? null : { nomatch: true };
    };
  }

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private pictureService: PictureService,
    private router: NavController
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        email2: ['', [Validators.required, Validators.email]],
      }, { validator: this.pairMatch('email', 'email2') }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        password2: ['', [Validators.required]],
      }, { validator: this.pairMatch('password', 'password2') }),
      avatar: ['', [Validators.required]],
    });
    console.log(this.registerForm.get('avatar'));
  }

  submit(event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const user = <User>{
        avatar: this.registerForm.get('avatar').value,
        name: this.registerForm.get('name').value,
        email: this.registerForm.get('emailGroup').get('email').value,
        password: this.registerForm.get('passwordGroup').get('password').value,
      };

      this.service.register(user).subscribe(
        data => {
          this.router.navigateRoot(['/auth/login']);
        },
        err => console.log(err)
      );
    }
  }

  setAvatar(event: string) {
    this.registerForm.get('avatar').setValue(event);
  }
}
