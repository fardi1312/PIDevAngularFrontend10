import { User } from "./User";

export class ClubMembership {
    id!: number;
    member!: User;
    email!: string;
    emailVerified!: boolean;
    position!: string;
    description!: string;   
    date!: Date ; 
  }
  
  
