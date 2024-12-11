import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.type';

export const selectPostState = createFeatureSelector<PostState>('posts');
export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state.posts
);

export const selectLoading = createSelector(
  selectPostState,
  (state) => state.loading
);

export const selectPostById = (postId: string) =>
  createSelector(selectPostState, (state) =>
    state.posts.find((post) => post._id === postId)
  );
