function plotDailyActiveStudents(data) {

  Highcharts.chart('daily-active-students', {

    title: {
      text: 'Daily Active Students'
    },

    xAxis: {
      allowDecimals: false,
      title: {
        text: 'Course Duration, Days'
      }
    },

    yAxis: {
      title: {
        text: 'Number of Active Students'
      }
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        pointStart: 1,
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
