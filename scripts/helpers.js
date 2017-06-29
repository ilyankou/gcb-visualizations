/**
 * A bunch of getters to access student information from a database row
 */
function getEmail(r) {
  return r['key.name'];
}

function getRecordedOn(r) {
  return r['recorded_on'];
}

function getAnswers(r) {
  return JSON.parse(r.answers_dict).answers;
}


/**
 * Calculates the number of days between start and end dates
 */
function daysBetween(start, end) {
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}


/**
 * Returns a Date object from a string of kind: '2017-06-26T17:03:01.104330Z'
 * Such date string is stored in recorded_on
 */
function strToDate(s) {
  var d = s.split('T')[0].split('-');
  return new Date(d[0], d[1] - 1, d[2]);
}
