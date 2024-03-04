// show-request.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationRequest } from 'src/app/Model/Collocation/CollocationRequest';
import { RequestService } from 'src/app/Services/Collocation/request.service';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.css']
})
export class ShowRequestComponent implements OnInit {
  requests: CollocationRequest[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getCollocationRequests().subscribe(
      (data) => {
        this.requests = data;
      },
      (error) => {
        console.error('Error loading requests:', error);
      }
    );
  }

  deleteRequest(id: number): void {
    this.requestService.deleteCollocationRequest(id).subscribe(data => {
      console.log(data);
      this.loadRequests();
    });
  }

  updateRequest(id: number): void {
    this.router.navigate(['Collocation/updateRequest', id]);
  }

}
