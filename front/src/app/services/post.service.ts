import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
const path = environment.pathApi;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // observable = fonction asynchrone 
  getAllPosts():Observable<Post []> {
    // this.http.get renvoie un observable - à considérer comme une promesse 
    // <> signifie qu'un type fonctionne avec un autre (principe de généricité)
    return this.http.get<Post []>(path + "post")
  }

}