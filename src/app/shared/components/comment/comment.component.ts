import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/core/interfaces/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: Comment = {
    comment_id: "1",
    author: "author",
    text: "text"
  }
  
}
