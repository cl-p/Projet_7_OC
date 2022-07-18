import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-creation-post-page',
  templateUrl: './creation-post-page.component.html',
  styleUrls: ['./creation-post-page.component.scss']
})
export class CreationPostPageComponent implements OnInit {


  fileToUpload: File | null = null;


  constructor(
    postService: PostService,
  ) { }

  ngOnInit(): void {
  }

  selectFile() {
    let element: HTMLElement = document.getElementById('input-upload') as HTMLElement;
    element.click();
    console.log(element)
  }

  handleFileInput(event: any) {
    
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload)

    // l'API attend d'un post qu'il contienne un form-data avec 2 clés:
    // une clé "post" qui contient du JSON (contenu du text-area)
    // une clé "image" qui contient le fichier stocké dans fileToUpload 
  }

}
