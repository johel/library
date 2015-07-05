(function() {
  'use strict';

  function addMethod(object, name, fn) {
    var old = object[name];
    object[name] = function() {
      if (fn.length == arguments.length) {
        return fn.apply(this, arguments);
      } else if (typeof old == 'function') {
        return old.apply(this, arguments);
      }
    };
  }

  // our object
  var data = {
    languages: ['javascript', 'php', 'ruby']
  }

  addMethod(data, 'find', function() {
    return this.languages;
  });

  addMethod(data, 'find', function(name) {
    var languages = [];
    for (var i = 0, len = this.languages.length; i < len; i++) {
       // has language
      if (this.languages[i].indexOf(name) == 0) {
        languages.push(this.languages[i]);
      }
    }

    return languages;
  });

  data.find(); // [javascript, php, ruby]
  data.find('javascript'); // [javascript]
}());
