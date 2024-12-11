import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostState } from '../post.type';
import { Store } from '@ngrx/store';
import * as PostActions from '../post.actions';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  preview: string | ArrayBuffer | null | undefined;
  currentFile!: File;
  post!: FormGroup;

  constructor(
    private userService: UserService,
    private store: Store<PostState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.post = new FormGroup({
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, Validators.required),
    });
  }
  get currentUserId(): string | undefined {
    return this.userService.currentUserId;
  }

  get image() {
    return this.post.get('image');
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.currentFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target?.result;
      };
      reader.readAsDataURL(this.currentFile);
    }
    this.image?.setValue(file);
  }

  upload(): void {
    if (this.post.invalid) {
      return;
    }
    const { description } = this.post.value;

    this.store.dispatch(
      PostActions.addPost({
        file: this.currentFile,
        description: description!,
        userId: this.currentUserId,
      })
    );
    this.router.navigate(['/posts']);
  }
}
