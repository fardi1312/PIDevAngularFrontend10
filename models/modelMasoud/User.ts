export interface User {
  idUser: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  intro: string;
  gender: string;
  hometown: string;
  currentCity: string;
  eduInstitution: string;
  workplace: string;
  profilePhoto: string;
  coverPhoto: string;
  followerCount: number;
  followingCount: number;
  enabled: boolean;
  accountVerified: boolean;
  emailVerified: boolean;
  birthDate: Date;
  joinDate: Date;
  dateLastModified: Date;
  role: String; // Assuming you have a Role class defined

  
 
  }
  