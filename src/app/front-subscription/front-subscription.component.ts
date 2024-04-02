import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import { SubscriptionService } from 'src/app/Services/Subscription/service-subscription.service';

@Component({
  selector: 'app-front-subscription',
  templateUrl: './front-subscription.component.html',
  styleUrls: ['./front-subscription.component.css']
})
export class FrontSubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService) { }

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
}
