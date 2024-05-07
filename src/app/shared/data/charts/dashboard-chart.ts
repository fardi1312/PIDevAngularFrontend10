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

export const salesSummaryChart: ChartOptions | any = {
  series: [{
    data: [5, 12, 15, 18, 16, 20, 16, 13, 10, 6]
}],
chart: {
    height: 340,
    type: 'bar',
    toolbar: {
        show: true,
    },
},
colors: ['#f34451'],
plotOptions: {
    bar: {
        columnWidth: '40%',
        distributed: true,
        borderRadius: '20'
    }
},
dataLabels: {
    enabled: false
},
legend: {
    show: false
},
xaxis: {
    categories: [ 'Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct'],
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
}

export const timelineChart: ChartOptions | any = {
  series: [
    {
      data: [
        {
          x: 'Mon',
          y: [
           0,
            10
          ]
        },
        {
          x: 'Tue',
          y: [
            18,
            10
          ]
        },
        {
          x: 'Wed',
          y: [
            20,
            15
          ]
        },
        {
          x: 'Thu',
          y: [
            20,
            30
          ]
        }
      ]
    },
    {
        data: [
          {
            x: 'Mon',
            y: [
             12,
              20
            ]
          },
          {
            x: 'Tue',
            y: [
              25,
              20
            ]
          },
          {
            x: 'Wed',
            y: [
              10,
              14
            ]
          },
          {
            x: 'Thu',
            y: [
              5,
              10
            ]
          }
        ]
      }
  ],
    chart: {
    height: 370,
    type: 'rangeBar',
    toolbar: {
        show: false,
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '20%',
      rangeBarGroupRows: true,
    }
  },
  colors: [ "#f34451", "#89c826" ],
  xaxis: {
    type: 'data',
    axisBorder: {
        show: false,
    },
    axisTicks: {
        show: false,
    }
  }
}

export const soldOutChart: ChartOptions | any = {
  series: [76, 67, 90],
    chart: {
      height: 375,
      offsetY: 0,
    sparkline: {
      enabled: true
    },
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -100,
      endAngle: 100,
      hollow: {
        margin: 5,
        size: '60%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "30px",
          show: false
        },
        total: {
          show: true,
          label: 'Total',
          formatter: function (w: any) {
              return 75
          }
         }
      }
    }
  },
  grid: {
    padding: {
      top: -5,
      bottom: 10
    }
  },
  colors: ['#f34451', '#89c826', '#ffcc33'],
  labels: ['Vimeo', 'Messenger', 'LinkedIn'],
  responsive: [{
    breakpoint: 400,
    options: {
      chart: {
        height: 360,
      }
    }
  },{
    breakpoint: 340,
    options: {
      chart: {
        height: 280,
      }
    }
  }
  ]
}
