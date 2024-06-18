import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  result! : any
  constructor(private readonly _userService : UserService) {
  }

  ngOnInit(){
    this._userService.getUserDetails().subscribe((res : any) => {this.result = res.result}, (error : any) =>{
      console.error('Error fetching user profile:', error);
    });
  }
}
