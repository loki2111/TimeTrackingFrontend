import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  user = new User();
  msg='';
  termsAndConditionsChecked: boolean = false;
  isuseremailVal=false;
  userRegistrationAlertShown = false;


  constructor(private _registrationService : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
  }

  capitalizeFirstLetter() {
    if (this.user.username) {
      this.user.username = this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1);
    }
  }

  showAlert1(message: string): void {
    if (!this.isuseremailVal) {
      alert(message);
      this.isuseremailVal=true;
    }
  }

  showAlert(message: string): void {
    if (!this.userRegistrationAlertShown) {
      alert(message);
      this.userRegistrationAlertShown = true;
    }
  }

  isuseremailValid() {
    if (!this.user.username || !this.user.gender || !this.user.profession || !this.user.password || !this.user.email || !this.user.address) {
      // Display error message to the user
     
      return false; // Prevent further execution
    }else{
      return true;
    }
  }


  isPasswordValid1(password:string) {
    password = this.user.password;
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



   if (password == null) {
     return false;
   }
   
   // Check length
   else if (password.length < minLength) {
     console.log("invalid password  min lenght");
    

     return false;
   }else
 
   // Check uppercase letters
   if (!upperCaseMatches || upperCaseMatches.length < minUpperCase) {
     console.log("invalid password uppercase");
     

     return false;
   }else
 
   // Check lowercase letters
   if (!lowerCaseMatches || lowerCaseMatches.length < minLowerCase) {
     console.log("invalid password llowercase");
   

     return false;
   }else 
   if (!numberMatches || numberMatches.length < minNumbers) {
     console.log("invalid password number");
    

     return false;
   }else if (!specialCharMatches || specialCharMatches.length < minSpecialChars) {
     console.log("invalid password . soecial ca=har");
     return false;
   }else{
    return true;
   }
 
   
 }


  registerUser(): void {
    if (!this.termsAndConditionsChecked) {
     this.showAlert("Please agree to the terms and conditions to register");
      console.log('Please agree to the terms and conditions to register.');
     
    }
    
   else if (!this.isPasswordValid1(this.user.password)) {
    this.showAlert("Please enter valid password");
      console.log('Please enter valid password.');
      
    }else if (!this.isuseremailValid()) {
      this.showAlert1("Enter all details");
      console.log('Please enter all details.');
      
    }else{
  
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
