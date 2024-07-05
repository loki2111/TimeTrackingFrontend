import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UserService } from 'src/app/services/user.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  tasks: Task[] = [];
  tasksByUser: { [key: string]: Task[] } = {};
  location:any =null;
  
  constructor(private userService: UserService , private excelService: ExcelService,
    private locationService:LocationService) {

  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('Fetched users-AdminPanel_______ONINIT:', this.users);
    });
    
    
    this.getAllTask();
  
    this.locationService.getLocation().subscribe((response) => {
      console.log(response);
      this.location = response;
  
      this.locationService.saveLocation(this.location).subscribe(() => {
        console.log('Location saved successfully');
      });
    });
  
  }

  saveLocation() {
    this.userService.saveLocation(this.location).subscribe((response)=>{
      console.log(response);
      this.location = response;
    })
  }


  getAllTask(): void {
    this.userService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split('-');
    const formattedHour = parseInt(hour) >= 12 ? (parseInt(hour) === 12 ? 12 : parseInt(hour) - 12) : parseInt(hour);
    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${period}`;
  }

  exportDataToExcel() {
    const excelData: any[][] = [];
    excelData.push(['Task ID', 'Username', 'Email', 'Login Time', 'Task Description', 'Task Timing', 'City', 'State', 'LogOutTime']);
  
    const tasksGroupedByUser: { [key: string]: any[] } = {};
  
    this.tasks.forEach((task: any) => {
      if (!tasksGroupedByUser[task.username]) {
        tasksGroupedByUser[task.username] = [];
      }
      tasksGroupedByUser[task.username].push(task);
    });
  
    Object.keys(tasksGroupedByUser).forEach(username => {
      const user = this.users.find(u => u.username === username);
      if (user) {
        const userTasks = tasksGroupedByUser[username];
        userTasks.forEach((task, index) => {
          if (index === 0) {
            // Add user details for the first task
            excelData.push([
              task.id,
              user.username,
              user.email,
              user.timestamp, // Assuming user.timestamp is the login time
              task.task,
              task.loginTime,
              this.location.city,
              this.location.region,
              user.logouttime // Assuming user.logouttime is the logout time
            ]);
          } else {
            // Add only the task details for subsequent tasks
            excelData.push([
              task.id,
              '', // No username for subsequent tasks
              '', // No email for subsequent tasks
              '', // No login time for subsequent tasks
              task.task,
              task.loginTime,
              '', // No city for subsequent tasks
              '', // No region for subsequent tasks
              '' // No logout time for subsequent tasks
            ]);
          }
        });
      }
    });
  
    this.excelService.exportAsExcelFile(excelData, 'UsersAndTasks');
  }
  
  
}
