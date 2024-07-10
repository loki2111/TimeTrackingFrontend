import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  user = new User();
  msg = '';
  termsAndConditionsChecked: boolean = false;

  constructor(private _registrationService: RegistrationService, private _router: Router) { }

  ngOnInit(): void {
  }

  capitalizeFirstLetter() {
    if (this.user.username) {
      this.user.username = this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1);
    }
  }

  showAlert(message: string): void {
    alert(message);
  }

  isUserEmailValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!this.user.username || !this.user.gender || !this.user.profession || !this.user.password || !this.user.email || !this.user.address) {
      this.showAlert("Please fill in all required fields.");
      return false;
    }
    if (!usernamePattern.test(this.user.username)) {
      this.showAlert("Username can only contain letters and numbers.");
      return false;
    }
    if (!emailPattern.test(this.user.email)) {
      this.showAlert("Please enter a valid email address.");
      return false;
    }
    return true;
  }

  isPasswordValid1(password: string): boolean {
    const minLength = 6;
    const minUpperCase = 1;
    const minLowerCase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const upperCaseMatches = password.match(/[A-Z]/g);
    const lowerCaseMatches = password.match(/[a-z]/g);
    const numberMatches = password.match(/[0-9]/g);
    const specialCharMatches = password.match(specialCharsRegex);

    if (!password) {
      this.showAlert("Password cannot be empty.");
      return false;
    } else if (password.length < minLength) {
      this.showAlert("Password must be at least 6 characters long.");
      return false;
    } else if (!upperCaseMatches || upperCaseMatches.length < minUpperCase) {
      this.showAlert("Password must contain at least one uppercase letter.");
      return false;
    } else if (!lowerCaseMatches || lowerCaseMatches.length < minLowerCase) {
      this.showAlert("Password must contain at least one lowercase letter.");
      return false;
    } else if (!numberMatches || numberMatches.length < minNumbers) {
      this.showAlert("Password must contain at least one number.");
      return false;
    } else if (!specialCharMatches || specialCharMatches.length < minSpecialChars) {
      this.showAlert("Password must contain at least one special character.");
      return false;
    }
    return true;
  }

  registerUser(): void {
    if (!this.termsAndConditionsChecked) {
      this.showAlert("Please agree to the terms and conditions to register.");
      console.log('Please agree to the terms and conditions to register.');
    } else if (!this.isPasswordValid1(this.user.password)) {
      console.log('Please enter a valid password.');
    } else if (!this.isUserEmailValid()) {
      console.log('Please enter all details.');
    } else {
      this._registrationService.registerUser(this.user).subscribe(
        data => {
          console.log("Registration Success");
          sessionStorage.setItem("username", this.user.username);
          sessionStorage.setItem("gender", this.user.gender);
          alert('User registered successfully!');
          this._router.navigate(['/userlogin']);
        },
        error => {
          console.log("Registration Failed");
          console.log(error.error);
          this.msg = "User with " + this.user.email + " already exists.";
        }
      );
      console.log(this.user);
      console.log('User registered successfully!');
    }
  }
}
