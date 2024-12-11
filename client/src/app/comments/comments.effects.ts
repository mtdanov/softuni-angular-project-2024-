import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';

import * as CommentActions from './comments.actions';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentEffects {
  private commentService = inject(CommentsService);
  actions$ = inject(Actions);

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(({ postId }) =>
        this.commentService.getPostComments(postId).pipe(
          map((comments) => CommentActions.loadCommentsSuccess({ comments })),
          catchError(() => of({ type: '[Post API] Load Posts Failure' }))
        )
      )
    )
  );

  loadReplies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.getReplies),
      switchMap(({ parentId }) =>
        this.commentService.getReplies(parentId).pipe(
          map((replies) => CommentActions.gotReplies({ parentId, replies })),
          catchError(() => of({ type: '[Post API] Load Posts Failure' }))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.addComment),
      switchMap(({ text, userId, username, postId, parentId }) =>
        this.commentService
          .createComment(text, userId, username, postId, parentId)
          .pipe(
            map((newComment) => {
              if (newComment.parentId) {
                return CommentActions.addedReplie({ comment: newComment });
              } else {
                return CommentActions.addedComment({ comment: newComment });
              }
            }),
            catchError(() => of({ type: '[Post API] Load Posts Failure' }))
          )
      )
    )
  );

  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.editComment),
      concatMap(({ commentId, comment }) =>
        this.commentService.editComment(commentId, comment).pipe(
          map((editComment) => {
            if (editComment.parentId) {
              return CommentActions.editReplySuccess({
                parentId: editComment.parentId,
                replyId: commentId,
                text: editComment.comment,
              });
            } else {
              return CommentActions.editedComment({ comment: editComment });
            }
          })
        )
      ),
      catchError(() => of({ type: '[Post API] Load Posts Failure' }))
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.deleteComment),
      mergeMap(({ commentId, postId }) =>
        this.commentService.deleteComment(commentId, postId).pipe(
          map(() => ({ type: '[Post API] Delete Post Success' })),
          catchError(() => of({ type: '[Post API] Delete Post Failure' }))
        )
      )
    )
  );

  deleteReplie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.deleteReply),
      mergeMap(({ parentId, replyId, postId }) =>
        this.commentService.deleteReplie(parentId, replyId, postId).pipe(
          map(() => ({ type: '[Post API] Delete Post Success' })),
          catchError(() => of({ type: '[Post API] Delete Post Failure' }))
        )
      )
    )
  );
}
