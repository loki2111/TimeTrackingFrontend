import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';     

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  login(): void {

  
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin123';

    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
      this._router.navigate(['/adminpanel']);
    } else {
      alert('Invalid credentials');
    }
  }


}
