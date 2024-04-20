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
  instagramUrl: string;
  members: string[]; // Assuming members are represented by their usernames or IDs
  openMembership:boolean
  constructor(
    id: number, 
    openMembership:boolean, 
    category: Category, 
    otherCategory: string , 
    logo: string,
    name: string, 
    registrationDate:Date, 
    description: string,
    facebookUrl: string,
    twitterUrl: string,
    instagramUrl: string,
    members: string[]
  ) {
    this.id = id;
    this.category = category;
    this.logo = logo; 
    this.otherCategory = otherCategory ; 
    this.name = name;  
    this.openMembership = openMembership ; 
    this.registrationDate = registrationDate ; 
    this.description = description;
    this.facebookUrl = facebookUrl;
    this.twitterUrl = twitterUrl;
    this.instagramUrl = instagramUrl;
    this.members = members;
  }
}
