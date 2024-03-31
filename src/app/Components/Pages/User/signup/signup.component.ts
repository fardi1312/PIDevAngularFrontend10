import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignup } from 'src/app/Model/User/user-signup';
import { AuthService } from 'src/app/Services/User/AuthService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userSignup: UserSignup = new UserSignup(); // Initialize UserSignup object

  constructor(
    private service: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required], // Add passwordRepeat control
    });
  }

  signup() {
    // Assign form values to UserSignup properties
    this.userSignup.firstName = this.signupForm.value.firstName;
    this.userSignup.lastName = this.signupForm.value.lastName;
    this.userSignup.email = this.signupForm.value.email;
    this.userSignup.password = this.signupForm.value.password;
    this.userSignup.passwordRepeat = this.signupForm.value.passwordRepeat;

    // Call the service signup method with UserSignup object
    this.service.signup(this.userSignup).subscribe((response) => {
      console.log(response);
    });
  }
  callGithubMethod() {
    this.service.github().subscribe((data: any) => {
      console.log(data); // Manipulate response data as needed
    }, (error: any) => {
      console.error(error); // Handle errors if any
    });
  }

  redirectToGitHubAuthorization() {
    // Rediriger vers l'URL d'autorisation OAuth2 pour GitHub
    window.location.href = 'http://localhost:8083/oauth2/authorization/github';
  }

  redirectToGoogleAuthorization() {
    // Rediriger vers l'URL d'autorisation OAuth2 pour GitHub
    window.location.href = 'http://localhost:8083/oauth2/authorization/google';
  }
}
