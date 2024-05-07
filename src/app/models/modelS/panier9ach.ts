// Import necessary dependencies
import { Post9ach } from "./Post9ach";
import { RequestPost9ach } from "./RequestPost9ach";
import { User } from "../modelMasoud/User";
import { PanierStatut } from "./PanierStatut";

// Definition of the Panier9ach interface
export interface Panier9ach {
    idPanier9ach?: number; // Optional property equivalent to Long IdPanier9ach in Java
    satatuspanier?:string; // Enum PanierStatut for statusPanier
    totaleprice?: number; 
    // Relationships with other interfaces
    post9achs?: Post9ach[]; // Optional array of Post9ach equivalent to List<Post9ach> Post9achs in Java
    requestPost9ach?: RequestPost9ach; // Optional property for RequestPost9ach association
    user?: User;
    BuyDate?: Date; 
}
