import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/interfaces/Post';
import { PostService } from 'src/app/core/services/post.service';
import { Comment } from 'src/app/core/interfaces/Comment';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  uuid: string = '';
  post!: Post;
  comments!: Comment[];

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const uuidParam = params.get('uuid');
      if (uuidParam !== null) {
        this.uuid = uuidParam;
      }
      console.log('UUID:', this.uuid);
      this.postService.getPost(this.uuid).subscribe(
        (data: any) => {
          console.log('Response Data:', data);
          this.post = data.results ? data.results : data;
          this.comments = this.post.comments;
          console.log('Post:', this.post);
        },
        (error) => {
          console.error('Error fetching post:', error);
        }
      );
    });
  }
}
