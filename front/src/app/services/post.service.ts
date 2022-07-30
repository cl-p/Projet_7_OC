import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { AuthService } from './auth.service';

const path = environment.pathApi;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    ) { }

  // observable = fonction asynchrone 
  getAllPosts():Observable<Post []> {
    // this.http.get renvoie un observable - à considérer comme une promesse 
    // <> signifie qu'un type fonctionne avec un autre (principe de généricité)
    return this.http.get<Post []>(path + "post", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.token}`
      })

    })
  }

  createPosts(description: string, image: File):Observable<any> {
    const body = new FormData();
    body.append("post", description)
    body.append("image", image)
    return this.http.post<any>(path + "post", body,  {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.token}`
      })

    })
  }

  like(id: string){
    const body = 1;
    this.http.post(path + "post/" + id + "/like", body)
  }

  dislike(){

  }


}