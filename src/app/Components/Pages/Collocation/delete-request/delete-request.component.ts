// delete-request.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/Collocation/request.service';

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css']
})
export class DeleteRequestComponent implements OnInit {
  idRequest: number = 0;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRequest = +params['idRequest'] || 0;
    });
  }

  deleteRequest(): void {
    this.requestService.deleteCollocationRequest(this.idRequest).subscribe(
      () => {
        console.log('Request deleted successfully.');
        this.goToRequestList();
      },
      (error) => {
        console.error('Error deleting request:', error);
      }
    );
  }

  goToRequestList(): void {
    this.router.navigate(['/Collocation/showRequest']);
  }
}
