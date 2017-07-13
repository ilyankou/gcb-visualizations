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
      reversedStacks: false,
      title: {
        text: ''
      },
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
      formatter: function() {
        var p = this.point;
        var html = '<b>{0}</b> <br> \
                    from <i>{1}</i> <br> \
                    Type: {2} <br> \
                    Attempted <b>{3}</b> times by <b>{4}</b> students<br> \
                    Completed by <b>{5}</b> students ({6}%)<br> \
                    Average <b>{7}</b> attempts to answer<br> \
                    Question ID <b>{8}</b>'.format(
                      p.text, p.lesson, p.type, p.attemptedTimes, p.attemptedStudents,
                      p.completed, p.completedStudentsRate, p.av, p.id
                    );
        return html;
      }
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function() {
            var type = event.point.type;
            var id = event.point.id;
            var url = 'https://mobilecsp-2017.appspot.com/mobilecsp/';

            if (type === 'Quizly') {
              url += 'assets/lib/quizly/gcb-index.html?backpack=hidden&selector=hidden&quizname=';
            } else {
              url += 'teacher?action=question_preview&quid=';
            }

            window.open(url + id, 'Question Preview', 'height=400,width=700');
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
