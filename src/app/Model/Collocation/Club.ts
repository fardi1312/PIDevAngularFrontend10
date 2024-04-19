
export enum Category {  
    SPORTS,
    ACADEMIC,
    CULTURAL,
    SOCIAL,
    PROFESSIONAL,
    OTHER
}

export class Club {
  id: number;
  category: Category;
  name: string; 
  description: string; 
  registrationDate:Date ; 

  constructor(
    id: number,
    category: Category,
    name: string, 
    registrationDate:Date, 
    description: string,
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.description = description;  
    this.registrationDate = registrationDate ; 
    
  }
}
