/**
 * Custom handling of 'go back' in the browser. Since the input form and
 * the charts are in displayed on the same page, imitates two different pages
 * by reloading the page when users click 'Back'.
 */
function refreshWhenBack() {
  window.location += '#';
  window.onpopstate = function() {
    location.reload();
  }
}

/**
 * Calculates the number of days between start and end dates
 */
function daysBetween(start, end) {
  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Returns a date in format MM-DD-YYYY
 */
function niceDate(d) {
  return (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
}

/**
 * Retrieves GET parameters from the URL
 */
function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};
