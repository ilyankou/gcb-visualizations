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
