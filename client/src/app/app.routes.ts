import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { RegisterProfessionalTypeComponent } from './user/register-professional-types/register-professional-type.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfessionalsComponent } from './professionals/professionals/professionals.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: HomeComponent },
  {
    path: 'register/professional',
    component: RegisterProfessionalTypeComponent,
  },
  { path: 'register/user', component: RegisterComponent },
  { path: 'register/professional/:userType', component: RegisterComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'professionals', component: ProfessionalsComponent },

  {
    path: 'user/profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('./user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./post/posts/posts.component').then((c) => c.PostsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    loadComponent: () =>
      import('./post/create-post/create-post.component').then(
        (c) => c.CreatePostComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
