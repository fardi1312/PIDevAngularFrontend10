import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';

export interface RoomDetails {
    idRoomDetails: number;
    availablePlaces: number;
    roomType: RoomType;
    prix: number;
    selected:boolean;

  }
  
  export enum RoomType {
    SINGLE = 'Single',
    DOUBLE = 'Double',
    SHARED = 'Triple'
    
    
}
  