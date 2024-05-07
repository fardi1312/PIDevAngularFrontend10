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
import { EventsService } from 'src/app/services/servicesM/events.service';

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
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.scss']
})
export class SalesSummaryComponent {

  public salesSummaryChart: ChartOptions | any = {
    series: [{
      data: []
    }],
    chart: {
      height: 340,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: ['#f34451'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        distributed: true,
        borderRadius: '9'
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Roboto, sans-serif',
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      }
    },
    responsive: [{
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        }
      },
    }],
  };

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getEventsPerMonth().subscribe(
      (eventsPerMonth: { [key: string]: number }) => {
        const data: number[] = [];
        this.salesSummaryChart.series[0].data = []; // Clear existing data
      

        // Get the keys and sort them
        const sortedKeys = Object.keys(eventsPerMonth).sort();

        // Iterate over sorted keys of the received object (month/year) and update the data and categories
        sortedKeys.forEach(monthYear => {
          const count = eventsPerMonth[monthYear];
          const [month, year] = monthYear.split('/'); // Split month and year
          data.push(count);
          this.salesSummaryChart.xaxis.categories.push(this.getMonthName(parseInt(month, 10) - 1) );
        });

        // Update chart data
        this.salesSummaryChart.series[0].data = data;
      },
      (error) => {
        console.error('Error fetching events per month:', error);
      }
    );
  }

  // Helper function to get month name
  getMonthName(index: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[index];
  }
}
