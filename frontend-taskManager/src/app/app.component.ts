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


  constructor(private readonly _authService : AuthService){

  }
}
