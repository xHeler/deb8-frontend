import { Component } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  title: string = '';
  image: File | null = null;
  description: string = '';

  constructor(private postService: PostService, private router: Router) {}

  onFileChanged(event: any): void {
    this.image = event.target.files[0];
  }

  submitPost(): void {
    if (this.image && this.title && this.description) {
      this.postService
        .createPost(this.title, this.image, this.description)
        .subscribe(
          (response) => {
            console.log('Post created successfully:', response);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log('Error creating post:', error);
          }
        );
    }
  }
}
