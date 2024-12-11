import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Likes } from '../types/post';
import { Post } from './post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  uploadPost(file: File, description: string, userId: string | undefined) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    return this.http.post<Post>(
      `http://localhost:3010/post/${userId}/create-post`,
      formData
    );
  }

  editPost(file: File | string, description: string, postId: string) {
    const formData = new FormData();
    if (typeof file === 'string') {
      formData.append('fileUrl', file);
    } else {
      formData.append('file', file);
    }
    formData.append('description', description);
    return this.http.put<Post>(
      `http://localhost:3010/post/${postId}/edit-post`,
      formData
    );
  }

  getMorePosts(num: number): Observable<Post[]> {
    let params = new HttpParams();
    params = params.set('num', num);
    return this.http
      .get<Post[]>('http://localhost:3010/post/getMore-posts', { params })
  }

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>('http://localhost:3010/post/get-posts')
  }

  likePost(postId: string, userId: string | undefined) {
    return this.http.patch('http://localhost:3010/post/like', {
      userId,
      postId,
    });
  }

  unlikePost(postId: string, userId: string | undefined) {
    return this.http.patch<Likes>('http://localhost:3010/post/unlike', {
      userId,
      postId,
    });
  }

  deletePost(postId: string, userId: string | undefined) {
    let params = new HttpParams();
    params = params.set('userId', userId!);
    return this.http.delete(`http://localhost:3010/post/${postId}/delete`, {
      params,
    });
  }
}
