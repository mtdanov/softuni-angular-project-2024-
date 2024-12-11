import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, PostState } from '../post.type';
import { select, Store } from '@ngrx/store';
import { selectPostById } from '../post.selectors';
import { Observable, take } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as PostActions from '../post.actions';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  @Input() postId!: string;
  @Output() closed = new EventEmitter<void>();

  postForm!: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  currentImage!: string;

  post$!: Observable<Post | undefined>;

  constructor(private fb: FormBuilder, private store: Store<PostState>) {}

  ngOnInit(): void {
    this.post$ = this.store.pipe(select(selectPostById(this.postId)));
    this.postForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });

    this.post$.pipe(take(1)).subscribe((post) => {
      if (post) {
        this.postForm.patchValue({
          description: post.description,
        });
        this.currentImage = post.postPic;
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    const { description } = this.postForm.value;
    if (this.selectedFile) {
      this.store.dispatch(
        PostActions.editPost({
          file: this.selectedFile,
          description: description!,
          postId: this.postId!,
        })
      );
    } else {
      this.store.dispatch(
        PostActions.editPost({
          file: this.currentImage,
          description: description!,
          postId: this.postId!,
        })
      );
    }
  }

  close(): void {
    this.closed.emit();
  }
}
