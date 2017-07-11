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
  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

$(document).ready(function() {

  $('#chart-type').change(function() {
    $('#additional-fields div').addClass('hidden');

    if ($(this).val() === 'Daily Active Students') {
      $('#dates').removeClass('hidden');
    }
    else if ($(this).val() === 'Attempted and Completed Questions') {
      $('#dates').addClass('hidden');
      $('#unit-lesson-div').removeClass('hidden');
    }
  });

  $('form').submit(function() {
    event.preventDefault();

    var chartType = $('#chart-type').val();

    if (chartType === 'Attempted and Completed Questions') {
      var unit = parseInt($('#unit-id').val());
      var lesson = parseInt($('#lesson-id').val());

      if (unit < 0 || lesson < 0) {
        alert('Unit and Lesson IDs must be positive integers!');
        return;
      }

      $('form').css('display', 'none');
      $('#chart').css('display', 'block');
      attemptedCompletedQuestions(unit, lesson);
    }
    else if (chartType === 'Daily Active Students') {
      var startDate = new Date($('#start-date').val());
      var endDate = new Date($('#end-date').val());

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Insert dates in a correct format!');
        return;
      }

      if (startDate > endDate) {
        alert('End date should be later than start date!');
        return;
      }

      $('form').css('display', 'none');
      $('#chart').css('display', 'block');
      dailyActiveStudents(startDate, endDate);
    }

  });


});
