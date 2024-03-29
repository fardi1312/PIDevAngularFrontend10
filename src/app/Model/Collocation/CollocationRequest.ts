import { RoomDetails } from "./RoomDetails";

export enum RequestEnum {
    Approved = "Approved",
    Pending = "Pending",
    Canceled = "Canceled"
  }
  
  export interface CollocationRequest {
    idCollocationRequest: number;
    request: RequestEnum; 
    date:Date; 
    places: number;
    description: string;  
    roomDetailsList:RoomDetails[];  
    selectedDate:Date[]; 
  }
  