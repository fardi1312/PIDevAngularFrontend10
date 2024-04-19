
import { Gender } from "./CollocationOffer";
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
  }
  
  export enum Pets {
    Cats = 'Cats', 
  Hamsters = 'Hamsters', 
  Dogs = 'Dogs', 
  Birds = 'Birds', 
  No = 'No'
  }
  

  
  export enum Interest {  
    ART = 'ART', 
    SPORT = 'Sport',
    MUSIC = 'Music',
    TRAVEL = 'Travel',
    READING = 'Reading',
    OTHER = 'Other'

  } 

