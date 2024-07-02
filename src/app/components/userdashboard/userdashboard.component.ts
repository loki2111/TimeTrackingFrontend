import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  username: string = '';
  email: string = '';
  loginTime: string = '';
  task: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
  }

  addTask(): void {
    const taskData = {
      username: this.username,
      email : this.email,
      loginTime: this.loginTime,
      task: this.task
    };

    this.userService.addTask(taskData).subscribe(response => {
      console.log('Task added successfully:', response);
      alert('Task added successfully');
      console.log(taskData);
      this.task = '';
    });
  }
}
