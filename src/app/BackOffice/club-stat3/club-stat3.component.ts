import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { Club } from 'src/app/models/Collocation/Club';
import { ClubService } from 'src/app/services/Collocation/club.service';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexAxisChartSeries;
  chart?: ApexChart;
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
  xaxis?: ApexXAxis | ApexXAxis[];
  yaxis?: ApexYAxis | ApexYAxis[];
  responsive?: ApexResponsive[];
}

@Component({
  selector: 'app-club-stat3',
  templateUrl: './club-stat3.component.html',
  styleUrls: ['./club-stat3.component.scss']
})
export class ClubStat3Component {

  clubs: Club[] = []; // List of fetched clubs
  categories: string[] = []; // Extracted categories from clubs

  public revenueChart: ChartOptions | any = {
    chart: {
        width: 470,
        type: 'donut',
        dropShadow: {
          enabled: true,
          color: '#111',
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      dataLabels: {
          enabled: false,
          dropShadow: {
              blur: 3,
              opacity: 0.5
          },
      },
      series: [],
      labels: [],
      legend: {
          formatter: function(val: string, opts: { w: { globals: { series: { [x: string]: string; }; seriesIndex?: string | number | undefined; }} }) {
              const seriesIndex = opts.w.globals.seriesIndex as string | number | undefined;
              return val + " - " + (opts.w.globals.series[seriesIndex ?? ''] ?? '') + "%"; // Add nullish coalescing operator and null check
          }
      },
      colors: ["rgba(243, 93, 67, 0.3)", "rgba(243, 93, 67, 0.5)", "#f35d43"],
      responsive: [{
        breakpoint: 1900,
        options: {
            chart: {
                width: 420
            },
        }
      },
      {
        breakpoint: 1776,
        options: {
            chart: {
                width: 380
            },
        }
      },
      {
        breakpoint: 1661,
        options: {
            chart: {
                width: 360
            },
            legend: {
                position: 'bottom'
            }
        }
      },
      {
      breakpoint: 480,
      options: {
          chart: {
              width: 250
          },
          legend: {
              position: 'bottom'
          }
      }
    }]
  }
      
  constructor(private clubService: ClubService) {
    this.fetchClubsAndExtractCategories();
  }

  fetchClubsAndExtractCategories(): void {
    this.clubService.getAllClubs().subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
        this.extractCategories();
      },
    );
  }

  extractCategories(): void {
    // Extract categories from fetched clubs
    this.categories = this.clubs.map(club => club.category);
  
    // Count occurrences of each category
    const categoryCounts = new Map<string, number>();
    this.categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
  
    // Update chart series and labels
    this.revenueChart.series = Array.from(categoryCounts.values());
    this.revenueChart.labels = Array.from(categoryCounts.keys());
  }
  }
