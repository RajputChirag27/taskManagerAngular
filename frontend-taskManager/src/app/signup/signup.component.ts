import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  roles: string[] = ['Admin', 'User'];
  constructor(private fb: FormBuilder, private userService: UserService) {}

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
          console.log('User created successfully', response);
        },
        (error : any) => {
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