import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import {Club,Category} from 'src/app/Model/Collocation/Club'; 
import { ClubService } from 'src/app/Services/Collocation/club.service'; 
import axios from 'axios';


@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit{ 
  club:Club = {
    id: 0,
    name: '',
    description: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',

    category: Category.SPORTS,
    registrationDate: new Date(),
    logo: '',
    members: []
  };     
  showDropdown = false;

  model = {
    registrationDate: new Date(),
  }; 
  handleFileInput(event: any): void { 
    console.log('hello handle file input');
    const file: File = event.target.files[0];

    if (file) { 
      console.log('converting ... ');  
      this.convertFileToBase64(file); 
    } 

  }  
  
  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.club.logo = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }



  selectCategory(category: Category): void {
    this.club.category = category;
    this.hideDropdown();
  } 
    getEnumValue(categoryString: string): Category {
    return Category[categoryString as keyof typeof Category];
  }


  hideDropdown(): void {
    this.showDropdown = false;
  } 

  getCategoryName(category: Category): string {
    return Category[category];
  } 



  userId = 1 ; 
  categoryOptions = Object.values(Category) ; 

  constructor(private clubService:ClubService , private router: Router) {}

  
  onSubmit(): void {  
    this.clubService.createClub(this.club,this.userId).subscribe( 
      (createCub:Club) => { 
        console.log("club Create Successfully" , createCub) ; 
      }, 
      (error)=> { 
        console.error("Error saving Club", error) ; 
      } 
    ) ; 
  } 
  

  ngOnInit(): void { 
  }

}
