import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Post } from 'src/app/core/interfaces/Post';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnChanges, OnInit {
  isYourPost: Boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  @Input() post: Post = {
    post_id: '',
    username: 'terrylucas',
    title: '',
    image: 'https://picsum.photos/536/354',
    description: 'Imperdiet in sit rhoncus, eleifend tellus augue.',
    created_at: '2023-10-02T12:45:05.441610Z',
    likes_count: 1069,
    comments_count: 100,
    comments: [],
    isLiked: false,
  };

  ngOnInit(): void {
    const loggedUsername = this.userService.getUsername();
    if (loggedUsername == this.post.username) {
      this.isYourPost = true;
    } else {
      this.isYourPost = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && changes['post'].currentValue) {
      const currentImage = changes['post'].currentValue.image;
      if (
        currentImage &&
        typeof currentImage === 'string' &&
        currentImage.includes('4200')
      ) {
        this.post.image = currentImage.replace('4200', '8000');
      }
    }
  }

  removePost(): void {
    this.postService.removePost(this.post.post_id);

    this.postService.removePost(this.post.post_id).subscribe(
      (response: any) => {
        console.log('Post removed successfully:', response);
        window.location.reload();
      },
      (error: any) => {
        console.log('Error removing post:', error);
      }
    );
  }

  toggleLike() {
    if (this.post.post_id != '' && !this.post.isLiked) {
      this.postService.likePost(this.post.post_id).subscribe((data: any) => {
        console.log('Like: ' + data);
      });
    } else if (this.post.post_id != '' && this.post.isLiked) {
      this.postService.unlikePost(this.post.post_id).subscribe((data: any) => {
        console.log('UnLike: ' + data);
      });
    }

    this.post.isLiked = !this.post.isLiked;
    this.post.isLiked ? this.post.likes_count++ : this.post.likes_count--;
  }

  getElapsedTime(): string {
    const postDate = new Date(this.post.created_at);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + (days === 1 ? ' DAY AGO' : ' DAYS AGO');
    } else if (hours > 0) {
      return hours + (hours === 1 ? ' HOUR AGO' : ' HOURS AGO');
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? ' MINUTE AGO' : ' MINUTES AGO');
    } else {
      return 'JUST NOW';
    }
  }

  navigateToDetailPost(): void {
    this.router.navigate(['/detail-post', this.post.post_id]);
  }
}
