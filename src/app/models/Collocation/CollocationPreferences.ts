
import { FurnitureCollocation, Gender } from "./CollocationOffer";
import { RoomType } from "./RoomDetails";

export interface CollocationPreferences {
    idCollocationPreferences: number;
    pets: Pets;
    smoking: boolean;
    budget: number;
    gender: Gender;
    interest: Interest;
    roomType: RoomType;
    houseType: number;
    location: string;
    furnitureCollocation: FurnitureCollocation;
    user:User;
  }
  export class User {
    id!: number;
    email!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    intro!: string;
    hometown!: string;
    currentCity!: string;
    eduInstitution!: string;
    workplace!: string;
    profilePhoto!: string;
    coverPhoto!: string;
    role!: string;
    followerCount!: number;
    followingCount!: number;
    enabled: boolean = false;
    accountVerified: boolean = false;
    emailVerified: boolean = false;
    birthDate!: string;
    joinDate!: string; 
    dateLastModified!: string;
    phoneNumber!: string;
}
  
  export enum Pets {
    Cats = 'Cats', 
  Hamsters = 'Hamsters', 
  Dogs = 'Dogs', 
  Birds = 'Birds',
  No='No'

  }
  export enum Interest {
    Sport = 'Sport',
    Music = 'Music',
    Travel = 'Travel',
    Reading = 'Reading',
    No = 'No'
}


