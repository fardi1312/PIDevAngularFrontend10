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

export const revenueChart: ChartOptions | any = {
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
    series: [50, 30, 41],
    labels: ["Channai", "Ahemdabad", "Banglore"],
    legend: {
        formatter: function(val: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%"
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

export const incomeAnalysisChart: ChartOptions | any = {
  series: [{
            name: "Rent income",
            data: [20, 25, 20, 30, 20, 50, 30, 35, 25, 60, 0]
        },
        {
            name: "Sale income",
            data: [10, 20, 10, 15, 10, 20, 15, 10, 15, 20, 0]
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
    responsive: [{
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
