// Import necessary dependencies
import { User } from "../modelMasoud/User";
import { Panier9ach } from "./panier9ach";
import { PanierStatut } from "./PanierStatut";

// Definition of the Post9ach interface
export interface Post9ach {
    idPost9ach?: number; // Optional property equivalent to Long IdPost9ach in Java
    title?: string;
    description?: string;
    image?: string;
    price?: number;
    quantity?: string;
    location?: string;
    nbslikes?:number;
    offerDate?: Date; // Date object to represent OfferDate
    statutPost?: string; // Enum PanierStatut for statutPost
etat?:string;
category?:string;
isLiked?: boolean;
quantitySold?:number;

    // Relationships with other interfaces
    user?: User; // Optional property for User association
    panier9ach?: Panier9ach; // Optional property for Panier9ach association
}
