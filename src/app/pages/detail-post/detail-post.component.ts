import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/interfaces/Post';
import { PostService } from 'src/app/core/services/post.service';
import { Comment } from 'src/app/core/interfaces/Comment';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  uuid: string = '';
  post!: Post;
  comments!: Comment[];
  sortedComments: Comment[] = [];
  rating: number = 0.0;
  newCommentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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
          this.rating = this.calculateRating()

          console.log('Post:', this.post);
        },
        (error) => {
          console.error('Error fetching post:', error);
        }
      );
    });
  }

  addComment(): void {
    if (!this.newCommentText.trim()) {
      return;
    }

    this.postService
      .createComment(this.post.post_id, this.newCommentText)
      .subscribe(
        (response) => {
          this.comments.push(response);
          this.newCommentText = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
  }

  calculateRating(): number {
    if (!this.comments || this.comments.length === 0) {
      return 0.0; // Return 0 if there are no comments
    }
  
    let totalRating = 0;
    for (const comment of this.comments) {
      totalRating += comment.rating;
    }
  
    const averageRating = totalRating / this.comments.length;
    return parseFloat(averageRating.toFixed(2));
  }

  sortComments(criteria: string): void {
    if (criteria === 'best') {
      this.sortedComments = [...this.comments].sort((a, b) => b.rating - a.rating);
    } else if (criteria === 'newest') {
      this.sortedComments = this.comments;
    }
  }
  
}
