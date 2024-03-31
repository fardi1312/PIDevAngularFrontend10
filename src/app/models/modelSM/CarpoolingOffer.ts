import { User } from "../modelMasoud/User";
import {  CarpoolingRequest} from "../modelSM/CarpoolingRequest";
import { Coordinates } from "./Coordinates";

export interface CarpoolingOffer {
    carpoolingOfferID?: number;
    location?: string;
    dateAller?: String;
    dateRetour?: String;
    placeDispoAller?: number;
    placeDispoRetour?: number;
    price?: number;
    description?: string;
    img?: string;
    carpoolingStatus?: string;
    offerDate?: Date;
    forWho?: string;
    carpoolingType?: string;
    radioon?: string;
    climatise?: boolean;
    chauffage?: boolean;
    smoking?: boolean;
    carpoolingRequests?: CarpoolingRequest[];
    user?: User;
    locationLx: string ;
    locationLy: string;
    traget?: string;
    targets?: Coordinates[];





    
  }
  
 
  
  