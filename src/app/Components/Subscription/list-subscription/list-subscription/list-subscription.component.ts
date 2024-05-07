import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import { SubscriptionService } from 'src/app/services/Subscription/service-subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.css']
})
export class ListSubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getAllSubscriptions().subscribe(
      data => {
        this.subscriptions = data;
      },
      error => {
        console.log('Error fetching subscriptions: ', error);
      }
    );
  }

  editSubscription(subscription: Subscription) {
    this.router.navigate(['/admin/subscription/edit', subscription.id]);
  }

  deleteSubscription(subscription: Subscription) {
    this.router.navigate(['/admin/subscription/delete', subscription.id]);

  }

   

}
