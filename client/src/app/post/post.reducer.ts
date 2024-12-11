import { Post } from './post.type';
import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';

export interface PostState {
  posts: Post[];
  loading: boolean;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
};
export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: true,
    posts,
  })),
  on(PostActions.addedPost, (state, { post }) => ({
    ...state,
    loading: true,
    posts: createPost(state.posts, post),
  })),
  on(PostActions.loadedSuccess, (state, { posts }) => ({
    ...state,
    posts: [...state.posts, ...posts],
  })),
  on(PostActions.editedPost, (state, { post }) => ({
    ...state,
    posts: updatePost(state.posts, post),
  })),

  on(PostActions.deletePost, (state, { id }) => ({
    ...state,
    loading: true,
    posts: deletePost(state.posts, id),
  })),

  on(PostActions.likePost, (state, { postId, userId }) => ({
    ...state,
    posts: likePost(state.posts, postId, userId!),
  })),
  on(PostActions.unlikePost, (state, { postId, userId }) => ({
    ...state,
    posts: unlikePost(state.posts, postId, userId!),
  }))
);

const createPost = (posts: Post[], post: Post) => [...posts, post];
const updatePost = (posts: Post[], changes: Post) =>
  posts.map((post) => {
    return post._id === changes._id ? Object.assign({}, post, changes) : post;
  });
const deletePost = (posts: Post[], postId: string) =>
  posts.filter((post) => postId !== post._id);

const likePost = (posts: Post[], postId: string, userId: string) =>
  posts.map((post) => {
    return post._id === postId
      ? { ...post, likes: [...post.likes, userId] }
      : post;
  });

const unlikePost = (posts: Post[], postId: string, userId: string) =>
  posts.map((post) => {
    return post._id === postId
      ? { ...post, likes: post.likes.filter((user) => user !== userId) }
      : post;
  });
