import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';

import { select, Store } from '@ngrx/store';
import { Post, PostState } from '../post.type';
import * as PostActions from '../post.actions';
import { selectAllPosts } from '../post.selectors';
import { UserService } from '../../user/user.service';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentsComponent } from '../../comments/comments/comments.component';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [
    DeleteModalComponent,
    EditPostComponent,
    AsyncPipe,
    DatePipe,
    RouterLink,
    CommentsComponent,
  ],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent {
  @Input() post!: Post;
  // userId!: string;
  // username!: string;
  activeDropdown: string | null = null;
  showModal: boolean = false;
  isDel: boolean = false;
  activePostId: string | null = null;

  activeComment: string | null = null;
  showComments: boolean = false;
  canEdit: boolean = false;

  likeBtn: boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private store: Store<PostState> // private userService: UserService
  ) {}
  get currentUsername(): string | undefined {
    return this.userService.currentUsername;
  }
  get currentUserId(): string | undefined {
    return this.userService.currentUserId;
  }
  // ngOnInit(): void {
  // this.userId = this.userService.userId;
  // this.username = this.userService.username;
  // }

  // triggers modal
  openDeleteModal(postId: string): void {
    this.showModal = true;
    this.activePostId = postId;
  }

  onModalClosed() {
    this.showModal = false;
    this.activePostId = null;
  }

  onDelPostConfirmed() {
    if (this.activePostId) {
      this.store.dispatch(
        PostActions.deletePost({
          id: this.activePostId,
          userId: this.currentUserId,
        })
      );
      // this.postService.deletePost(this.activePostId).subscribe(() => {
      // this.posts =
      //   this.posts?.filter((post) => post._id !== this.activePostId) || null;
      // });
    }
    this.showModal = false;
    this.activePostId = null;
  }

  toggleDropdown(postId: string): void {
    this.activeDropdown = this.activeDropdown === postId ? null : postId;
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }
  onEditClosed() {
    this.canEdit = false;
  }

  // show comments
  toggleComments(postId: string): void {
    this.activeComment = this.activeComment === postId ? null : postId;
  }
  // close comments
  onCommenteClosed() {
    this.activeComment = null;
  }

  // opravi userId
  like(postId: string) {
    this.store.dispatch(
      PostActions.likePost({ postId: postId, userId: this.currentUserId })
    );
    // this.postService.likePost(this.userId!, postId).pipe();
    // .pipe(tap(()))
  }

  // this.posts = this.posts.map((post) => {
  //   if (post._id === postId) {
  //     post.likes.push(this.userId!);
  //     this.likeBtn = true;
  //     // post.isLikedByUser = true;
  //   }
  //   return post;
  // });

  unlike(postId: string) {
    this.store.dispatch(
      PostActions.unlikePost({ postId: postId, userId: this.currentUserId })
    );
    // this.postService
    //   .unlikePost(this.userId!, postId)
    // this.posts = this.posts.map((post) => {
    //   if (post._id === postId) {
    //     const hasLiked = post.likes.includes(this.userId!);
    //     if (hasLiked) {
    //       post.likes = post.likes.filter((like) => like !== this.userId);
    //       this.likeBtn = false;
    //     }
    //   }
    //   return post;
    // });
  }

  isLiked(post: Post): boolean {
    return post?.likes.includes(this.currentUserId!);
  }

  isCreator(post: Post): boolean {
    return post?.owner._id.includes(this.currentUserId!);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-menu')) {
      this.activeDropdown = null;
    }
  }
}
