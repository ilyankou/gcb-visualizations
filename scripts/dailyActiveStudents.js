$(document).ready(function() {


$.getJSON('course-data/EventEntity.json', function(json) {
  //loadJSON('course-data/EventEntity.json', function(json) {
    var eventRows = json.rows;

    var startDate = new Date(2017, 5, 20);
    var endDate = new Date(2017, 5, 30);

    var courseDurationInDays = daysBetween(startDate, endDate);

    /* This counts the number of active students for each day of the course */
    /* THIS USES STUDENT ANSWER ENTITY DATASET
    // We assume that all students (rows.length) were active on all days
    dailyActiveStudents = Array(courseDurationInDays).fill(rows.length);

    for (i in rows) {
      lastActiveDay = daysBetween(startDate, new Date(getRecordedOn(rows[i])));

      // Subtract 1 from all inactive days for that user
      for (j = lastActiveDay; j < courseDurationInDays; j++) {
        dailyActiveStudents[j]--;
      }
    }
    */

    dailyActiveStudents = Array(courseDurationInDays).fill(0);

    for (i in eventRows) {
      var userId = eventRows[i].user_id;
      var eventDate = new Date(eventRows[i].recorded_on);
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

    data = [];
    for (i = 0; i < courseDurationInDays; i++) {
      data.push(dailyActiveStudents == 0 ? 0 : Object.keys(dailyActiveStudents[i]).length);
    }


    plotDailyActiveStudents(data);
});
  //}, function(error) { console.error(error); });

});
