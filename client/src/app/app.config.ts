import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { postReducer } from './post/post.reducer';
import { PostEffects } from './post/post.effects';
import { commentReducer } from './comments/comments.reducer';
import { CommentEffects } from './comments/comments.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      posts: postReducer,
      comments: commentReducer,
    }),
    // provideStore({ comments: commentReducer }),
    provideEffects([PostEffects, CommentEffects]),
    // provideEffects(CommentEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
