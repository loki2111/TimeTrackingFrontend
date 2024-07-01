import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = new User();

  constructor( private _http : HttpClient) { }

  
public registerUser(user : User):Observable<any>
{
  console.log("service",user);
    return this._http.post<any>(`${NAV_URL}api/users/register`,user);
}

}
