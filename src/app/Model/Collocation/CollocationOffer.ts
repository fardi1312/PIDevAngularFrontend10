import { RoomDetails } from "./RoomDetails";

  export interface CollocationOffer {
    idCollocationOffer: number;
    location: string;
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
