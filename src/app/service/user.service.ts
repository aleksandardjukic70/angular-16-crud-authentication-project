import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menus, Roleaccess, Usercred, Userinfo, Users } from '../Store/Model/User.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  APIBaseUrl = 'http://localhost:3000/user'

  UserRegistration(userdata: Users) {
    return this.http.post(this.APIBaseUrl, userdata);
  }

  UserLogin(userdata: Usercred): Observable<Userinfo[]> {
    return this.http.get<Userinfo[]>(this.APIBaseUrl + '?username=' + userdata.username + '&password=' + userdata.password);
  }

  Duplicateusername(username: string): Observable<Userinfo[]> {
    return this.http.get<Userinfo[]>(this.APIBaseUrl + '?username=' + username);
  }

  GetMenubyRole(userrole: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>('http://localhost:3000/roleaccess?role='+userrole);
  }

  SetUserToLocalStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }

  Getuserdatafromstorage() {
    let _obj: Userinfo = {
      username: '',
      email: '',
      name: '',
      role: '',
      status: false
    }
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }
  }
}

