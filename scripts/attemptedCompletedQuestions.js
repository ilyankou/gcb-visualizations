function attemptedCompletedQuestions(wantedUnit, wantedLesson) {

  $.getJSON(dataFolder + 'StudentAnswersEntity.json', function(json) {
    questionStats = {};

    var questionTypeWanted = {
      'McQuestion': document.getElementById('show-mc').checked,
      'SaQuestion': document.getElementById('show-sa').checked,
      'Quizly': document.getElementById('show-quizly').checked,
    }

    for (i in json.rows) {
      var dict = JSON.parse(json.rows[i].answers_dict);
      if (!dict) continue;

      var answ = dict.answers;
      var units = Object.keys(answ);

      for (j in units) {  // Iterate through units
        var u = units[j];

        // Do not continue if not wanted unit
        if (wantedUnit != u && wantedUnit != -1) {
          continue;
        }

        var lessons = Object.keys(answ[u]);

        for (k in lessons) {  // Iterate through lessons
          var l = lessons[k];

          // Do not continue if does not belong to wanted lesson
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
              // Do not continue if quid is missing and not a Quizly exercise
              continue;
            }

            // Check if question type is what user wants
            if (!questionTypeWanted[qType]) continue;

            var qScore = o.score;
            var qAttempts = o.attempts;

            // If we haven't encountered this question yet, create a new object
            if (!questionStats[qId]) {
              questionStats[qId] = {
                unitId: o.unit_id,
                lessonId: o.lesson_id,
                questionType: qType,
                attemptedTimes: 0,
                attemptedStudents: 0,
                completed: 0
              };
            }

            questionStats[qId].attemptedTimes += qAttempts;
            questionStats[qId].attemptedStudents += 1;
            questionStats[qId].completed += (qScore == 1) ? 1 : 0;
          }
        }
      }
    }

    questionIds = Object.keys(questionStats);

    if (questionIds.length == 0) {
      alert('Nothing to display!');
      $('#chart').css('display', 'none');
      $('#filter').css('display', 'none');
      $('form').css('display', 'block');
      return;
    } else {
      // Add an event listener that would refresh the page on Back
      // Needed for proper UX
      refreshWhenBack();
    }


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

      attemptedTimes.push(q.attemptedTimes);
      attemptedStudents.push(q.attemptedStudents);
      completed.push(q.completed);
      failed.push(q.attemptedStudents - q.completed);
      unsuccessful.push(q.attemptedTimes - q.attemptedStudents);
      completedStudentsRate.push(Math.floor((q.completed / q.attemptedStudents) * 100));
      lessons.push(q.lessonId);
      units.push(q.unitId);
      types.push(q.questionType);
    }

    function getLessonTitle(i) {
      if (syllabus[units[i]] && syllabus[units[i]].lessons) {
        return syllabus[units[i]].lessons[lessons[i]];
      }
      return i;
    }

    function getUnitTitle(i) {
      if (syllabus[units[i]]) {
        return syllabus[units[i]].title;
      }
      return i;
    }

    // QuestionEntity contains data on all non-Quizly questions, e.g. their description,
    // full question text, possible answers, etc. We need this so that we can
    // replace question IDs with question description
    $.getJSON(dataFolder + 'QuestionEntity.json', function(json) {
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
        // to avoid difficulty = infinity:
        var av = completed[i] == 0 ? 0 : (attemptedTimes[i] / completed[i]).toFixed(2);
        var text = questionText[questionIds[i]];
        var lesson = getLessonTitle(i);
        var unit = getUnitTitle(i);

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
          lesson: lesson,
          unit: unit,
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
          lesson: lesson,
          unit: unit,
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
          lesson: lesson,
          unit: unit,
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
