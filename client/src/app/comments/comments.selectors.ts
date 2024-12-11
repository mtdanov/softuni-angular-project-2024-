import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from './comments.type';

export const selectCommentState =
  createFeatureSelector<CommentState>('comments');

export const selectAllComments = createSelector(
  selectCommentState,
  (state) => state.comments
);

export const selectLoading = createSelector(
  selectCommentState,
  (state) => state.loading
);

// export const getPostById = createSelector(selectPostState, (state) =>
//   state.posts.find((p) => p._id === postId)
// );

// export const selectCommentById = (commentId: string) =>
//   createSelector(selectCommentState, (state) => {
//     state.comments.find((comment) => comment._id === commentId);
//   });

// export const selectRepliesForComment = (commentId: string) =>
//   createSelector(
//     selectCommentState,
//     (state) =>
//       state.comments.find((comment) => comment._id === commentId)?.showReplies || []
//   );

export const selectRepliesForComment = (commentId: string) =>
  createSelector(
    selectCommentState,
    (state) =>
      state.comments.find((comment) => comment._id === commentId)?.showReplies || []
  );

