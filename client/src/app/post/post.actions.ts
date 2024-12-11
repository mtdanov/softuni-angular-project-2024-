import { createAction, props } from '@ngrx/store';
import { Post } from './post.type';

export const loadPosts = createAction('[Post API] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post API] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadMore = createAction(
  '[Post API] Load more posts',
  props<{ num: number }>()
);
export const loadedSuccess = createAction(
  '[Post API]  loaded Successfully',
  props<{ posts: Post[] }>()
);

export const getPost = createAction(
  '[Post API] Get Post',
  props<{ postId: string }>
);
export const editPost = createAction(
  '[POST API] Edit Post',
  props<{ file: File | string; description: string; postId: string }>()
);
export const editedPost = createAction(
  '[POST API]  Post edited successfully',
  props<{ post: Post }>()
);

export const addPost = createAction(
  '[Post API] Add Post',
  props<{ file: File; description: string; userId: string | undefined }>()
);
export const addedPost = createAction(
  '[Post API]  Post added Succesfully',
  props<{ post: Post }>()
);

export const deletePost = createAction(
  '[Post API] Delete Post',
  props<{ id: string; userId: string | undefined }>()
);

export const likePost = createAction(
  '[Post API] Like Post',
  props<{ postId: string; userId: string | undefined }>()
);

export const likedPost = createAction(
  '[Post API] Liked Post Successfully',
  props<{ id: string; likesCount: number }>()
);

export const unlikePost = createAction(
  '[Post API] Unlike Post',
  props<{ postId: string; userId: string | undefined }>()
);
