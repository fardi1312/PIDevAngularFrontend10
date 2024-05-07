import { User } from "../modelMasoud/User";

export interface CarpoolingRequest {
    CarppoolingRequestId?: number;
    ReservationDate?: Date;
    NbPlacesAller?: number;
    NbPlacesRetour?: number;
    requestStatus?: string; 
    priceRequeste?: number;
    requestType?: string; 
    DateRetourReserver?: Date[];
    DateAllerReserver?: Date[];
  }
  
