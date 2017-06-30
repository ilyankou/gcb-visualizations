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


/**
 * Function to load JSON
 */
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
