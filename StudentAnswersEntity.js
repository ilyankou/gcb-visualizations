function getEmail(i) {
  return rows[i]['key.name'];
}

function getRecordedOn(i) {
  return rows[i]['recorded_on'];
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

viz = Array(totalDays).fill(rows.length);
/*
for (i = 0; i < totalDays; i++) {
  viz[i] = rows.length;
} */

for (i in rows) {
  dayCount = countDays(getRecordedOn(i));
  for (j = dayCount; j < totalDays; j++) { viz[j]--; }
}

console.log(viz)


for (i in rows) {
  console.log(getEmail(i), getRecordedOn(i));
  console.log(countDays(getRecordedOn(i)));
  console.log(viz)
}

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
