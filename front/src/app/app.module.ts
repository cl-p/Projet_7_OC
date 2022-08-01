import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AccueilPageComponent } from './accueil-page/accueil-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreationPostPageComponent } from './creation-post-page/creation-post-page.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { PostDisplayComponent } from './post-display/post-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';



const routes: Routes = [
  { path: '', component: AccueilPageComponent},
  { path: 'new-post', component: CreationPostPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: '**', component: NotFoundComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AccueilPageComponent,
    NotFoundComponent,
    CreationPostPageComponent,
    PostDisplayComponent,
    SignUpComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    // module permettant de gèrer les formulaires
    ReactiveFormsModule,
  ],
  providers: [
    PostService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
