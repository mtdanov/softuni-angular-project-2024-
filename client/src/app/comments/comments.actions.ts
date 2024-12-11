import { createAction, props } from '@ngrx/store';
import { Comment, Replie } from './comments.type';

export const loadComments = createAction(
  '[Comment API] Load Comments',
  props<{ postId: string }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment API] Load Commentss Success',
  props<{ comments: Comment[] }>()
);

export const addComment = createAction(
  '[Comment API] add comment',
  props<{
    text: string;
    userId: string | undefined;
    username: string | undefined;
    postId: string;
    parentId: string | null;
  }>()
);

export const addedComment = createAction(
  '[Comment API] added comment',
  props<{ comment: Comment }>()
);

export const addReplie = createAction(
  '[Comment API] add replie',
  props<{
    text: string;
    userId: string | undefined;
    username: string | undefined;
    postId: string;
    parentId: string | null;
  }>()
);

export const addedReplie = createAction(
  '[Comment API] added replie sucessfully',
  props<{ comment: Comment }>()
);

export const getReplies = createAction(
  '[Comment API] Get Replies successfully ',
  props<{ parentId: string }>()
);

export const gotReplies = createAction(
  '[Comment API]  Replies  loaded successfully',
  props<{ parentId: string; replies: Replie[] }>()
);

export const deleteComment = createAction(
  '[Comment API] delete comment',
  props<{ commentId: string; postId: string }>()
);

export const editComment = createAction(
  '[Comment API] edit comment',
  props<{ commentId: string; comment: string }>()
);

export const editedComment = createAction(
  '[Comment API] edited comment success',
  props<{ comment: Comment }>()
);

export const editReply = createAction(
  '[Comment] Edit Reply',
  props<{ replyId: string; text: string }>()
);

export const editReplySuccess = createAction(
  '[Comment] Edit Reply Success',
  props<{ parentId: string; replyId: string; text: string }>()
);

export const editReplyFailure = createAction('[Comment] Edit Reply Failure');

export const deleteReply = createAction(
  '[Comments] Delete Reply',
  props<{ parentId: string; replyId: string; postId: string }>()
);

export const deleteReplySuccess = createAction(
  '[Comments] Delete Reply Success',
  props<{ parentId: string; replyId: string }>()
);

export const deleteReplyFailure = createAction(
  '[Comments] Delete Reply Failure',
  props<{ error: any }>()
);
