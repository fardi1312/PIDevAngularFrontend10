import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
  @ViewChild('pieChartExample', { static: false }) private pieChartRef!: ElementRef;
  chart:any

constructor(public productService:EcommerceService){
}
ngAfterViewInit(): void {
  this.productService.getAllPost9ach().subscribe(posts => {
    const currentYear = new Date().getFullYear();
    const filteredPosts = posts.filter(post => {
      const offerDate = new Date(post.offerDate!)?.getFullYear(); // Use non-null assertion operator
      return offerDate === currentYear && !isNaN(offerDate);
    });


    const categoryData = this.getCategoryDistribution(filteredPosts);
    this.renderPieChart(categoryData);
    console.log(categoryData);
  });
}
getCategoryDistribution(posts: Post9ach[]): { category: string, count: number }[] {
  const categoryCounts: { [category: string]: number } = {};

  posts.forEach(post => {
    const category = post.category || 'Uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.keys(categoryCounts).map(category => ({ category, count: categoryCounts[category] }));
}
renderPieChart(categoryData: { category: string, count: number }[]): void {
  const ctx = this.pieChartRef.nativeElement.getContext('2d');

  if (this.chart) {
    this.chart.destroy(); // Destroy existing chart if it exists
  }

  this.chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categoryData.map(data => data.category),
      datasets: [{
        label: 'Category Distribution',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        data: categoryData.map(data => data.count)
      }]
    },
    options: {
      responsive: false, // Ensure the chart doesn't resize
      maintainAspectRatio: false, // Ensure the chart doesn't maintain aspect ratio
      plugins: {
        legend: {
          display: true,
          position: 'bottom' // Display the legend at the bottom
        }
      }
    }
  });
}



}