function getEmail(i) {
  return rows[i]['key.name'];
}

function getRecordedOn(i) {
  return rows[i]['recorded_on'];
}

function getAnswers(i) {
  return JSON.parse(rows[i].answers_dict).answers;
}

var startDate = {year: 2017, month: 06, day: 1};
var endDate = {year: 2017, month: 06, day: 31};

function countDays(d) {
  var date;

  if (!d.year) {
    d = d.split('T')[0].split('-');
    date = {
      year: d[0],
      month: d[1],
      day: d[2]
    };
  } else {
    date = d;
  }

  days = date.day - startDate.day;
  return days;
}

var totalDays = countDays(endDate);

/* This counts the number of active students for each day of the course */
viz = Array(totalDays).fill(rows.length);
for (i in rows) {
  dayCount = countDays(getRecordedOn(i));
  for (j = dayCount; j < totalDays; j++) { viz[j]--; }
}



/**
 * This creates a dataset of all questions (with valid question_id) and
 * counts the number of attempts to solve and the number
 */
questionStats = {};
for (i in rows) {
  var answ = getAnswers(i);
  var units = Object.keys(answ);

  for (j in units) {  // Iterate through units
    var u = units[j];
    var lessons = Object.keys(answ[u]);

    for (k in lessons) {  // Iterate through lessons
      var l = lessons[k];
      var q = answ[u][l];
      var questions = Object.keys(q);

      for (m in questions) { // Iterate through questions
        var qKey = questions[m];
        var o = answ[u][l][qKey];
        var qId = o.question_id;

        if (!qId) continue;   // Ignore questions with no question_id

        var qScore = o.score;
        var qAttempts = o.attempts;

        // If question has not been processed previously
        if (!questionStats[qId]) {
          questionStats[qId] = {
            unit_id: o.unit_id,
            lesson_id: o.lesson_id,
            totalAttempted: 0,
            totalCompleted: 0
          };
        }

        questionStats[qId].totalAttempted += qAttempts;
        questionStats[qId].totalCompleted += (qScore == 1) ? 1 : 0;
      }
    }
  }
}

console.log(questionStats);


Highcharts.chart('chart', {

    title: {
        text: 'Number of Active Students'
    },

    subtitle: {
        text: 'Subtitle'
    },

    yAxis: {
        title: {
            text: 'Number of Active Students'
        }
    },

    legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            pointStart: 1,
            pointInterval: 1,
        }
    },

    series: [{
        name: 'Active Students',
        data: viz,
    }],

    xAxis: {
      allowDecimals: false,
      title: {
        text: 'Course Duration in Days'
      }
    }
});

question_ids = Object.keys(questionStats);
attempted = [];
completed = [];
unsuccessful = [];
success = [];

for (i in question_ids) {
  var att = questionStats[question_ids[i]].totalAttempted;
  var com = questionStats[question_ids[i]].totalCompleted;
  var uns = att - com;
  var suc = 100 - Math.round((com / att) * 100);  // CHECK WHY THIS IS SO..... SHOULD NOT BE (100 - %) IN TEHORY.
  console.log(com, att, suc);
  attempted.push(att);
  completed.push(com);
  unsuccessful.push(uns);
  success.push(suc);
}

data1 = [];
data2 = [];

console.log(success);

for (i in question_ids) {
  data1.push({y: completed[i], success: success[i]});
  data2.push({y: unsuccessful[i], success: success[i]});
}

console.log(data1, data2)

Highcharts.chart('chart2', {
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
            text: '# of attempted/completed'
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
        headerFormat: 'Question ID: <b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Success rate: {point.success}%'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: [{
        name: 'Unsuccessful',
        data: data1,
    }, {
        name: 'Completed',
        data: data2,
    }]
});
