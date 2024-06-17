import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-taskManager';
  users : any = []
  constructor(private authService : AuthService) {
    
  }
  @Input() isLoggedIn: boolean = false;
  
  ngOnInit(){
   this.authService.getUsers()
      .subscribe((arg :any )=> this.users.push(arg));
      console.log(this.users)
  }
}
