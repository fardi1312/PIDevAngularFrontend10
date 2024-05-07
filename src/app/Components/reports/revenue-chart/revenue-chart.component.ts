import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/servicesM/events.service';
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
import { Observable } from 'rxjs';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexAxisChartSeries[];
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
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {
  public revenueChartData: ChartOptions | any = {
    chart: {
      width: 470,
      height: 400, // Adjust the height here
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
        opacity: 0.9
      },
    },
    labels: ["Charity", "Other categories"],
    legend: {
      formatter: function(val: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%"
      }
    },
    colors: ["rgba(243, 93, 67, 0.5)", "#f35d43"],
    responsive: [{
      breakpoint: 1900,
      options: {
        chart: {
          width: 820,
          height: 800 // Adjust the height here
        },
      }
    },
    {
      breakpoint: 1776,
      options: {
        chart: {
          width: 780,
          height: 800 // Adjust the height here
        },
      }
    },
    {
      breakpoint: 1661,
      options: {
        chart: {
          width: 360,
          height: 800 // Adjust the height here
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
          width: 550,
          height: 500 // Adjust the height here
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  constructor(private eventservice: EventsService) {}

  ngOnInit() {
    this.loadCategoryPercentages();
  }

  loadCategoryPercentages() {
    this.eventservice.getCategoryPercentages().subscribe(
      (percentages: number[]) => {
        // Round the numbers to three digits after the comma
        const roundedPercentages = percentages.map(num => parseFloat(num.toFixed(3)));
        this.revenueChartData.series = roundedPercentages;
      },
      (error: any) => {
        console.error('Error loading category percentages:', error);
      }
    );
  }
  
}
