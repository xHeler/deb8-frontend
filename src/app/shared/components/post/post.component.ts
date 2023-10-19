import { Component } from '@angular/core';
import { Post } from 'src/app/core/interfaces/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post: Post = {
    post_id: '',
    username: 'terrylucas',
    title: '',
    image: 'https://picsum.photos/536/354',
    description: 'Imperdiet in sit rhoncus, eleifend tellus augue.',
    created_at: '1 HOUR AGO',
    likes_count: 1069,
    comments_count: 100,
    comments: [],
    isLiked: false,
  };

  toggleLike() {
    this.post.isLiked = !this.post.isLiked;
    this.post.isLiked ? this.post.likes_count++ : this.post.likes_count--;
  }
}
