import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../models/User';
import jwt_decode from "jwt-decode";
const path = environment.pathAuth;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(){
    return localStorage.getItem("token")
  }

  get decodedToken():any | null {
    if (this.token != null){
      return jwt_decode(this.token)
    }
    return null

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

        localStorage.setItem("token", resp.token)
      })
    )
  };


  logOut(){
    localStorage.removeItem("token")
  }

  isConnected():boolean {
    
    if(this.token === null){
      return false
    }

    const decodedToken = jwt_decode(this.token) as any;
    // renvoie la date du jour en format "date UTC"
    const today = Math.floor((new Date()).getTime()/1000)
    if (today > decodedToken.exp){
      // on compare la date du jour à celle de la date d'expiration du token
      return false
    }
    return this.token != null
  }

}





