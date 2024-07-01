import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  details: string;
  status: string;
}

interface UserStatus {
  userId: string;
  username: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  fetchTasks(userId: string, username: string, status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/tasks`, {
      params: {
        userId: userId,
        username: username,
        status: status
      }
    });
  }

  fetchAllUserStatuses(): Observable<UserStatus[]> {
    return this.http.get<UserStatus[]>(`/api/user-statuses`);
  }
}
