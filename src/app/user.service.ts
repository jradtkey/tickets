import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  getUsers(){
    this.http
      .get<{message: string, users: any}>(
        'http://localhost:3000/api/users'
      )
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            name: user.name,
            email: user.email,
            password: user.password,
            id: user._id
          }
        })
      }))
      .subscribe(transformedUsers => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      })
  }

  getUserUpdateListener(){
    return this.usersUpdated.asObservable();
  }


  private token: string;
  getToken() {
    return this.token;
  }

  login(email: string, password: string){
    const user = {email: email, password: password};
    this.http.post<{token: string}>("http://localhost:3000/api/users/login", user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
      })
  }

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
