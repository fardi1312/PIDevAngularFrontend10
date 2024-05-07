import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Club, Category }  from 'src/app/models/Collocation/Club';
import { ClubService } from 'src/app/services/Collocation/club.service';
import { User } from 'src/app/models/modelMasoud/User';
import { ClubMembership } from 'src/app/models/Collocation/ClubMemberShip';
import { I } from '@angular/cdk/keycodes';
import { addPropertyStepsData } from 'src/app/shared/data/add-property';


@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {

  public addPropertyStepsData = addPropertyStepsData;
  public activeSteps: number=0;

  email = new FormControl('');
  positionOptions: string[] = ['Manager', 'Developer', 'Designer', 'Engineer', 'Human Resources'];
  clubFormBasic!: FormGroup;
  clubFormSocialMedia!: FormGroup; 
  clubFormMembership!: FormGroup; 


  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  instagramUrlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+(\/\S*)?$/;
  idNouveau : number = 0 ; 

  club: Club = {
    id: 0,
    name: '',
    openMembership: false,
    description: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    otherCategory: '',

    category: Category.SPORTS,
    registrationDate: new Date(),
    logo: '',
    members: [],
    president: new User,
    clubMemberShip: [] as ClubMembership[],
    memberShipApplications: []
  };
  inputValues: { email: string, position: string }[] = [];
uploadedImage:File|null = null  ; 
  clubMemberShip: ClubMembership[] = [{
    id: 0,
    member: new User(),
    email: '',
    emailVerified: false,
    position: '',
    description: '', 
    date: new Date() 

  }];
  currentStep: number = 0;
  totalSteps = 3;
  showDropdown = false;

  steps = [
    { title: 'Info' },
    { title: 'Social Media' },
    { title: 'Members' },
    { title: 'Finish' }
  ];

  model = {
    registrationDate: new Date(),
  };
  
  emailExists: boolean[] = [];
  deleteMember(i: number) {
    this.club.clubMemberShip.splice(i, 1);

  }
  addMember() {
    // Add a new member to the club
    const newMember: ClubMembership = {
      id: 0,
      member: new User(),
      email: '',
      emailVerified: false,
      position: '',
      description: '',
      date: new Date()
    };
    this.club.clubMemberShip.push(newMember);
    this.emailExists.push(false);
  }
  nextStep(): void {
    this.currentStep++;
  }

  previousStep(): void {
    this.currentStep--;
  }




  selectCategory(category: Category): void {
    this.club.category = category;
    this.hideDropdown();
  }
  onCategoryChange() {
    if (this.club.category !== 'OTHER') {
      this.club.otherCategory = '';
    }
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



  userId = 1;
  categoryOptions = Object.values(Category);

  constructor(private clubService: ClubService, private router: Router, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) { }


  onSubmit(): void {
    if (this.clubFormBasic.valid) {

      console.log("testttes",this.club)

      this.clubService.createClub(this.club, this.userId).subscribe(
        
        (createdClub: Club) => {
          console.log("Club created successfully", createdClub);
          this.idNouveau = createdClub.id;
          console.log("New club ID:", this.idNouveau);
          console.log("Uploaded image:", this.uploadedImage);
          
          // Call updateImage only after the club is successfully created
          this.clubService.updateImage(this.idNouveau, this.uploadedImage!).subscribe(
            () => {
              console.log("Image updated successfully");
              this.router.navigate(['Club/showClubs']);
            },
            (error) => {
              console.error("Error updating image", error);
            }
          );
        },
        (error) => {
          console.error("Error creating club", error);
        }
      );
    }
  }
  


  handleFileInput(event: any): void { 
    this.uploadedImage=event.target.files[0];
    
      }
    
    
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!; // Add non-null assertion operator
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
  async handleEmailVerification(email: string, index: number) {
    try {
      console.log(this.club.clubMemberShip);
      const verificationResult = await this.verifyEmail(email, index);
      this.emailExists[index] = verificationResult.exists;
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  }

  verifyEmail(email: string, index: number): Promise<{ index: number, exists: boolean }> {
    return new Promise<{ index: number, exists: boolean }>((resolve, reject) => {


      this.clubService.verifyEmail(email).subscribe(
        (newUser) => {
          if (newUser) {
            this.club.clubMemberShip[index].member = newUser;

            resolve({ index: index, exists: true });
          } else {
            this.club.clubMemberShip[index].member.firstName = '';
            this.club.clubMemberShip[index].member.lastName = '';
            console.warn('Email does not exist:', email);
            resolve({ index: index, exists: false });
          }
        },
        (error) => {
          console.error('Error verifying email:', error);
          resolve({ index: index, exists: false });
        }
      );
    });
  }

  ngOnInit(): void {
    const data = addPropertyStepsData.filter((data) => {
      return data.stepNumber === 1;
    });
    this.activeSteps = data[0].stepNumber;

    this.clubFormBasic = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      openMembership: ['false', Validators.required],
      description: ['', Validators.required],
    });

    this.clubFormSocialMedia = this.formBuilder.group({
      facebookUrl: ['', Validators.pattern(this.urlRegex)],
      twitterUrl: ['', Validators.pattern(this.urlRegex)],
      linkedinUrl: ['', Validators.pattern(this.urlRegex)],
      instagramUrl: ['', Validators.pattern(this.instagramUrlPattern)],
    });

    this.clubFormMembership = this.formBuilder.group({
      // Define membership form fields here
      // Example:
      email: ['', [Validators.required, Validators.email]],
    });


    const newMember: ClubMembership = {
      id: 0,
      member: new User(), // Assuming you have a User model
      email: '',
      emailVerified: false,
      position: '',
      description: '',
      date: new Date() 
    };

    this.club.clubMemberShip.push(newMember);


  }

}
