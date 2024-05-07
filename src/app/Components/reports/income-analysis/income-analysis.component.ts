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
import { EventsService } from 'src/app/services/servicesM/events.service';

export type ChartOptions = {
  series?: ApexAxisChartSeries[];
  chart?: ApexChart;
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
  xaxis?: ApexXAxis | ApexXAxis[];
  yaxis?: ApexYAxis | ApexYAxis[];
  responsive?: ApexResponsive[];
};

@Component({
  selector: 'app-income-analysis',
  templateUrl: './income-analysis.component.html',
  styleUrls: ['./income-analysis.component.scss']
})
export class IncomeAnalysisComponent implements OnInit {

  public incomeAnalysis: ChartOptions | any = {
    series: [
      {
        name: "Events income",
        data: []
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
    colors: ["#ff5c41", "#89c826"],
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
      categories: [],
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
      x: {
        formatter: function(val: number) {
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return months[val - 1];
        }
      },
    },
  }

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.updateIncomeAnalysisChart();
  }

  updateIncomeAnalysisChart() {
    this.eventService.getMonthlyProfits().subscribe(
      (monthlyProfits: { [key: string]: number }) => {
        const data: number[] = [];

        this.incomeAnalysis.series[0].data = [];

        if (!this.incomeAnalysis.xaxis) {
          this.incomeAnalysis.xaxis = [{
            categories: []
          }];
        } else if (!Array.isArray(this.incomeAnalysis.xaxis)) {
          this.incomeAnalysis.xaxis = [this.incomeAnalysis.xaxis];
          this.incomeAnalysis.xaxis[0].categories = [];
        } else if (!this.incomeAnalysis.xaxis[0].categories) {
          this.incomeAnalysis.xaxis[0].categories = [];
        }

        Object.keys(monthlyProfits).forEach(monthYear => {
          const count = monthlyProfits[monthYear];
          const [month, year] = monthYear.split('/');
          data.push(count);
          this.incomeAnalysis.series[0].data.push(count);
          this.incomeAnalysis.xaxis[0].categories.push(this.getMonthName(parseInt(month, 10) - 1));
        });

      },
      (error) => {
        console.error('Error fetching events per month:', error);
      }
    );
  }

  getMonthName(index: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[index];
  }
}
