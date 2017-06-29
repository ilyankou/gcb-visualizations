function plotAttemptedCompletedQuestions(question_ids, data1, data2, data3) {

  Highcharts.chart('attempted-completed-questions', {
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
      headerFormat: 'Question ID: <b>{point.x}</b><br/>',
      pointFormat: 'Unit ID: {point.unit}, Lesson ID: {point.lesson}<br> \
                    Attempted <b>{point.attemptedTimes}</b> times by <b>{point.attemptedStudents}</b> students<br> \
                    Completed by <b>{point.completed}</b> students ({point.completedStudentsRate}%)<br> \
                    Average <b>{point.av}</b> attempts to answer'
    },

    plotOptions: {
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
