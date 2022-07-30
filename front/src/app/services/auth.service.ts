import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../models/User';
const path = environment.pathAuth;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(){
    return localStorage.getItem("token")
  }

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string):Observable<any> {
    return this.http.post(path + "signup", {
      email: email,
      password: password,
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.user.token)
      })
    )
  };


  login(email: string, password: string):Observable<any> {
    return this.http.post(path + "login", {
      email: email,
      password: password,
    }).pipe(
      tap((resp: any) => {

        localStorage.setItem("token", resp.user.token)
      })
    )
  };


  logOut(){
    localStorage.removeItem("token")
  }

  isConnected():boolean {
    
    return this.token != null
  }

}





