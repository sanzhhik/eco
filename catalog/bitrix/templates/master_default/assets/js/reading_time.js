window.RS = window.RS || {};

RS.ReadingTime = (function() {

  var defaultOptions = {
    wordsPerMinute: 250,
    returnStringPattern: '#READING_TIME# #UNIT#',
    lang: {
      lessThanAMinute: 'Less than a minute',
      minutes: ['min', 'min', 'min']
    }
  };

  var declOfNum = function (number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  return function($el, options) {

    var options = $.extend({}, defaultOptions, options);

    var returnString = '';

    var text = $el.text();
    var totalWords = text.trim().split(/\s+/g).length

    var readingTimeMinutes = Math.round(totalWords / options.wordsPerMinute);

    if (readingTimeMinutes > 0) {
      returnString = options.returnStringPattern
        .replace(/#READING_TIME#/g, readingTimeMinutes)
        .replace(/#UNIT#/g, declOfNum(readingTimeMinutes, options.lang.minutes));
    } else {
      returnString = options.lang.lessThanAMinute;
    }

    return $.when(returnString);
  };

}());
