import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(
    private _token: AuthService,
    private _locationService: Location,
  ) {} 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this._token.getToken();
    if (accessToken) {
      this._locationService.back();
      return false;
    } else {
      return true;
    }
  }
}
