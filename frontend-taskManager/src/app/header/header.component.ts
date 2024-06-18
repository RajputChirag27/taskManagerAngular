import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedInn : boolean = false;
  constructor(private readonly _authService : AuthService, private router : Router, private toastr : ToastrService) {
     this._authService.isLoggedIn().subscribe((res : any) =>{
      this.isLoggedInn = res;
    });
   }

  //  isLoggedIn(){
  //   this.isLoggedInn = this._authService.isLoggedIn();
  //  }

   logout(){
    this._authService.logout();
    this.isLoggedInn = false;
    this.toastr.info(`See you next time!!`, `Logged Out!`,{
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
    this.router.navigate(['login'])
   }
}
