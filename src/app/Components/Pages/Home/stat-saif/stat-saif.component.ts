
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';

@Component({
  selector: 'app-stat-saif',
  templateUrl: './stat-saif.component.html',
  styleUrls: ['./stat-saif.component.css']
})
export class StatSaifComponent {

  chart:any
  @ViewChild('lineChartExample', { static: false }) private chartRef!: ElementRef;

constructor(public productService:EcommerceService){

}
ngAfterViewInit(): void {
  this.productService.getAllPost9ach().subscribe(posts => {
    const currentYear = new Date().getFullYear();
    const filteredPosts = posts.filter(post => {
      const offerDate = new Date(post.offerDate!)?.getFullYear(); // Use non-null assertion operator
      return offerDate === currentYear && !isNaN(offerDate);
    });

    const monthlyData = this.getMonthlyPriceRange(filteredPosts);
console.log(monthlyData);
    this.renderChart(monthlyData);

  });
}


getMonthlyPriceRange(posts: Post9ach[]): { month: number, range: number }[] {
  const monthlyData: { month: number, range: number }[] = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, range: 0 }));

  posts.forEach(post => {
    if (post.offerDate) {
      const month = new Date(post.offerDate).getMonth();
      monthlyData[month].range += post.price || 0;
    }
  });

  monthlyData.forEach(data => {
    const numPosts = posts.filter(post => {
      return post.offerDate && new Date(post.offerDate).getMonth() === data.month - 1;
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
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
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