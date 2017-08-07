function plotGenderBreakdown(usertypes, genders, subtitle) {

  Highcharts.chart('chart', {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Gender Breakdown'
      },
      subtitle: {
        text: subtitle,
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      tooltip: {
        formatter: function() {
          return this.key + ': ' + this.y;
        }
      },
      series: [{
        name: 'Users',
        data: usertypes,
        size: '60%',
        dataLabels: {
          color: '#ffffff',
          distance: -30
        }
      }, {
        name: 'Gender',
        data: genders,
        size: '80%',
        innerSize: '60%',

        dataLabels: {
          formatter: function () {
            return '<b>' + this.point.name + ':</b> ' +
              (this.point.percentage / this.point.perc).toFixed(1) + '%';
          }
        }
    }]

  });

}
