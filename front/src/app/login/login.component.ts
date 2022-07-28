import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required],
  });

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(){

  }

}
