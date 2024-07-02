import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get('https://ipapi.co/json/');
  }


  saveLocation(location: any) {
    return this.http.post(`${NAV_URL}api/users/saveLocation`, location);
  }

  
}

