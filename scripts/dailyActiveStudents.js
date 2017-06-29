var startDate = new Date(2016, 5, 1);
var endDate = new Date(2018, 5, 31);

var courseDurationInDays = daysBetween(startDate, endDate);

/* This counts the number of active students for each day of the course */
// We assume that all students (rows.length) were active on all days
dailyActiveStudents = Array(courseDurationInDays).fill(rows.length);

for (i in rows) {
  lastActiveDay = daysBetween(startDate, strToDate(getRecordedOn(rows[i])));
  
  // Subtract 1 from all inactive days for that user
  for (j = lastActiveDay; j < courseDurationInDays; j++) {
    dailyActiveStudents[j]--;
  }
}

plotDailyActiveStudents(dailyActiveStudents);
