import { RoomDetails } from "./RoomDetails"; 
import { Interest, Pets } from "./CollocationPreferences"; 
import { User } from "./User";

  export interface CollocationOffer {
    idCollocationOffer: number;
    averageRating:number;
    locationLx: string ;
    locationLy: string;
    governorate: string;
    country: string;
    city: string;
    streetAddress: string;
    saved:boolean;

    houseType: number;
    availablePlaces: number;
    dateRent: Date;
    dateOffer: Date;
    gender: Gender;
    price: number;
    furnitureCollocation: FurnitureCollocation;
    descriptionCollocation: string;
    imageCollocation: string;
    roomDetailsList: RoomDetails[]; 
   smokingAllowed: boolean;
    petsAllowed: Pets; 
    interest: Interest;
   matchPercentage:number;
   user:User;



  }
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}
export enum FurnitureCollocation {
  Furnitured = 'Furnitured',
  Semi = 'Semi',
  Non = 'Non'
}
