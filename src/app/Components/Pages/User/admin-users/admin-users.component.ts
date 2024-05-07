import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/services/User/AdminService';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  totalUserCount: number | null = null;
  errorMessage: any;
  chart: any = [];
  chartJoin:  any = [];
  loading!: boolean;
  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getTotalUserCount();
    this.createChartLine();
   this.createChartPie();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching all users:', error);
      }
    );
  }

  deleteUser(email: string): void {
    this.adminService.deleteUser(email).subscribe(
      () => {
        console.log('User deleted successfully');
        this.getAllUsers(); // Refresh user list after deletion
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  disableUser(email: string): void {
    this.adminService.disableUserAccount(email).subscribe(
      () => {
        console.log('User account disabled successfully');
        this.getAllUsers(); // Refresh user list after account disablement
      },
      (error) => {
        console.error('Error disabling user account:', error);
      }
    );
  }

  enableUser(email: string): void {
    this.adminService.enableUserAccount(email).subscribe(
      () => {
        console.log('User account enabled successfully');
        this.getAllUsers(); // Refresh user list after account enablement
      },
      (error) => {
        console.error('Error enabling user account:', error);
      }
    );
  }

  getTotalUserCount(): void {
    this.adminService.getTotalUserCount().subscribe(
      (count) => {
        this.totalUserCount = count;
      },
      (error) => {
        console.error('Error fetching total user count:', error);
      }
    );
  }

  openUserDetailsDialog(email: string): void {
    this.adminService.getUserByEmail(email).subscribe(
      (user) => {
        this.dialog.open(UserDetailsDialogComponent, {
          data: user
        });
      },
      (error) => {
        console.error('Error fetching user by email:', error);
      }
    );
  }


  
  createChartPie(): void {
    // Récupération des données sur les utilisateurs activés et désactivés
    this.adminService.getAllUsers().subscribe(
      (users) => {
        const enabledUsersCount = users.filter(user => user.enabled).length;
        const disabledUsersCount = users.filter(user => !user.enabled).length;
  
        // Création du graphique
        this.chart = new Chart("MyChartEnabled", {
          type: 'pie',
          data: {
            labels: ['Enabled', 'Disabled'],
            datasets: [{
              data: [enabledUsersCount, disabledUsersCount],
              backgroundColor: [
                'green',
                'red'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            aspectRatio: 2.5
          }
        });
      },
      (error) => {
        console.error('Error fetching all users:', error);
      }
    );
  }

/*
  createChartLine(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe(
      (users: User[]) => {
        const userDates = users.map(user => new Date(user.joinDate));
        const dates = userDates.map(date => this.formatDateTime(date)); // Convertir les dates au format "YYYY-MM-DD HH:mm:ss"

        const ctx = document.getElementById('MyChartJoin') as HTMLCanvasElement;
        this.chartJoin = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Date Joined',
              data: userDates,
              fill: false,
              borderColor: 'blue',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 20
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Date Joined'
                }
              }
            }
          }


        });
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching users. Please try again later.';
        console.error('Error fetching all users:', error);
        this.loading = false;
        console.log('Chart creation failed======================');

      }
    );
  }*/







  createChartLine(): void {
    this.loading = true;
    // Exemple de 5 dates
    const exampleDates = [
      new Date('2024-04-27T10:23:43'),
      new Date('2024-04-26T09:15:30'),
      new Date('2024-04-25T14:45:22'),
      new Date('2024-04-24T16:30:10'),
      new Date('2024-04-23T11:20:05')
    ];
  
    // Formatage des dates
    const dates = exampleDates.map(date => this.formatDateTime(date));
  
    // Création du graphique
    const ctx = document.getElementById('MyChartJoin') as HTMLCanvasElement;
    this.chartJoin = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Date Joined',
          data: exampleDates,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'rgba(255, 0, 0, 0.2)', // Fond rouge avec opacité
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            }
          },
          y: {
            title: {
              display: true,
              text: 'Date Joined'
            }
          }
        }
      }
    });
  
    this.loading = false;
  }
  
  



  
  // Fonction pour formater une date en "YYYY-MM-DD HH:mm:ss"
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  

}
