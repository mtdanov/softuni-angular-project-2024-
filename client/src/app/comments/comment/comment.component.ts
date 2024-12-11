import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import {
  ActiveCommentInterface,
  ActiveCommentTypeEnum,
  Comment,
} from '../comments.type';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { CommentState } from '../comments.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent, AsyncPipe, CommentComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() currentUserId!: string | undefined;
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() parentId!: string | null;
  @Input() replies$!: Observable<Comment[]>;

  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output()
  getReplies = new EventEmitter<string>();
  @Output()
  addComment = new EventEmitter<{ text: string; parentId: string | null }>();
  @Output()
  deleteComment = new EventEmitter<{
    commentId: string;
    parentId: string | null;
  }>();
  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: string }>();

  canEdit: boolean = false;
  canDelete: boolean = false;
  canReply: boolean = false;
  showReplies: boolean = false;
  replyId!: string;

  activeCommentType = ActiveCommentTypeEnum;

  constructor(private store: Store<CommentState>) {}

  ngOnInit(): void {
    this.canEdit = this.currentUserId === this.comment.userId;
    this.canDelete = this.currentUserId === this.comment.userId;
    this.canReply = Boolean(this.currentUserId);
    this.replyId = this.parentId ? this.parentId : this.comment._id;
    // console.log(this.replies$);
  }

  isShown() {
    this.showReplies = !this.showReplies;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment._id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }

    return (
      this.activeComment.id === this.comment._id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }

  toggleReplies(commentId: string): void {
    if (!this.showReplies) {
      this.getReplies.emit(commentId);
    }
    this.showReplies = !this.showReplies;
  }
}
