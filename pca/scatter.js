function drawScatter(data) {
  console.log(data);
  var chart = new Highcharts.Chart('chart', {
    chart: {
      type: 'bubble',
      backgroundColor: '#444'
    },

    title: {
      text: 'Quizly Complexity',
      style: {
        color: 'white',
        font: 'bold 22px Arial'
      }
    },

    subtitle: {
      text: 'Using PCA to reduce dimentionality from 14 to 2. Radius = complexity.',
      style: {
        color: 'white'
      }
    },

    xAxis: {
      visible: false,
    },

    yAxis: {
      visible: false,
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      useHTML: true,
      headerFormat: '',
      pointFormat: 'Quiz <a href="https://ram8647.appspot.com/mobileCSP/assets/lib/quizly/gcb-index.html?backpack=hidden&selector=hidden&quizname={point.name}">{point.name}</a><br>Complexity: {point.z}',
      animation: true,
      style : {
        pointerEvents: 'auto',
      }
    },

    plotOptions: {
      series: {
        color: 'white',
        cursor: 'pointer',
      }
    },

    series: [{
      data: data
    }]

  });
}
