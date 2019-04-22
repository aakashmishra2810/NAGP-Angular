import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userAuthService: AuthService) {
    // redirect to home if already logged in
    if (this.userAuthService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get fCntrls() { return this.registerForm.controls; }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userAuthService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Registration failed! Please try again later.');
        });
  }


}
