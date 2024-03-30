import { User } from "../modelMasoud/User";


export interface CarpoolingPreferences {
    idCarpoolingPreferences?: number;
    budget?: number;
    gender?: String;
    carpoolingType?: String;
    nbPlaces?: number;
    location?: string;
    description?: string;
    radioon?: boolean;
    climatise?: boolean;
    chauffage?: boolean;
    smoking?: boolean;
    userS?: User;
}
