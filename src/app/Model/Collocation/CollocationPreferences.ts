// collocation-preferences.model.ts

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
  
