import { HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Post } from 'src/app/Model/User/post';
import { Tag } from 'src/app/Model/User/tag';
import { User } from 'src/app/Model/User/user'; // Verifique se o caminho de importação está correto
import { TimelineService } from 'src/app/Services/Forum/timeline.service';
import { AdminService } from 'src/app/Services/User/AdminService';

@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.css']
})
export class UserstatComponent implements AfterViewInit {
  @ViewChild('myChartEnabled') private chartEnabledRef!: ElementRef;
  @ViewChild('myChartJoin') private chartJoinRef!: ElementRef;
  @ViewChild('myChartGender') private chartRefGender!: ElementRef;
  @ViewChild('myChartAge') private chartAgeRef!: ElementRef;
  @ViewChild('myChartCity') private chartCityRef!: ElementRef;
  @ViewChild('myChartTags') private chartTagsRef!: ElementRef;
  @ViewChild('myChartPosts') private chartPostsRef!: ElementRef;
  @ViewChild('myChartPostsCount') private chartPostCountsRef!: ElementRef;
 
 
  tags: Tag[] = [];
  chartTags: any;
  posts: Post[] = [];
  chartPosts: any;
  chartPostsCount: any;
  chartCity: any = [];
  chartEnabled: any = [];
  chartJoin: any = [];
  chartGender: any = [];
  chartAge: any = [];

  users: User[] = [];

  constructor(private adminService: AdminService, private timelineService: TimelineService) {}

  ngAfterViewInit() {
    this.fetchUsersAndCreateChart();
    this.getTimelineTags();
    this.getTimelinePosts();
  }

  fetchUsersAndCreateChart(): void {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.createChartPie();
        this.createChartJoin();
        this.createChartPieGender();
        this.createChartAge();
        this.createChartCity();

      },
      (error) => {
        console.error('Erro ao buscar todos os usuários:', error);
      }
    );
  }

  createChartPie(): void {
    const enabledUsersCount = this.users.filter(user => user.enabled).length;
    const disabledUsersCount = this.users.filter(user => !user.enabled).length;
  
    this.chartEnabled = new Chart(this.chartEnabledRef.nativeElement, {
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
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'User Status'
          }
        }
      }
    });
  }
  
  createChartJoin(): void {
    const joinDates = this.users.map(user => new Date(user.joinDate));
    const joinDatesByDate = joinDates.reduce((acc, date) => {
      const fullDate = date.toISOString().split('T')[0];
      acc[fullDate] = (acc[fullDate] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    const labels = Object.keys(joinDatesByDate).map(fullDate => fullDate);
    const data = Object.values(joinDatesByDate);
  
    this.chartJoin = new Chart(this.chartJoinRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Users Joined',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: data
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Users Joined by Date'
          }
        }
      }
    });
  }
  
  createChartPieGender(): void {
    const genderCounts = this.getUsersByGender();
  
    this.chartGender = new Chart(this.chartRefGender.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [genderCounts.male, genderCounts.female],
          backgroundColor: [
            'blue',
            'pink'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'User Gender'
          }
        }
      }
    });
  }
  
  createChartAge(): void {
    const ageGroups = this.calculateAgeGroups();
  
    this.chartAge = new Chart(this.chartAgeRef.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(ageGroups),
        datasets: [{
          label: 'Users by Age Group',
          data: Object.values(ageGroups),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'User Age Groups'
          }
        }
      }
    });
  }
  
  createChartCity(): void {
    const cityCounts = this.getUsersByCity();
  
    this.chartCity = new Chart(this.chartCityRef.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(cityCounts),
        datasets: [{
          label: 'Users by City',
          data: Object.values(cityCounts),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'User Cities'
          }
        }
      }
    });
  }
  




  getUsersByGender(): { male: number, female: number } {
    let maleCount = 0;
    let femaleCount = 0;
    this.users.forEach(user => {
      if (user.gender === 'male') {
        maleCount++;
      } else if (user.gender === 'female') {
        femaleCount++;
      }
    });

    return { male: maleCount, female: femaleCount };
  }



  calculateAgeGroups(): { [ageGroup: string]: number } {
    const currentDate = new Date();
    const ageGroups: { [ageGroup: string]: number } = {
      'Menos de 18': 0,
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65 e acima': 0
    };

    this.users.forEach(user => {
      const birthDate = new Date(user.birthDate);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const ageGroup = this.getAgeGroup(age);
      ageGroups[ageGroup]++;
    });

    return ageGroups;
  }

  getAgeGroup(age: number): string {
    if (age < 18) {
      return 'Menos de 18';
    } else if (age >= 18 && age <= 24) {
      return '18-24';
    } else if (age >= 25 && age <= 34) {
      return '25-34';
    } else if (age >= 35 && age <= 44) {
      return '35-44';
    } else if (age >= 45 && age <= 54) {
      return '45-54';
    } else if (age >= 55 && age <= 64) {
      return '55-64';
    } else {
      return '65 e acima';
    }
  }



  getUsersByCity(): { [city: string]: number } {
    const cityCounts: { [city: string]: number } = {};

    this.users.forEach(user => {
      const city = user.hometown;
      if (cityCounts[city]) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });

    return cityCounts;
  }




  getTimelineTags(): void {
    this.timelineService.getTimelineTags().subscribe(
      (tags: Tag[] | HttpErrorResponse) => {
        this.tags = tags as Tag[]; 
        this.createChartTags();
      },
      (error) => {
        console.error('Error fetching tags:', error);
      }
    );
  }




  createChartTags(): void {
    const tagNames = this.tags.map(tag => tag.name);
    const tagCounts = this.tags.map(tag => tag.tagUseCounter);
  
    const chartElement = this.chartTagsRef.nativeElement;
  
    this.chartTags = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: tagNames,
        datasets: [{
          label: 'Number of Tags',
          data: tagCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  //////////////////////////////////////////
  getTimelinePosts(): void {
    this.timelineService.getAllPosts().subscribe(
      (posts: Post[] | HttpErrorResponse) => {
        this.posts = posts as Post[];
        this.createChartPosts();
        this.createChartPostsCount();
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  createChartPosts(): void {
    const postsByDayCreated: { [day: string]: number } = {};
    const postsByDayModified: { [day: string]: number } = {};
  
    this.posts.forEach(post => {
      const createdDate = new Date(post.dateCreated);
      const modifiedDate = new Date(post.dateLastModified);
  
      const createdDay = createdDate.toDateString();
      postsByDayCreated[createdDay] = (postsByDayCreated[createdDay] || 0) + 1; // Incrémentation du compteur pour ce jour
  
      const modifiedDay = modifiedDate.toDateString();
      postsByDayModified[modifiedDay] = (postsByDayModified[modifiedDay] || 0) + 1; // Incrémentation du compteur pour ce jour
    });
  
    const labels = Object.keys(postsByDayCreated);
    const dataCreated = Object.values(postsByDayCreated);
    const dataModified = Object.values(postsByDayModified);
  
    const chartElement = this.chartPostsRef.nativeElement;
    this.chartPosts = new Chart(chartElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Posts Created',
          data: dataCreated,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Number of Posts Modified',
          data: dataModified,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  //////////////////////////////////////////////

  createChartPostsCount(): void {
    const likesByDay: { [day: string]: number } = {};
    const commentsByDay: { [day: string]: number } = {};
    const sharesByDay: { [day: string]: number } = {};
      this.posts.forEach(post => {
      const date = new Date(post.dateCreated);
      const day = date.toDateString(); 
  
      likesByDay[day] = (likesByDay[day] || 0) + post.likeCount; 
      commentsByDay[day] = (commentsByDay[day] || 0) + post.commentCount; 
      sharesByDay[day] = (sharesByDay[day] || 0) + post.shareCount; 
    });
  
    const labels = Object.keys(likesByDay);
    const likesData = Object.values(likesByDay);
    const commentsData = Object.values(commentsByDay);
    const sharesData = Object.values(sharesByDay);
  
    const chartElement = this.chartPostCountsRef.nativeElement;
    this.chartPostsCount = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Likes',
            data: likesData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Number of Comments',
            data: commentsData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Number of Shares',
            data: sharesData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  
}
