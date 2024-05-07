import { User } from "../modelMasoud/User";

export interface CarpoolingRequest {
    CarppoolingRequestId?: number;
    reservationDate?: Date;
    nbPlacesAller?: number;
    nbPlacesRetour?: number;
    requestStatus?: string; 
    priceRequeste?: number;
    requestType?: string; 
    location?: string;
    dateRetourReserver?: Date[];
    dateAllerReserver?: Date[];
  
  }
  
