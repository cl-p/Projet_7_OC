import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-accueil-page',
  templateUrl: './accueil-page.component.html',
  styleUrls: ['./accueil-page.component.scss']
})
export class AccueilPageComponent implements OnInit {

  posts: Post[] = []
  // postservice est une dépendance
  // private = postservice utilisé uniquement dans la class accueilpagecomponent
  constructor(private postService: PostService) { }
  
  // ngOnInit --> fonction qui se lance dès que le component est initialisé (hook)
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(results => {
      this.posts = results
    })
  }

}
