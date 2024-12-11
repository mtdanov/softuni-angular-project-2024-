import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';

import { PostItemComponent } from '../post-item/post-item.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommentsComponent } from '../../comments/comments/comments.component';

import { Post, PostState } from '../post.type';
import * as PostActions from '../post.actions';
import { selectAllPosts, selectLoading } from '../post.selectors';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostItemComponent,
    CommentsComponent,
    AsyncPipe,
    CommonModule,
    LoaderComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  loading = false;
  loader$!: Observable<boolean>;
  page = 1;
  constructor(private store: Store<PostState>) {
    this.posts$ = this.store.select(selectAllPosts);
    this.loader$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(PostActions.loadPosts());
  }

  onScroll() {
    this.page++;
    this.store.dispatch(PostActions.loadMore({ num: this.page }));
  }
}
