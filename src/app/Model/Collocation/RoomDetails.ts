import { CollocationOffer } from 'src/app/Model/Collocation/CollocationOffer';

export interface RoomDetails {
    idRoomDetails: number;
    availablePlaces: number;
    roomType: RoomType;
    prix: number;
  }
  
  export enum RoomType {
    SINGLE = 'Single',
    DOUBLE = 'Double',
    SHARED = 'Triple'
    
    
}
  