import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnboardingApp';
  currentUser: User;
  constructor(
    private router: Router,
    private userAuthService: AuthService) {
    this.userAuthService.currentUser.subscribe(x => this.currentUser = x);
    //this.studentOnboardingServiceService.RemoveStudentFromEdit();
  }

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }
}
