<<<<<<< HEAD

import { Gender } from "./CollocationOffer";
import { RoomType } from "./RoomDetails";
=======
// collocation-preferences.model.ts
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd

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
  }
  
<<<<<<< HEAD
  export enum Pets {
    Cats = 'Cats', 
  Hamsters = 'Hamsters', 
  Dogs = 'Dogs', 
  Birds = 'Birds', 
  No = 'No'
  }
  

  
  export enum Interest { 
    SPORT = 'Sport',
    MUSIC = 'Music',
    TRAVEL = 'Travel',
    READING = 'Reading',
    OTHER = 'Other'
  
  } 

=======
  export enum Pets {Cats = "Cats" , 
  Hamsters = "Hamsters", 
  Dogs = "Dogs", 
  Birds = "Birds" , 
  No = "No"  
  }
  
  export enum Gender { 
    Male = "Male",  
    Female = "Female" ,  
    Other = "Other", 
    Male_or_Female = "Male_or_Female" 

  }
  
  export enum Interest { 
    SPORTS = 'Sports',
    MUSIC = 'Music',
    TRAVEL = 'Travel',
    READING = 'Reading',
    GAMING = 'Gaming',
    COOKING = 'Cooking',
    ART = 'Art',
    MOVIES = 'Movies',
    OTHER = 'Other'
  
  }
  
  export enum RoomType { 
    Single = "Single",  
    Double = "Double", 
    Triple = "Triple" 
  }
  
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd
