function attemptedCompletedQuestions(wantedUnit, wantedLesson) {

  $.getJSON('course-data/StudentAnswersEntity.json', function(json) {
    questionStats = {};

    var isWantedType = {
      'McQuestion': document.getElementById('show-mc').checked,
      'SaQuestion': document.getElementById('show-sa').checked,
      'Quizly': document.getElementById('show-quizly').checked,
    }

    for (i in json.rows) {
      var answ = getAnswers(json.rows[i]);
      var units = Object.keys(answ);

      for (j in units) {  // Iterate through units
        var u = units[j];

        if (wantedUnit != u && wantedUnit != -1) {
          continue;
        }

        var lessons = Object.keys(answ[u]);

        for (k in lessons) {  // Iterate through lessons
          var l = lessons[k];

          if (wantedLesson != l && wantedLesson != -1) {
            continue;
          }

          var q = answ[u][l];
          var questions = Object.keys(q);

          for (m in questions) { // Iterate through questions
            var qKey = questions[m];
            var o = answ[u][l][qKey];
            var qId = o.question_id;
            var qType = o.question_type;

            if (!qId && (qType === 'SaQuestion')) {
              // Then must be Quizly. Quizly does not currently have quid, so use
              // question key instead
              qId = qKey;
              qType = 'Quizly';
            } else if (!qId) {
              continue;
            }

            if (!isWantedType[qType]) continue;

            var qScore = o.score;
            var qAttempts = o.attempts;

            // If question has not been processed previously,
            // create a new JSON object and add it to the set
            if (!questionStats[qId]) {
              questionStats[qId] = {
                unit_id: o.unit_id,
                lesson_id: o.lesson_id,
                question_type: qType,
                totalTimesAttempted: 0,
                totalStudentsAttempted: 0,
                totalStudentsCompleted: 0
              };
            }

            questionStats[qId].totalTimesAttempted += qAttempts;
            questionStats[qId].totalStudentsAttempted += 1;
            questionStats[qId].totalStudentsCompleted += (qScore == 1) ? 1 : 0;
          }
        }
      }
    }

    questionIds = Object.keys(questionStats);

    if (questionIds.length == 0) {
      alert('Nothing to display!');
      $('#chart').css('display', 'none');
      $('form').css('display', 'block');
      return;
    }

    refreshWhenBack();

    attemptedTimes = [];
    attemptedStudents = [];
    completed = [];
    failed = [];
    unsuccessful = [];
    completedStudentsRate = [];
    lessons = [];
    units = [];
    types = [];

    for (i in questionIds) {
      var q = questionStats[questionIds[i]];

      attemptedTimes.push(q.totalTimesAttempted);
      attemptedStudents.push(q.totalStudentsAttempted);
      completed.push(q.totalStudentsCompleted);
      failed.push(q.totalStudentsAttempted - q.totalStudentsCompleted);
      unsuccessful.push(q.totalTimesAttempted - q.totalStudentsAttempted);
      completedStudentsRate.push(Math.floor((q.totalStudentsCompleted / q.totalStudentsAttempted) * 100));
      lessons.push(q.lesson_id);
      units.push(q.unit_id);
      types.push(q.question_type);
    }


    $.getJSON('course-data/QuestionEntity.json', function(json) {
      questionText = {}
      for (i in json.rows) {
        var id = json.rows[i]['key.id'];
        questionText[id] = JSON.parse(json.rows[i].data).description;
      }

      data1 = [];
      data2 = [];
      data3 = [];

      for (i in questionIds) {
        var id = questionIds[i];
        // to avoid infinity:
        var av = completed[i] == 0 ? 0 : (attemptedTimes[i] / completed[i]).toFixed(2);
        var text = questionText[questionIds[i]];

        if (types[i] === 'Quizly') {
          if (quizly_desc[id]) {
            text = quizly_desc[id].desc;
            id = quizly_desc[id].name;
          } else {
            text = 'Quizly';
          }
        }

        data1.push({
          y: completed[i],
          id: id,
          text: text,
          completed: completed[i],
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: av,
          lesson: syllabus[units[i]].lessons[lessons[i]],
          unit: syllabus[units[i]].title,
          type: types[i]
        });
        data2.push({
          y: failed[i],
          id: id,
          completed: completed[i],
          text: text,
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: av,
          lesson: syllabus[units[i]].lessons[lessons[i]],
          unit: syllabus[units[i]].title,
          type: types[i]
        });
        data3.push({
          y: unsuccessful[i],
          id: id,
          completed: completed[i],
          text: text,
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: av,
          lesson: syllabus[units[i]].lessons[lessons[i]],
          unit: syllabus[units[i]].title,
          type: types[i]
        });
      }

      function sortByAv(a, b) {
        return (a.av < b.av) ? 1 : -1;
      }

      if ($('#sort-by-difficulty').is(':checked')) {
        data1.sort(sortByAv);
        data2.sort(sortByAv);
        data3.sort(sortByAv);
      }

      plotAttemptedCompletedQuestions(questionIds, data1, data2, data3);

    });

  });

}
