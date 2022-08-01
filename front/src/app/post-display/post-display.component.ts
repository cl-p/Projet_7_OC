import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models/Post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  @Input() post: Post = new Post();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onLike(){
    if(this.isLiked()=== true){
      this.postService.removeLikeOrDislike(this.post._id).subscribe( resp => {
        this.post = resp
      })
    }
    else {
      this.postService.like(this.post._id).subscribe(resp =>{
        this.post = resp
      }
    )
    }
    
  }

  onDislike(){

    if(this.isDisliked()=== true){
      this.postService.removeLikeOrDislike(this.post._id).subscribe( resp => {
        this.post = resp
      })
    }
    else {
       this.postService.dislike(this.post._id).subscribe( resp =>{
      this.post = resp
    })
    }
   
  }

  isLiked():boolean{
    // si le user fait partie du tableau des userLiked, la méthode doit retourner true
    return this.post.usersLiked.some(i => {
      return i === (this.authService.decodedToken as any).userId 
    })

  }

  isDisliked():boolean{
    return this.post.usersDisliked.some(i => {
      return i === (this.authService.decodedToken as any).userId 
    })
  }


  removePost(){
    
    this.postService.deletePost(this.post._id).subscribe(resp =>{
      this.delete.emit()
    })
  }

}
