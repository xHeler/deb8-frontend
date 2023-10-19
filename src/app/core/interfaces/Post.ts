import { Comment } from './Comment';

export interface PostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface Post {
  post_id: string;
  username: string;
  title: string;
  image: string;
  description: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  comments: Comment[];
  isLiked: boolean;
}
