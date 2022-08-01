import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-creation-post-page',
  templateUrl: './creation-post-page.component.html',
  styleUrls: ['./creation-post-page.component.scss']
})
export class CreationPostPageComponent implements OnInit {

  postForm: FormGroup = this.formBuilder.group({
    'description': ['', Validators.required]
  }); 
  fileToUpload: any;
  fileName: string = "";

  // injections de dépendances
  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  // se charge lors du chargement de la page
  ngOnInit(): void {
  }


  // méthode pour pouvoir sélectionner un fichier lors du click sur l'icone 
  selectFile() {
    let element: HTMLElement = document.getElementById('input-upload') as HTMLElement;
    element.click();
    console.log(element)
  }

  // affichage du fichier sélectionner, si un fichier a été sélectionné
  handleFileInput(event: any) {
    
    this.fileToUpload = event.target.files.item(0);
    // ? : condition ternaire (correspond à un else if)
    this.fileName = this.fileToUpload ? this.fileToUpload.name :""; 
    console.log(this.fileToUpload)
    

    // l'API attend d'un post qu'il contienne un form-data avec 2 clés:
    // une clé "post" qui contient du JSON (contenu du text-area)
    // une clé "image" qui contient le fichier stocké dans fileToUpload 
  }

  // méthode pour ajouter un nouveau post
  addPost(){
    const value = this.postForm.value
    this.postService.createPosts(value.description, this.fileToUpload).subscribe(
      // lorsque l'api répond, le user est redirigé vers l'accueil
      resp=> {
        this.router.navigate([ "/" ])

      }
    )
  }
}
