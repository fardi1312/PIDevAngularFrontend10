import { User } from "../modelMasoud/User";
import { Comment } from "../modelM/Comment";


export interface Events {
  eventID?: number;
    title?: String;
    dateE?: Date;
    dateCreation?: Date;
    description?: String;
    category?: String;
    image?: String;
    attendeeCount?: number;
    attendeeRest?: number
    rating?: number;
    price?: number;
    conditionOfParticipation?: String;
    eventStatus?: string;
    userE?: User;
    comments: Comment[];
    likesCount: number;
    
  }
  
