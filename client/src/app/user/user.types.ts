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
    userType: string;
  }
  
  export interface profileDetails {
    about: string;
    studies: string;
    services: string;
    location: string;
    price: string;
    name: string;
  }
  
  export interface ImageResponse {
    banner: string;
    profilePic: string;
  }
  