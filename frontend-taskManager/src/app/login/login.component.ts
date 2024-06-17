import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';


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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      password: '',
      rememberMe: false
    });
  }

  onSubmit() {
    const { email, password } = this.myForm.value; // Destructure email and password from form value
    console.log( { email, password });
   const result =  this._authService.login(email, password ).subscribe(
      response => {
        // Assuming setToken function is correct in AuthService
        console.log(response)
        
          this._authService.setToken(response.jwtToken);
          this.router.navigate(['/homepage']);
      },
      error => {
        alert('Login failed');
      }
    );
    if(result){
      this.loginEvent.emit(true)
    }else{
      this.loginEvent.emit(false)
    }
  }
}
