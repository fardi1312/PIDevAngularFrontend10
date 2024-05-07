import { User } from "../modelMasoud/User";
import { Events } from "./Events";


export interface Comment {
  id?: number;
  content?: string;
  createdAt?: Date; 
  user?: User;
  event?: Events;
}


