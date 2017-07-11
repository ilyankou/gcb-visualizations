function plotDailyActiveStudents(startDate, data) {

  Highcharts.chart('chart', {
    
    title: {
      text: 'Daily Active Students'
    },

    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function() {
          return moment(startDate).add(this.value, 'days').format('MMM Do');
        }
      }
    },

    yAxis: {
      title: {
        text: 'Number of Active Students'
      },
      allowDecimals: false,
    },

    tooltip: {
      formatter: function() {
        var date = moment(startDate).add(this.x, 'days').format('dddd, MMMM Do, YYYY');
        var val = (this.y < 1 ? 'No' : this.y) + ' active student' + (this.y == 1 ? '' : 's');
        return date + '<br>' + val;
      }
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        pointStart: 0
      }
    },

    series: [
      {
        name: 'Active Students',
        data: data
      }
    ]

  });

}
