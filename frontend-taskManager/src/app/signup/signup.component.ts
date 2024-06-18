import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  roles: string[] = ['Admin', 'User'];
  constructor(private fb: FormBuilder, private userService: UserService, private toastr : ToastrService, private router : Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: ['']
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(
        (response : any) => {
          this.toastr.info('User created successfully', 'Success!!');
          console.log('User created successfully', response);
          this.router.navigate(['/login'])
        },
        (error : any) => {
          this.toastr.info('Error creating user', 'Sign In Error!!');
          console.error('Error creating user', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}