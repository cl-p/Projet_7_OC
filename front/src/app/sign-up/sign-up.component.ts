import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup = this.formBuilder.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }
  

  onSubmit(){
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).subscribe(resp =>{
      this.router.navigate(["/"])
    })
  }
}
