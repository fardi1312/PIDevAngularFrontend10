import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import { SubscriptionService } from 'src/app/Services/Subscription/service-subscription.service';
@Component({
  selector: 'app-delete-subscription',
  templateUrl: './delete-subscription.component.html',
  styleUrls: ['./delete-subscription.component.css']
})


export class DeleteSubscriptionComponent implements OnInit {
  subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    const subscriptionId = this.route.snapshot.paramMap.get('id');
    if (subscriptionId) {
      this.subscriptionService.getSubscriptionById(parseInt(subscriptionId, 10)).subscribe(
        data => {
          this.subscription = data;
        },
        error => {
          console.log('Error fetching subscription: ', error);
        }
      );
    }
  }

  deleteConfirmed() {
    if (this.subscription) {
      this.subscriptionService.deleteSubscription(this.subscription.id).subscribe(
        () => {
          // Handle successful deletion
          this.router.navigate(['/admin/dashboard']); // Redirect to subscriptions list
        },
        error => {
          console.error('Error deleting subscription: ', error);
          // Handle error
        }
      );
    }
  }

  deleteCanceled() {
    this.router.navigate(['/admin/dashboard']); // Redirect to subscriptions list
  }
}
