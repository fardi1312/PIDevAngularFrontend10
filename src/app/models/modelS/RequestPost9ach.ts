// Import necessary dependencies
import { Panier9ach } from "./panier9ach";
import { User } from "../modelMasoud/User";

// Definition of the RequestPost9ach interface
export interface RequestPost9ach {
    idRequestPost9ach?: number; // Optional property equivalent to Long IdRequestPost9ach in Java

    // Relationships with other interfaces
    panier9ach?: number; // Optional property equivalent to Panier9ach panier9ach in Java
    user?: User; // Optional property equivalent to User user in Java
}
