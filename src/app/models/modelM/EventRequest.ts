import { User } from "../modelMasoud/User";
import { Events } from "./Events";



export interface EventRequest {
    EventRequestId?: number;
 
    events? : Events;
    user?: User;
  

    
  }
  
