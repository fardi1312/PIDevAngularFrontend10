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
import { ClubMembership } from 'src/app/models/Collocation/ClubMemberShip';
import { RequestEnum } from 'src/app/models/Collocation/CollocationRequest';
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
  selector: 'app-club-stat2',
  templateUrl: './club-stat2.component.html',
  styleUrls: ['./club-stat2.component.scss']
})
export class ClubStat2Component implements OnInit { 
  membershipApplications: MemberShipApplication[] = [];
  RefusedMemberShipApplication: MemberShipApplication[] = [];
  memberships: ClubMembership[] = [];

  public incomeAnalysisChart: ChartOptions | any = { 
    series: [
      {
        name: "Total Memberships",
        data: [] // Placeholder for total memberships
      },
      {
        name: "Refused Memberships",
        data: [] // Placeholder for refused memberships
      }
    ],
    chart: {
      height: 320,
      type: 'area',
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 3,
        color: '#720f1e',
        opacity: 0.15
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
    },
    markers: {
      strokeWidth: 4,
      strokeColors: "#ffffff",
      hover: {
        size: 9,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 4,
    },
    legend: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    grid: {
      xaxis: {
        lines: {
          borderColor: 'transparent',
          show: false,
        }
      },
      yaxis: {
        lines: {
          borderColor: 'transparent',
          show: false,
        }
      },
      padding: {
        right: -112,
        bottom: 0,
        left: 15
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          grid: {
            padding: {
              right: -95,
            }
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          grid: {
            padding: {
              right: -69,
            }
          },
        },
      }
    ],
    yaxis: {
      labels: {
        formatter: function (value: string) {
          return value + "K";
        }
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
      range: undefined,
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: '#ff5c41',
          width: 1,
          dashArray: 0,
        },
      },
    },
    tooltip: {
      formatter: undefined,
    },
  }  

  constructor(private clubService: ClubService) {} 

  ngOnInit(): void { 
    this.fetchMemberships();
    this.fetchMembershipApplications(); 
    this.updateChartData() ; 
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
    for (let index = 0; index < this.membershipApplications.length; index++) {
      const element = this.membershipApplications[index]; 
        if (element.status == RequestEnum.Canceled) { 
          this.RefusedMemberShipApplication.push(element);
        }
    }  
    
  } 

  fetchMemberships(): void { 
    this.clubService.getAllMemberships().subscribe(
      (memberships: ClubMembership[]) => {
        this.memberships = memberships; 
      },
      (error) => {
        console.error('Error fetching memberships:', error);
      }
    );
  }

  updateChartData(): void {
    const totalMembershipsByMonth: number[] = Array(12).fill(0);
    const refusedMembershipsByMonth: number[] = Array(12).fill(0);  
  
    // Update total memberships by month
    this.memberships.forEach(membership => {
      // Parse membership.date into a Date object
      const date = new Date(membership.date);
      
      // Check if the parsed date is valid
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        totalMembershipsByMonth[monthIndex]++; 
      } else {
        // If the parsed date is invalid, log an error
        console.error('Invalid date format:', membership.date);
      }
    });
  
    // Update refused memberships by month
    this.RefusedMemberShipApplication.forEach(application => {
      // Parse application.date into a Date object
      const date = new Date(application.date);
      
      // Check if the parsed date is valid
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        refusedMembershipsByMonth[monthIndex]++; 
      } else {
        // If the parsed date is invalid, log an error
        console.error('Invalid date format:', application.date);
      }
    });
  
    // Update the series data with the counts
    this.incomeAnalysisChart.series[0].data = totalMembershipsByMonth;
    this.incomeAnalysisChart.series[1].data = refusedMembershipsByMonth;
  }
  }
