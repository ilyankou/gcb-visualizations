function attemptedCompletedQuestions(wantedUnit, wantedLesson) {

  $.getJSON('course-data/StudentAnswersEntity.json', function(json) {
    questionStats = {};

    for (i in json.rows) {
      var answ = getAnswers(json.rows[i]);
      var units = Object.keys(answ);

      for (j in units) {  // Iterate through units
        var u = units[j];

        if (!isNaN(wantedUnit) && wantedUnit != u) {
          continue;
        }

        var lessons = Object.keys(answ[u]);

        for (k in lessons) {  // Iterate through lessons
          var l = lessons[k];

          if (!isNaN(wantedLesson) && wantedLesson != l) {
            continue;
          }

          var q = answ[u][l];
          var questions = Object.keys(q);

          for (m in questions) { // Iterate through questions
            var qKey = questions[m];
            var o = answ[u][l][qKey];
            var qId = o.question_id;

            if (!qId) continue;   // Ignore questions with no question_id

            var qScore = o.score;
            var qAttempts = o.attempts;

            // If question has not been processed previously,
            // create a new JSON object and add it to the set
            if (!questionStats[qId]) {
              questionStats[qId] = {
                unit_id: o.unit_id,
                lesson_id: o.lesson_id,
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
    attemptedTimes = [];
    attemptedStudents = [];
    completed = [];
    failed = [];
    unsuccessful = [];
    completedStudentsRate = [];
    lessons = [];
    units = [];

      /* !!!!! CLEAN UP ALL THIS MESS BELOW */

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
        data1.push({
          y: completed[i],
          text: questionText[questionIds[i]],
          completed: completed[i],
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: (attemptedTimes[i] / completed[i]).toFixed(2),
          lesson: lessons[i],
          unit: units[i]
        });
        data2.push({
          y: failed[i],
          completed: completed[i],
          text: questionText[questionIds[i]],
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: (attemptedTimes[i] / completed[i]).toFixed(2),
          lesson: lessons[i],
          unit: units[i]
        });
        data3.push({
          y: unsuccessful[i],
          completed: completed[i],
          text: questionText[questionIds[i]],
          attemptedTimes: attemptedTimes[i],
          attemptedStudents: attemptedStudents[i],
          completedStudentsRate: completedStudentsRate[i],
          av: (attemptedTimes[i] / completed[i]).toFixed(2),
          lesson: lessons[i],
          unit: units[i]
        });
      }

      plotAttemptedCompletedQuestions(questionIds, data1, data2, data3);

    });

  });

}
