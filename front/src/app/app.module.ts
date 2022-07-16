import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AccueilPageComponent } from './accueil-page/accueil-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreationPostPageComponent } from './creation-post-page/creation-post-page.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  { path: '', component: AccueilPageComponent},
  { path: 'new-post', component: CreationPostPageComponent},





  { path: '**', component: NotFoundComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    ConnexionPageComponent,
    TopBarComponent,
    AccueilPageComponent,
    NotFoundComponent,
    CreationPostPageComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
