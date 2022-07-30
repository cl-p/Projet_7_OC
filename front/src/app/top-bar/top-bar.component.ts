import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor( 
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    
  }

  logOut(){
    this.authService.logOut()
    this.router.navigate(["/login"])
  }

  isConnected(){
    return this.authService.isConnected()
  }

}
