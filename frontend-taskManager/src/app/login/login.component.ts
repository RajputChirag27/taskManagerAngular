import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm!: FormGroup;
  isLoggedIn : boolean = false;
  @Output() loginEvent = new EventEmitter<any>();

  constructor(
    private _authService: AuthService,
    private router: Router,
    private toastr : ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      rememberMe: [false, Validators.required],
    });
  }

  onSubmit() {
    const { email, password, rememberMe } = this.myForm.value; // Destructure email and password from form value
    console.log( { email, password, rememberMe });
      const result =  this._authService.login(email, password ).subscribe(
      response => {
        // Assuming setToken function is correct in AuthService
        console.log(response)
        this.toastr.info(`${response.message}`, `Welcome!`,{
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
          this._authService.setToken(response.jwtToken);
          this.router.navigate(['/homepage']);
      },
      error => {
        // console.log(error.error.error)
        this.toastr.error(`${error.error.error}`, `Error!`,{
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      }
    );
    if(result){
      this.loginEvent.emit(true)
    }else{
      this.loginEvent.emit(false)
    }
  }
}
