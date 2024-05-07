import { Component, ElementRef, ViewChild } from '@angular/core';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/services/Collocation/offer.service';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.css']
})
export class StatChartComponent {

 chart:any
  @ViewChild('lineChartExample', { static: false }) private chartRef!: ElementRef
  ;

constructor( private offerService: OfferService){

}
ngAfterViewInit(): void {
  this.offerService.getCollocationOffers().subscribe(posts => {
    console.log(posts)
    const currentYear = new Date().getFullYear();
    const filteredPosts = posts.filter(post => {
      const offerDate = new Date(post.dateRent!)?.getFullYear(); // Use non-null assertion operator
      return offerDate === currentYear && !isNaN(offerDate);
    });

    const monthlyData = this.getMonthlyPriceRange(filteredPosts);
console.log(monthlyData);
    this.renderChart(monthlyData);

  });
}
getMonthlyPriceRange(posts:CollocationOffer []): { month: number, range: number }[] {
  const monthlyData: { month: number, range: number }[] = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, range: 0 }));

  posts.forEach(post => {
    if (post.dateRent) {
      const month = new Date(post.dateRent).getMonth();
      monthlyData[month].range += post.price || 0;
    }
  });

  monthlyData.forEach(data => {
    const numPosts = posts.filter(post => {
      return post.dateRent && new Date(post.dateRent).getMonth() === data.month - 1;
    }).length;
    if (numPosts > 0) {
      data.range /= numPosts;
    }
  });

  return monthlyData;
}



renderChart(monthlyData: { month: number, range: number }[]): void {
  const ctx = this.chartRef.nativeElement.getContext('2d');

  if (this.chart) {
    this.chart.destroy(); // Destroy existing chart if it exists
  }

  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthlyData.map(data => this.getMonthLabel(data.month)),
      datasets: [{
        label: 'Average Price Range',
        borderColor: 'rgba(255, 99, 132, 1)', // Red color
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Red color
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        data: monthlyData.map(data => data.range.toFixed(2))
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Price Range'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      }
    }
  });
}



getMonthLabel(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1];
}
}
