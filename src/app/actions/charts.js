import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { utils } from './utils'
import { colors } from '../../../assets/types'

export const charts = {
  'horizontal-bar-stats-chart': ({id, labels, data}) => {
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
        events: true,
        responsive: true,
        legend: {
          position: 'bottom'
        },
        hover: {
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
  'radar-stats-chart': ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: utils.flip(labels),
        datasets: [{
          label: 'Stats',
          data: utils.flip(data),
          backgroundColor: utils.flip(data).map(value => utils.color(value)),
          borderWidth: 1,
          datalabels: {
            anchor: 'end',
            align: 'end',
            display: function (context) {
              return context.dataIndex % 2 // display labels with an odd index
            }
          }
        }]
      },
      options: {
        events: true,
        responsive: true,
        legend: {
          position: 'bottom'
        },
        hover: {
          mode: 'label'
        },
        scales: {
          display: false
        },
        scale: {
          ticks: {
            beginAtZero: true,
            max: 200,
            min: 0,
            stepSize: 40
          }
        },
        plugins: {
          datalabels: {
          }
        }
      }
    })
  },
  'pie-types-chart': ({id, labels, data}) => {
    const ctx = document.getElementById(id)
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stats',
          data: data,
          backgroundColor: Object.entries(colors).map(color => color[1].dark),
          borderWidth: 1,
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        }]
      },
      options: {
        events: true,
        responsive: true,
        legend: {
          position: 'right'
        },
        hover: {
          mode: 'label'
        },
        scales: {
          display: false
        },
        plugins: {
          datalabels: {
            display: context => context.dataset.data[context.dataIndex] > 0
          }
        }
      }
    })
  }
}
