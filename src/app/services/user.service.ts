import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import{ tap } from 'rxjs/operators';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${NAV_URL}/loginuser`, { username, password });
  // }

  login(email: string, password: string, timestamp: string): Observable<any> {
    console.log("service",email, password);
    return this.http.post<any>(`${NAV_URL}api/users/loginuser`, { email, password , timestamp});
  }


  saveLocation(locationData: any): Observable<any> {
    return this.http.post<any>(`${NAV_URL}api/users/saveLocation`, locationData);
  }
 

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${NAV_URL}/user-details`);
  }

  

  getAllTasksByEmail(email: string): Observable<any[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<any[]>(`${NAV_URL}api/tasks/gettaskbyemail`, { params })
      .pipe(
        tap(tasks => console.log('Fetched tasks:', tasks))
      );
  }
  
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}api/tasks/getAllTask`);
  }



  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${NAV_URL}api/tasks/create`, taskData);
  }


  // getAllTasksByEmail(email: string): Observable<any[]> {
  //   const params = new HttpParams().set('email', email);
  //   const tasks = this.http.get<any[]>(`${NAV_URL}api/tasks/gettaskbyemail/${params}`);
  //   console.log(tasks.subscribe,"service console log#########");
  //   return tasks;
  // }

 

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}api/users/getAllUser`);
  }

 
  assignTask(userId: number, task: string): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/assign-task`, null, {
      params: {
        userId: userId.toString(),
        task: task
      }
    });
  }



  
}
