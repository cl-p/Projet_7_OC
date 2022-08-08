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
  fileToUpload: any;
  fileName: string = "";
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
    this.postService.modifyPost(this.thePost._id, this.modifiedFormGroup.value.description, this.fileToUpload).subscribe( resp => {
      this.router.navigate(["/"])
    })
  }


  // méthode pour pouvoir sélectionner un fichier lors du click sur l'icone 
  selectFile() {
    let element: HTMLElement = document.getElementById('input-upload') as HTMLElement;
    element.click();
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






}
