import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''; // Initialize directly
  password: string = ''; // Initialize directly
  errorMessage: string = '';
  timestamp: string = '';

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.updateTimestamp();
    setInterval(() => this.updateTimestamp(), 1000);
  }

  updateTimestamp(): void {
    const now = new Date();
    this.timestamp = now.toLocaleString();
  }

  // onLogin() {
  //   console.log("Logging in with:", this.email, this.password);
  //   this.userService.login(this.email, this.password).subscribe({
  //     next: user => {
  //       console.log('Logged in successfully', user);
  //       this.router.navigate(['/userdashboard']);
  //     },
  //     error: err => {
  //       this.errorMessage = 'Unable to login';
  //     }
  //   });
  // }


  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
      timestamp: this.timestamp,
    };

    this.userService.login(this.email, this.password, this.timestamp)
    .subscribe(response => {
      console.log('User data saved:', response);
      this.router.navigate(['/userdashboard']);
    }, error => {
      console.error('Error saving user data:', error);
    });
}
}
