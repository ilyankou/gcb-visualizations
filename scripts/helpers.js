function refreshWhenBack() {
  window.location += '#'
  window.onpopstate = function() {
    location.reload()
  }
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

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
  // Get Unit IDs from syllabus object, sorted
  var unitIds = Object.keys(syllabus).sort(
    function(a, b) {
      return parseInt(syllabus[a]['title'].split(' ')[1]) > parseInt(syllabus[b]['title'].split(' ')[1]) ? 1 : -1;
  });

  unitIds.forEach(function(unit) {
    $('#unit-id').append('<option value={0}>{1}</option>'.format(unit, syllabus[unit].title));
  });

  $('#unit-id').change(function() {
    $('#lesson-id option:not([value="-1"])').each(function() {
      $(this).remove();
    });

    var unitId = $(this).val();
    if (unitId != '-1') {
      var lessonIds = Object.keys(syllabus[unitId]['lessons']).sort(
        function(a, b) {
          return parseFloat(syllabus[unitId]['lessons'][a].split(' ')[0]) > parseFloat(syllabus[unitId]['lessons'][b].split(' ')[0]) ? 1 : -1;
        }
      );

      lessonIds.forEach(function(lesson) {
        $('#lesson-id').append('<option value={0}>{1}</option>'.format(lesson, syllabus[unitId]['lessons'][lesson]));
      });
    }
  });

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

      $('form').css('display', 'none');
      $('#chart').css('display', 'block');
      attemptedCompletedQuestions(unit, lesson);
      refreshWhenBack();
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
      refreshWhenBack();
    }

  });

});
