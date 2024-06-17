import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn : boolean = false;
  constructor(private readonly _authService : AuthService, private router : Router) {
    this.isLoggedIn = this._authService.isLoggedIn();
   }

   

   logout(){
    this._authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login'])
   }
}
