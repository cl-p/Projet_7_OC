import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-creation-post-page',
  templateUrl: './creation-post-page.component.html',
  styleUrls: ['./creation-post-page.component.scss']
})
export class CreationPostPageComponent implements OnInit {

  constructor(
    postService: PostService,
  ) { }

  ngOnInit(): void {
  }

}
