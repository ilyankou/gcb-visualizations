function plotAttemptedCompletedQuestions(question_ids, data1, data2, data3) {

  Highcharts.chart('chart', {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Attempted and Completed Questions'
    },

    xAxis: {
      categories: question_ids,
      labels: {
        enabled: false,
      }
    },

    yAxis: {
      min: 0,

      title: {
        text: ''
      },

      reversedStacks: false,

      stackLabels: {
        enabled: false,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
    },

    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },

    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.text}</b><br>\
                    Question ID: <b>{point.x}</b><br> \
                    Unit ID: {point.unit}, Lesson ID: {point.lesson}<br> \
                    Attempted <b>{point.attemptedTimes}</b> times by <b>{point.attemptedStudents}</b> students<br> \
                    Completed by <b>{point.completed}</b> students ({point.completedStudentsRate}%)<br> \
                    Average <b>{point.av}</b> attempts to answer'
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function() {
            var id = event.point.category;
            window.open('https://mobilecsp-2017.appspot.com/mobilecsp/teacher?action=question_preview&quid=' + id);
          }
        }
      },
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        },
        borderWidth: 0,
      }
    },

    series: [{
      name: 'Students Completed',
      data: data1,
      color: '#65F376',
    }, {
      name: 'Students Failed',
      data: data2,
      color: 'red',
    }, {
      name: 'Unsuccessful Attempts',
      data: data3,
      color: 'silver'
    }]

  });

}
