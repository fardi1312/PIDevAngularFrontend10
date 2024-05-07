import { User } from './User'; // Adjust the path as needed
import { Club } from './Club'; // Adjust the path as needed 
import { RequestEnum } from './CollocationRequest';

export class MemberShipApplication {
  id: number;
  status: RequestEnum;
  date: Date;
  user: User;
  club: Club;
  message: string; 
  interviewer : string ;  
  position : string ; 

  constructor(
    id: number,
    status: RequestEnum, 
    interviewer : string ,  
    position : string,
    date: Date,
    user: User,
    club: Club,
    message: string
  ) {
    this.id = id; 
    this.interviewer = interviewer
    this.status = status;
    this.date = date; 
    this.position = position ; 
    this.user = user;
    this.club = club;
    this.message = message;
  }
}
