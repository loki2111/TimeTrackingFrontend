import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    currentemail: string = '';


    setEmail(email: string): void {
        this.currentemail = email;
      }
    
      getEmail(): string {
        return this.currentemail;
      }
}
