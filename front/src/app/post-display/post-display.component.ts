import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/Post';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  @Input() post: Post = new Post();
  constructor() { }

  ngOnInit(): void {
  }

}
