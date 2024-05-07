import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { Post9ach } from 'src/app/models/modelS/Post9ach';

@Component({
  selector: 'app-editpost9ach',
  templateUrl: './editpost9ach.component.html',
  styleUrls: ['./editpost9ach.component.css']
})
export class Editpost9achComponent implements OnInit {
  post: Post9ach = {};
  files: File[] = [];
  myForm1: FormGroup;
  pathimage: string = '';

  constructor(
    private ecommerceService: EcommerceService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.myForm1 = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const idPost9ach = this.route.snapshot.paramMap.get('idPost9ach');
    if (idPost9ach) {
      this.ecommerceService.findPostByIdPost(+idPost9ach).subscribe(
        (post: Post9ach) => {
          this.post = post;
          this.myForm1.patchValue(post);
        },
        (error) => {
          console.error('Error fetching post:', error);
          this.toaster.error('Error fetching post');
        }
      );
    }
  }

  onSelect(event: NgxDropzoneChangeEvent): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  updatePost(): void {
    if (this.myForm1.invalid) {
      this.toaster.error('Please correct form errors before updating.');
      return;
    }

    const updatedPost: Post9ach = { ...this.post, ...this.myForm1.value };

    if (this.files.length > 0) {
      updatedPost.image = this.files[0].name;
    }
    console.log("rrr",this.post.idPost9ach!)

    this.ecommerceService.updatePost(this.post.idPost9ach!, updatedPost).subscribe(
      (updatedPost: Post9ach) => {
        console.log('Post updated successfully:', updatedPost);
        this.toaster.success('Post updated successfully');
      this.router.navigate(['/smprofile/post9ach']); 
      },
      (error) => {
        console.error('Error updating post:', error);
        this.toaster.error('Error updating post');
      }
    );
  }
  // Add getters for form controls
get title() {
  return this.myForm1.get('title');
}

get price() {
  return this.myForm1.get('price');
}

get quantity() {
  return this.myForm1.get('quantity');
}

get location() {
  return this.myForm1.get('location');
}

get category() {
  return this.myForm1.get('category');
}

get etat() {
  return this.myForm1.get('etat');
}

get description() {
  return this.myForm1.get('description');
}

// Ensure you have the `validate` property defined somewhere in your component
validate: boolean = false;

// Define a track function for the `trackBy` binding in your template
trackFn(index: number, file: File): string {
  return file.name; // You can return any unique identifier of the file
}

}
