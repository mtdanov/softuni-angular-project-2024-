import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from './post.service';
import * as PostActions from './post.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {
  private postService = inject(PostService);
  actions$ = inject(Actions);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      exhaustMap(() =>
        this.postService.getAllPosts().pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts })),
          catchError(() => of({ type: '[Post API] Load Posts Failure' }))
        )
      )
    )
  );

  loadMorePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadMore),
      switchMap(({ num }) =>
        this.postService.getMorePosts(num).pipe(
          map((posts) => PostActions.loadedSuccess({ posts })),
          catchError(() => of({ type: '[Post API] Load more Posts Failure' }))
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.addPost),
      concatMap(({ file, description, userId }) =>
        this.postService.uploadPost(file, description, userId).pipe(
          map((newPost) => PostActions.addedPost({ post: newPost })),
          catchError(() => of({ type: '[Post API] Add Post Failure' }))
        )
      )
    )
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.editPost),
      concatMap(({ file, description, postId }) =>
        this.postService.editPost(file, description, postId).pipe(
          map((editPost) => PostActions.editedPost({ post: editPost })),
          catchError(() => of({ type: '[Post API] Edit Post Failure' }))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap((action) =>
        this.postService.deletePost(action.id, action.userId).pipe(
          map(() => ({ type: '[Post API] Delete Post Success' })),
          catchError(() => of({ type: '[Post API] Delete Post Failure' }))
        )
      )
    )
  );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likePost),
      mergeMap((action) =>
        this.postService.likePost(action.postId, action.userId).pipe(
          map(() => ({ type: '[Post API] Liked Post Success' })),
          catchError(() => of({ type: '[Post API] like Post Failure' }))
        )
      )
    )
  );

  unlikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.unlikePost),
      mergeMap((action) =>
        this.postService.unlikePost(action.postId, action.userId).pipe(
          map(() => ({ type: '[Post API] unliked Post Success' })),
          catchError(() => of({ type: '[Post API] unlike Post Failure' }))
        )
      )
    )
  );
}
