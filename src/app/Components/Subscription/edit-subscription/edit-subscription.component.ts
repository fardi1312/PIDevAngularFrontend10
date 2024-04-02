import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import { SubscriptionService } from 'src/app/Services/Subscription/service-subscription.service';
@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css']
})
export class EditSubscriptionComponent {

  subscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.subscriptionService.getSubscriptionById(id).subscribe(
        data => {
          this.subscription = data;
        },
        error => {
          console.error('Error fetching subscription: ', error);
        }
      );
    }
  }

  saveSubscription() {
    if (this.subscription) {
      this.subscriptionService.updateSubscription(this.subscription.id, this.subscription).subscribe(
        () => {
          this.router.navigateByUrl('admin/dashboard');
        },
        error => {
          console.error('Error updating subscription: ', error);
        }
      );
    }
  }
  cancelEdit() {
    this.router.navigateByUrl('admin/dashboard');
  }
}
