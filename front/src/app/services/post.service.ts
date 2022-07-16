import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(){
    // this.http.get renvoie un observable - à considérer comme une promesse 
    return this.http.get("localhost:3001/api/post")
  }
}
