import { Subscription } from "../Subscription/Subscription";
import { User } from "../User/user";
export class Registration {
  id!: number;
  user!: User;
  subscription!: Subscription;
  startDate!: Date;
  endDate!: Date | null; // Update to accept null
  status!: string; 
}
