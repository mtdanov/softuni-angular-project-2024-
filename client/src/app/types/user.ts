export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  province: string;
  municipality: string;
  personContact: string;
  phoneNumber: string;
}

export interface UserForAuth {
  accessToken: string;
  email: string;
  id: string;
  name: string;
}

export interface profileDetails {
  about: string;
  studies: string;
  services: string;
  type: string;
  location: string;
  price: string;
}

export interface ImageResponse {
  banner: string;
  profilePic: string;
}

export interface GetUser {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  profilePic: string;
}
 export interface SearchParams {
  professional?: string;
  location?: string;
  searchField?: string;
}

export interface GetUserSearch {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  profilePic: string;
  userType: string;
}

export interface UserResponse {
  result: GetUser[];
  totalUsers: number;
}
