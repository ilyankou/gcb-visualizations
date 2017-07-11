var startDate = new Date(2017, 5, 1);
var endDate = new Date(2017, 5, 30);

function dailyActiveStudents(startDate, endDate) {

  $.getJSON('course-data/EventEntity.json', function(json) {

      var courseDurationInDays = daysBetween(startDate, endDate);
      var dailyActiveStudents = Array(courseDurationInDays).fill(0);

      for (i in json.rows) {
        var userId = json.rows[i].user_id;
        var eventDate = new Date(json.rows[i].recorded_on);
        var d = daysBetween(startDate, eventDate) - 1;

        if (d < 0 || d > courseDurationInDays) continue;

        if (!dailyActiveStudents[d]) {
          dailyActiveStudents[d] = {};
        }

        if (!dailyActiveStudents[d][userId]) {
          dailyActiveStudents[d][userId] = 1;
        } else {
          dailyActiveStudents[d][userId] += 1;
        }
      }

      var data = dailyActiveStudents.map(function(o) { return Object.keys(o).length });

      plotDailyActiveStudents(startDate, data);
  });

}
