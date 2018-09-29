import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(name: string, email: string, password: string){
    const user: User = {
      name: name,
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/users/signUp", user)
      .subscribe(response => {
        console.log(response)
      })
  }
}
