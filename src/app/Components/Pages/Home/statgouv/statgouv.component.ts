import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/services/Collocation/offer.service';


@Component({
  selector: 'app-statgouv',
  templateUrl: './statgouv.component.html',
  styleUrls: ['./statgouv.component.css']
})
export class StatgouvComponent {
  chart: any;
  @ViewChild('lineChartExample', { static: false }) private chartRef!: ElementRef;

  constructor(private offerService: OfferService) {}

  ngAfterViewInit(): void {
    this.offerService.getCollocationOffers().subscribe(posts => {
      console.log(posts);
      const governorateData = this.getGovernoratePriceRange(posts);
      console.log(governorateData);
      this.renderChart(governorateData);
    });
  }

  getGovernoratePriceRange(posts: CollocationOffer[]): { governorate: string, range: number }[] {
    const governorateData: { [governorate: string]: { total: number, count: number } } = {};
  
    posts.forEach(post => {
      const governorate = post.governorate || 'Unknown';
      const price = post.price || 0;
      governorateData[governorate] = governorateData[governorate] || { total: 0, count: 0 };
      governorateData[governorate].total += price;
      governorateData[governorate].count++;
    });
  
    return Object.keys(governorateData).map(governorate => ({
      governorate,
      range: governorateData[governorate].total / governorateData[governorate].count
    }));
  }
  

  renderChart(governorateData: { governorate: string, range: number }[]): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
  
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: governorateData.map(data => data.governorate),
        datasets: [{
          label: 'Average Price Range',
          backgroundColor: 'rgba(255, 192, 203, 0.5)', // Light Pink color with 50% opacity
          borderColor: 'rgba(255, 192, 203, 1)', // Light Pink color
          borderWidth: 1,
          data: governorateData.map(data => data.range.toFixed(2))
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
              text: 'Governorate'
            }
          }
        }
      }
    });
  }
  
  



}
