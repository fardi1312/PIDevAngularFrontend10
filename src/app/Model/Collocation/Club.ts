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

  description: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  members: string[]; // Assuming members are represented by their usernames or IDs

  constructor(
    id: number,
    category: Category,
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
    this.name = name; 
    this.registrationDate = registrationDate ; 
    this.description = description;
    this.facebookUrl = facebookUrl;
    this.twitterUrl = twitterUrl;
    this.instagramUrl = instagramUrl;
    this.members = members;
  }
}
