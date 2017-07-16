$(document).ready(function() {
  // Get Unit IDs from syllabus object, sorted
  var unitIds = Object.keys(syllabus).sort(
    function(a, b) {
      return parseInt(syllabus[a]['title'].split(' ')[1]) > parseInt(syllabus[b]['title'].split(' ')[1]) ? 1 : -1;
  });

  // Generate Unit names in the dropdown menu for Attempted and Completed Questions chart
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
          // Sort object keys by Lesson title's number
          return parseInt(syllabus[unitId]['lessons'][a].split(' ')[0].split('.')[1]) > parseInt(syllabus[unitId]['lessons'][b].split(' ')[0].split('.')[1]) ? 1 : -1;
        }
      );

      lessonIds.forEach(function(lesson) {
        $('#lesson-id').append('<option value={0}>{1}</option>'.format(lesson, syllabus[unitId]['lessons'][lesson]));
      });
    }
  });

  // Display appropriate additional fields when user selects chart type from dropdown menu
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

  // When main form is submitted, do some basic error handling,
  // hide the form, display chart's <div> and call appropriate function
  // to start data processing
  $('form').submit(function(event) {
    event.preventDefault();

    var chartType = $('#chart-type').val();

    if (chartType === 'Attempted and Completed Questions') {
      var unit = parseInt($('#unit-id').val());
      var lesson = parseInt($('#lesson-id').val());

      $('form').css('display', 'none');
      $('#chart').css('display', 'block');
      $('#filter').css('display', 'block');
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
      refreshWhenBack();
    }
  });

});
