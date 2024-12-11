import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ImageResponse, profileDetails } from '../user.types';
import { AsyncPipe } from '@angular/common';
import { ProfileEditFormComponent } from '../profile-edit-form/profile-edit-form.component';
import { WorkingTimeComponent } from '../working-time/working-time.component';
import { Observable, Subscription } from 'rxjs';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { ActivatedRoute } from '@angular/router';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { ProfileBannerComponent } from '../profile-banner/profile-banner.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ProfileSelectionComponent } from '../profile-selection/profile-selection.component';
import { MessageFormComponent } from '../../shared/message-form/message-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    ProfileEditFormComponent,
    CommentFormComponent,
    ProfileSelectionComponent,
    WorkingTimeComponent,
    ProfilePicComponent,
    ProfileBannerComponent,
    LoaderComponent,
    MessageFormComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showExperience: boolean = true;
  showInformation: boolean = true;
  showPrice: boolean = true;
  showWorkingTime: boolean = true;
  showSendMessage: boolean = false;
  isEditing: boolean = false;
  editWorkingTime: boolean = false;
  day!: string;

  isEditingField!: keyof profileDetails;
  isLoading$!: Observable<boolean>;
  profileInformation$!: Observable<profileDetails | undefined>;
  profilePic$!: Observable<string | null>;
  profileBanner$!: Observable<string | null>;
  workTime$!: Observable<any>;
  id!: string;

  private routeSub!: Subscription;
  profilePicLoading$: Observable<boolean>;
  bannerLoading$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.profilePicLoading$ = this.userService.profilePicLoading$;
    this.bannerLoading$ = this.userService.bannerLoading$;
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.userService.setId(this.id);
    });
    this.loadData();
    this.profileInformation$ = this.userService.userInformation$;
    this.profilePic$ = this.userService.userPic$;
    this.profileBanner$ = this.userService.userBanner$;
    this.workTime$ = this.userService.userWorktime$;
  }

  loadData() {
    this.userService.getBanner();
    this.userService.getUserPic();
    this.userService.getInformation();
    this.userService.getWorkingTime();
  }

  get currentUser(): string | undefined {
    return this.userService.currentUsername;
  }

  get isOwner(): boolean {
    return this.userService.currentUserId === this.id;
  }

  uploadProfilePic({ file, type }: { file: File; type: string }): void {
    this.userService.uploadProfilePic(file, type);
  }

  uploadBanner({ file, type }: { file: File; type: string }): void {
    this.userService.uploadBanner(file, type);
  }

  saveChanges(data: { text: string; field: string }): void {
    this.userService.updateProfile(data.text, data.field);
  }

  onToggle(section: string): void {
    switch (section) {
      case 'experience':
        this.showExperience = !this.showExperience;
        break;
      case 'information':
        this.showInformation = !this.showInformation;
        break;
      case 'price':
        this.showPrice = !this.showPrice;
        break;
      case 'working':
        this.showWorkingTime = !this.showWorkingTime;
        break;
      case 'message':
        this.showSendMessage = !this.showSendMessage;
        break;
    }
  }
  enableEditing(field: keyof profileDetails) {
    this.isEditingField = field;
    this.isEditing = true;
  }

  onClose(): void {
    this.isEditing = false;
    this.editWorkingTime = false;
    this.showSendMessage = false;
  }

  workingTime(dayOfWeek: string) {
    this.editWorkingTime = !this.editWorkingTime;
    this.day = dayOfWeek;
  }

  updateWorkingTime({ day, time }: { day: string; time: string }) {
    this.userService.updateWorkingTime({ day, time });
  }

  days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
