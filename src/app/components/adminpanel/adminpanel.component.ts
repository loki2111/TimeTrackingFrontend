import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { UserService } from 'src/app/services/user.service';
import { ExcelService } from 'src/app/services/excel.service';
import { LocationService } from 'src/app/services/location.service';

interface Taskk {
  id: number;
  task: string;
  loginTime: string;
}

interface GroupedUser {
  username: string;
  email: string;
  tasks: Taskk[];
}

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  tasksByUser: { [key: string]: Task[] } = {};
  location: any = null;
  tasks: Task[] = [];
  groupedUsers: { [email: string]: GroupedUser } = {};

  constructor(
    private userService: UserService,
    private excelService: ExcelService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('Fetched users___ONINIT:', this.users);
    });

    this.getAllTask();

    this.locationService.getLocation().subscribe((response) => {
      console.log(response);
      this.location = response;
    });
  }

  saveLocation() {
    this.userService.saveLocation(this.location).subscribe((response) => {
      console.log(response);
      this.location = response;
    });
  }

  getAllTask(): void {
    this.userService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.groupTasksByEmail();
    });
  }

  groupTasksByEmail() {
    this.groupedUsers = this.tasks.reduce((acc, task) => {
      if (task.email) {
        if (!acc[task.email]) {
          acc[task.email] = {
            username: task.username,
            email: task.email,
            tasks: []
          };
        }
        acc[task.email].tasks.push({
          id: task.id,
          task: task.task,
          loginTime: task.loginTime
        });
      }
      return acc;
    }, {} as { [email: string]: GroupedUser });
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split('-');
    const formattedHour = parseInt(hour) >= 12 ? (parseInt(hour) === 12 ? 12 : parseInt(hour) - 12) : parseInt(hour);
    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${period}`;
    
  }

  exportDataToExcel() {
    const excelData: any[][] = [];
    excelData.push(['ID', 'Username', 'Email', 'Login Time', 'Task Description', 'Task Timing', 'Logout Time', 'Location']);

    this.users.forEach(user => {
      const userTasks = this.groupedUsers[user.email]?.tasks || [];
      const rowSpan = userTasks.length || 1;
      const location = `${this.location?.city || ''} ${this.location?.region || ''}`;
      
      // Add first row with user details and the first task
      excelData.push([
        user.id,
        user.username,
        user.email,
        user.timestamp,
        userTasks[0]?.task || '',
        userTasks[0]?.loginTime || '',
        user.logouttime,
        location
      ]);

      // Add subsequent rows for additional tasks
      for (let i = 1; i < userTasks.length; i++) {
        excelData.push([
          '',
          '',
          '',
          '',
          userTasks[i]?.task || '',
          userTasks[i]?.loginTime || '',
          '',
          ''
        ]);
      }
    });

    this.excelService.exportAsExcelFile(excelData, 'UsersAndTasks');
  }
}