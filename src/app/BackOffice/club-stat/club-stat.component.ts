import { Component, OnInit } from '@angular/core';
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
import { MemberShipApplication } from 'src/app/models/Collocation/MemberShipApplication';
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
  selector: 'app-club-stat',
  templateUrl: './club-stat.component.html',
  styleUrls: ['./club-stat.component.scss']
}) 

export class ClubStatComponent implements OnInit { 
  membershipApplications: MemberShipApplication[] = [];

  public salesSummaryChart: ChartOptions | any = {
    series: [{ 
      name: 'Membership Applications',
      data: [] // Initialize empty data array
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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

  constructor(private clubService: ClubService) {}

  ngOnInit(): void { 
    this.fetchMembershipApplications();
  }

  fetchMembershipApplications(): void {
    this.clubService.getAllMembershipApplications().subscribe(
      (applications: MemberShipApplication[]) => {
        this.membershipApplications = applications;
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching membership applications:', error);
      }
    );
  }

  updateChartData(): void {
    const countsPerMonth = this.getCountsPerMonth();
    this.salesSummaryChart.series[0].data = countsPerMonth;
  }

  getCountsPerMonth(): number[] {
    const countsPerMonth: number[] = Array(12).fill(0); // Initialize counts for each month to zero
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.membershipApplications.forEach(application => {
      const monthIndex = new Date(application.date).getMonth();
      countsPerMonth[monthIndex]++;
    });

    return countsPerMonth;
  }
}
