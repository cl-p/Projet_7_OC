import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  @Input() post: Post = new Post();
  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
  }

  onLike(){
    this.postService.like(this.post._id)
  }

  onDislike(){

  }

}
