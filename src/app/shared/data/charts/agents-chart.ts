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

export const totalAgentChart: ChartOptions | any = {
  series: [30, 70, 50, 20],
    labels: ['Total agent', 'Recently agent', 'Sellers', 'Buyers'],
    chart: {
        type: 'donut',
        width: 320,
    },
  dataLabels: {
    enabled: false
  },
  colors: ["rgba(100, 117, 137, 0.1)", "#f35d43", "#89c826", "#f35d43"],
  plotOptions: {
    pie: {
      expandOnClick: false
    }
  },
  responsive: [{
    breakpoint: 1730,
    options: {
      chart: {
        width: 280
      },
      legend: {
        position: 'bottom'
      }
    }
  },
  {
    breakpoint: 1200,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  },
  {
    breakpoint: 768,
    options: {
      chart: {
        width: 380
      },
      legend: {
        position: 'right',
        horizontalAlign: 'right',
      }
    }
  },
  {
    breakpoint: 480,
    options: {
      chart: {
        width: 340
      },
      legend: {
        position: 'bottom'
      }
    }
  },
  {
    breakpoint: 406,
    options: {
      chart: {
        width: 250
      },
      legend: {
        horizontalAlign: 'center',
      }
    }
  }]
}
