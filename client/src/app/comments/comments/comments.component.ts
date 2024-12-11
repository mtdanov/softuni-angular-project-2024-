import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActiveCommentInterface, Comment } from '../comments.type';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { CommentState } from '../comments.type';
import * as CommentActions from '../comments.actions';
import {
  selectAllComments,
  selectRepliesForComment,
} from '../comments.selectors';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { AsyncPipe } from '@angular/common';
// import { selectAllPosts, selectLoading } from '../comments.selectors';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, CommentFormComponent, AsyncPipe],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() postId!: string;
  @Output() closed = new EventEmitter<void>();
  @Input() userId: string | undefined;
  @Input() username: string | undefined;

  comments$!: Observable<Comment[]>;

  commentForm!: FormGroup;
  replies$!: Observable<any>;
  activeComment: ActiveCommentInterface | null = null;

  constructor(private store: Store<CommentState>) {}
  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(''),
    });

    this.comments$ = this.store.select(selectAllComments);

    this.store.dispatch(CommentActions.loadComments({ postId: this.postId }));
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    // console.log(activeComment);

    this.activeComment = activeComment;
  }

  closeComments() {
    this.closed.emit();
    // console.log(`closeComments called in child`);
  }

  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: string | null;
  }): void {
    this.store.dispatch(
      CommentActions.addComment({
        text,
        userId: this.userId,
        username: this.username,
        postId: this.postId,
        parentId,
      })
    );

    this.activeComment = null;
  }

  updateComment({ commentId, text }: { text: string; commentId: string }) {
    this.store.dispatch(
      CommentActions.editComment({ commentId, comment: text })
    );
    this.activeComment = null;
  }

  deleteComment({
    commentId,
    parentId,
  }: {
    commentId: string;
    parentId: string | null;
  }) {
    if (parentId) {
      this.store.dispatch(
        CommentActions.deleteReply({
          parentId,
          replyId: commentId,
          postId: this.postId,
        })
      );
    } else {
      this.store.dispatch(
        CommentActions.deleteComment({ commentId, postId: this.postId })
      );
    }
  }

  getReplies(parentId: string) {

    this.store.dispatch(CommentActions.getReplies({ parentId }));
    this.replies$ = this.store.select(selectRepliesForComment(parentId));
  }
}
