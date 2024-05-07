import { ClubMembership } from "./ClubMemberShip";
import { MemberShipApplication } from "./MemberShipApplication";
import { User } from "./User";

export enum Category {
  SPORTS = 'SPORTS',
  ACADEMIC = 'ACADEMIC',
  CULTURAL = 'CULTURAL',
  SOCIAL = 'SOCIAL',
  PROFESSIONAL = 'PROFESSIONAL',
  OTHER = 'OTHER'
}

export class Club {
  id: number;
  category: Category;
  logo: string;
  name: string; 
  registrationDate: Date; 
  otherCategory : string ;  
  description: string;
  facebookUrl: string;
  twitterUrl: string; 
  linkedinUrl: string; 
  instagramUrl: string;
  members: User[];  
  clubMemberShip : ClubMembership[];  
  memberShipApplications : MemberShipApplication[] ; 
  president:User;  
  openMembership:boolean
  constructor(
    id: number, 
    openMembership:boolean, 
    clubMemberShip : ClubMembership[], 
    category: Category, 
    otherCategory: string , 
    logo: string,
    name: string, 
    registrationDate:Date, 
    description: string,
    facebookUrl: string,
    twitterUrl: string, 
    linkedinUrl:string, 
    instagramUrl: string, 
    president : User,  
    memberShipApplications:MemberShipApplication[], 
    members: User[]
  ) {
    this.id = id;
    this.category = category;
    this.logo = logo; 
    this.otherCategory = otherCategory ; 
    this.name = name;  
    this.openMembership = openMembership ;  
    this.memberShipApplications = memberShipApplications ; 
    this.registrationDate = registrationDate ; 
    this.description = description;
    this.facebookUrl = facebookUrl;
    this.twitterUrl = twitterUrl; 
    this.linkedinUrl = linkedinUrl ; 
    this.instagramUrl = instagramUrl; 
    this.clubMemberShip = clubMemberShip ; 
    this.members = members; 
    this.president = president ; 
  }
}
