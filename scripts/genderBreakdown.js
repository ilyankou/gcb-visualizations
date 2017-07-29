function genderBreakdown() {

  $.getJSON(dataFolder + 'Student.json', function(json) {

    var gender = {
      Students: {
        Male: 0,
        Female: 0,
        Other: 0
      },
      Teachers: {
        Male: 0,
        Female: 0,
        Other: 0
      }
    }

    for (i in json.rows) {
      var fields = json.rows[i].additional_fields;
      var who, gen = '';

      if (fields.indexOf('"usertype", "teacher"') > -1) {
        who = 'Teachers';
      } else if (fields.indexOf('"usertype", "student"')) {
        who = 'Students';
      }

      if (fields.indexOf('"gender", "male"') > -1) {
        gen = 'Male';
      } else if (fields.indexOf('"gender", "female"') > -1) {
        gen = 'Female';
      } else {
        gen = 'Other';
      }

      if (gender[who]) {
        gender[who][gen] += 1;
      }
    }

    var usertypes = [];
    ['Teachers', 'Students'].map(function(u) {
      usertypes.push({name: u, y: gender[u]['Male'] + gender[u]['Female'] + gender[u]['Other']});
    });

    usertypes[0].color = '#EE7600';   // Teachers color
    usertypes[1].color = 'orange';  // Students color

    function getPerc(u) {
      var i = (u == 'Teachers') ? 0 : 1;
      var total = usertypes[0].y + usertypes[1].y;
      return usertypes[i].y / total;
    }

    var genders = [];
    ['Teachers', 'Students'].map(function(u) {
      ['Male', 'Female', 'Other'].map(function(g) {
        genders.push({
          name: g,
          y: gender[u][g],
          color: g == 'Male' ? 'deepskyblue' : (g == 'Female' ? 'pink' : '#eee'),
          perc: getPerc(u)
        });
      })
    });

    refreshWhenBack();
    plotGenderBreakdown(usertypes, genders);

  });

}
