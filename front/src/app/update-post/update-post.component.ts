import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  modifiedFormGroup: FormGroup = this.formBuilder.group({
    'description': ['', Validators.required]
  }); 
  id: string = "";
  thePost: Post = new Post();
  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id'];
      this.postService.getOnePost(this.id).subscribe(post => {
        this.thePost = post
        this.modifiedFormGroup.get('description')?.setValue(this.thePost.description)
      })
    });


  }


  onPostModified(){
    this.postService.modifyPost(this.thePost._id, this.modifiedFormGroup.value.description).subscribe( resp => {
      this.router.navigate(["/"])
    })
  }
}
