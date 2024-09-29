import { Subscription } from 'rxjs';

export class SubscriptionManager {
  private subscriptions: Subscription[] = [];

  set newSubs(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  clearSubs(): void {
    this.subscriptions.forEach((subscription: Subscription): void => {
      subscription.unsubscribe();
    });
  }
}
