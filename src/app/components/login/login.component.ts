import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/models/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''; 
  password: string = '';
  errorMessage: string = '';
  timestamp: string = '';
  location: string= '';
  city: string='';
  region: string='';
  currentemail: string='';

  constructor(private userService: UserService, private router: Router,
     private http: HttpClient,private locationService: LocationService,private authService: AuthService) { }

  ngOnInit(): void {
    this.updateTimestamp();
    setInterval(() => this.updateTimestamp(), 1000);

    this.locationService.getLocation().subscribe({
      next: (response: any) => {
        console.log(response);
        this.city = response.city;
        this.region = response.region;
        this.location=this.city+" "+this.region;
      },
      error: (err) => {
        console.error('Error fetching location:', err);
      }
    });


  }

  updateTimestamp(): void {
    const now = new Date();
    this.timestamp = now.toLocaleString();
  }
  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
      timestamp: this.timestamp,
      location: this.location 
    };

    this.userService.login(loginData)
    .subscribe(response => {
      console.log('User data saved:@@@@@@@@@@@@@@@@@@@@', response);
      console.log(response.email);
      this.authService.setEmail(response.email);
      this.router.navigate(['/userdashboard']);
    }, error => {
      console.error('Error saving user data:', error);
    });
}

getCurrentUser(): string {
 return this.currentemail;
}


}
