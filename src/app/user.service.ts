import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  private isAuthenticated = false;
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();
  private authStatusListener = new Subject<boolean>()

  private token: string;


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }

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




  login(email: string, password: string){
    const user = {email: email, password: password};
    this.http.post<{token: string}>("http://localhost:3000/api/users/login", user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/tickets']);
        }
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
        console.log("response:", response)
      })
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
  }
}
