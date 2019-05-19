import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { utils } from './utils'
import { colors } from '../../../assets/types'

export const charts = {
  'horizontal-bar-chart': ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: utils.flip(labels),
        datasets: [{
          label: 'Stats',
          data: utils.flip(data),
          backgroundColor: utils.flip(data).map(value => utils.color(value)),
          borderWidth: 1,
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'label'
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 200
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 200
            }
          }]
        }
      },
      plugins: {
        datalabels: {
        }
      }
    })
  },
  'radar-chart': ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: utils.flip(labels),
        datasets: [{
          label: 'Value',
          data: utils.flip(data),
          backgroundColor: utils.flip(data).map(value => utils.color(value)),
          borderWidth: 1,
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        }]
      },
      options: {
        responsive: true,
        events: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'point'
        },
        scales: {
          display: false
        },
        scale: {
          ticks: {
            display: false,
            beginAtZero: true,
            max: 200,
            min: 0,
            stepSize: 200
          }
        }
      },
      plugins: {
        datalabels: {
        }
      }
    })
  },
  'polar-chart': ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stats',
          data: data,
          backgroundColor: Object.entries(colors).map(color => color[1].dark),
          borderWidth: 1,
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value, context) => (value > 0) ? context.chart.data.labels[context.dataIndex] : ''
          }
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'label'
        },
        scales: {
          display: false
        },
        scale: {
          ticks: {
            display: false,
            beginAtZero: true,
            max: 5,
            min: -5,
            stepSize: 2
          },
          gridLines: {
            display: false
          }
        },
        plugins: {
          datalabels: {
          }
        }
      }
    })
  }
}
