/*
string.js - Copyright (C) 2012-2014, JP Richardson <jprichardson@gmail.com>
*/

var S = (function() {
  "use strict";

  var VERSION = '3.3.1';

  var ENTITIES = {};

  // from http://semplicewebsites.com/removing-accents-javascript
  var latin_map={"Á":"A","A":"A","?":"A","?":"A","?":"A","?":"A","?":"A","A":"A","Â":"A","?":"A","?":"A","?":"A","?":"A","?":"A","Ä":"A","A":"A","?":"A","?":"A","?":"A","?":"A","À":"A","?":"A","?":"A","A":"A","A":"A","Å":"A","?":"A","?":"A","?":"A","Ã":"A","?":"AA","Æ":"AE","?":"AE","?":"AE","?":"AO","?":"AU","?":"AV","?":"AV","?":"AY","?":"B","?":"B","?":"B","?":"B","?":"B","?":"B","C":"C","C":"C","Ç":"C","?":"C","C":"C","C":"C","?":"C","?":"C","D":"D","?":"D","?":"D","?":"D","?":"D","?":"D","?":"D","?":"D","?":"D","Ð":"D","?":"D","?":"DZ","?":"DZ","É":"E","E":"E","E":"E","?":"E","?":"E","Ê":"E","?":"E","?":"E","?":"E","?":"E","?":"E","?":"E","Ë":"E","E":"E","?":"E","?":"E","È":"E","?":"E","?":"E","E":"E","?":"E","?":"E","E":"E","?":"E","?":"E","?":"E","?":"ET","?":"F","ƒ":"F","?":"G","G":"G","G":"G","G":"G","G":"G","G":"G","?":"G","?":"G","G":"G","?":"H","?":"H","?":"H","H":"H","?":"H","?":"H","?":"H","?":"H","H":"H","Í":"I","I":"I","I":"I","Î":"I","Ï":"I","?":"I","I":"I","?":"I","?":"I","Ì":"I","?":"I","?":"I","I":"I","I":"I","I":"I","I":"I","?":"I","?":"D","?":"F","?":"G","?":"R","?":"S","?":"T","?":"IS","J":"J","?":"J","?":"K","K":"K","K":"K","?":"K","?":"K","?":"K","?":"K","?":"K","?":"K","?":"K","L":"L","?":"L","L":"L","L":"L","?":"L","?":"L","?":"L","?":"L","?":"L","?":"L","?":"L","?":"L","?":"L","L":"L","?":"LJ","?":"M","?":"M","?":"M","?":"M","N":"N","N":"N","N":"N","?":"N","?":"N","?":"N","?":"N","?":"N","?":"N","?":"N","?":"N","Ñ":"N","?":"NJ","Ó":"O","O":"O","O":"O","Ô":"O","?":"O","?":"O","?":"O","?":"O","?":"O","Ö":"O","?":"O","?":"O","?":"O","?":"O","O":"O","?":"O","Ò":"O","?":"O","O":"O","?":"O","?":"O","?":"O","?":"O","?":"O","?":"O","?":"O","?":"O","O":"O","?":"O","?":"O","O":"O","O":"O","O":"O","Ø":"O","?":"O","Õ":"O","?":"O","?":"O","?":"O","?":"OI","?":"OO","?":"E","?":"O","?":"OU","?":"P","?":"P","?":"P","?":"P","?":"P","?":"P","?":"P","?":"Q","?":"Q","R":"R","R":"R","R":"R","?":"R","?":"R","?":"R","?":"R","?":"R","?":"R","?":"R","?":"R","?":"C","?":"E","S":"S","?":"S","Š":"S","?":"S","S":"S","S":"S","?":"S","?":"S","?":"S","?":"S","?":"SS","T":"T","T":"T","?":"T","?":"T","?":"T","?":"T","?":"T","?":"T","?":"T","T":"T","T":"T","?":"A","?":"L","?":"M","?":"V","?":"TZ","Ú":"U","U":"U","U":"U","Û":"U","?":"U","Ü":"U","U":"U","U":"U","U":"U","U":"U","?":"U","?":"U","U":"U","?":"U","Ù":"U","?":"U","U":"U","?":"U","?":"U","?":"U","?":"U","?":"U","?":"U","U":"U","?":"U","U":"U","U":"U","U":"U","?":"U","?":"U","?":"V","?":"V","?":"V","?":"V","?":"VY","?":"W","W":"W","?":"W","?":"W","?":"W","?":"W","?":"W","?":"X","?":"X","Ý":"Y","Y":"Y","Ÿ":"Y","?":"Y","?":"Y","?":"Y","?":"Y","?":"Y","?":"Y","?":"Y","?":"Y","?":"Y","Z":"Z","Ž":"Z","?":"Z","?":"Z","Z":"Z","?":"Z","?":"Z","?":"Z","?":"Z","?":"IJ","Œ":"OE","?":"A","?":"AE","?":"B","?":"B","?":"C","?":"D","?":"E","?":"F","?":"G","?":"G","?":"H","?":"I","?":"R","?":"J","?":"K","?":"L","?":"L","?":"M","?":"N","?":"O","?":"OE","?":"O","?":"OU","?":"P","?":"R","?":"N","?":"R","?":"S","?":"T","?":"E","?":"R","?":"U","?":"V","?":"W","?":"Y","?":"Z","á":"a","a":"a","?":"a","?":"a","?":"a","?":"a","?":"a","a":"a","â":"a","?":"a","?":"a","?":"a","?":"a","?":"a","ä":"a","a":"a","?":"a","?":"a","?":"a","?":"a","à":"a","?":"a","?":"a","a":"a","a":"a","?":"a","?":"a","å":"a","?":"a","?":"a","?":"a","ã":"a","?":"aa","æ":"ae","?":"ae","?":"ae","?":"ao","?":"au","?":"av","?":"av","?":"ay","?":"b","?":"b","?":"b","?":"b","?":"b","?":"b","b":"b","?":"b","?":"o","c":"c","c":"c","ç":"c","?":"c","c":"c","?":"c","c":"c","?":"c","?":"c","d":"d","?":"d","?":"d","?":"d","?":"d","?":"d","?":"d","?":"d","?":"d","?":"d","?":"d","d":"d","?":"d","?":"d","i":"i","?":"j","?":"j","?":"j","?":"dz","?":"dz","é":"e","e":"e","e":"e","?":"e","?":"e","ê":"e","?":"e","?":"e","?":"e","?":"e","?":"e","?":"e","ë":"e","e":"e","?":"e","?":"e","è":"e","?":"e","?":"e","e":"e","?":"e","?":"e","?":"e","e":"e","?":"e","?":"e","?":"e","?":"e","?":"et","?":"f","ƒ":"f","?":"f","?":"f","?":"g","g":"g","g":"g","g":"g","g":"g","g":"g","?":"g","?":"g","?":"g","g":"g","?":"h","?":"h","?":"h","h":"h","?":"h","?":"h","?":"h","?":"h","?":"h","?":"h","h":"h","?":"hv","í":"i","i":"i","i":"i","î":"i","ï":"i","?":"i","?":"i","?":"i","ì":"i","?":"i","?":"i","i":"i","i":"i","?":"i","?":"i","i":"i","?":"i","?":"d","?":"f","?":"g","?":"r","?":"s","?":"t","?":"is","j":"j","j":"j","?":"j","?":"j","?":"k","k":"k","k":"k","?":"k","?":"k","?":"k","?":"k","?":"k","?":"k","?":"k","?":"k","l":"l","l":"l","?":"l","l":"l","l":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","?":"l","l":"l","?":"lj","?":"s","?":"s","?":"s","?":"s","?":"m","?":"m","?":"m","?":"m","?":"m","?":"m","n":"n","n":"n","n":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","?":"n","ñ":"n","?":"nj","ó":"o","o":"o","o":"o","ô":"o","?":"o","?":"o","?":"o","?":"o","?":"o","ö":"o","?":"o","?":"o","?":"o","?":"o","o":"o","?":"o","ò":"o","?":"o","o":"o","?":"o","?":"o","?":"o","?":"o","?":"o","?":"o","?":"o","?":"o","?":"o","o":"o","?":"o","?":"o","o":"o","o":"o","ø":"o","?":"o","õ":"o","?":"o","?":"o","?":"o","?":"oi","?":"oo","?":"e","?":"e","?":"o","?":"o","?":"ou","?":"p","?":"p","?":"p","?":"p","?":"p","?":"p","?":"p","?":"p","?":"p","?":"q","?":"q","?":"q","?":"q","r":"r","r":"r","r":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"r","?":"c","?":"c","?":"e","?":"r","s":"s","?":"s","š":"s","?":"s","s":"s","s":"s","?":"s","?":"s","?":"s","?":"s","?":"s","?":"s","?":"s","?":"s","g":"g","ß":"ss","?":"o","?":"o","?":"u","t":"t","t":"t","?":"t","?":"t","?":"t","?":"t","?":"t","?":"t","?":"t","?":"t","?":"t","?":"t","t":"t","?":"t","t":"t","?":"th","?":"a","?":"ae","?":"e","?":"g","?":"h","?":"h","?":"h","?":"i","?":"k","?":"l","?":"m","?":"m","?":"oe","?":"r","?":"r","?":"r","?":"r","?":"t","?":"v","?":"w","?":"y","?":"tz","ú":"u","u":"u","u":"u","û":"u","?":"u","ü":"u","u":"u","u":"u","u":"u","u":"u","?":"u","?":"u","u":"u","?":"u","ù":"u","?":"u","u":"u","?":"u","?":"u","?":"u","?":"u","?":"u","?":"u","u":"u","?":"u","u":"u","?":"u","u":"u","u":"u","?":"u","?":"u","?":"ue","?":"um","?":"v","?":"v","?":"v","?":"v","?":"v","?":"v","?":"v","?":"vy","?":"w","w":"w","?":"w","?":"w","?":"w","?":"w","?":"w","?":"w","?":"x","?":"x","?":"x","ý":"y","y":"y","ÿ":"y","?":"y","?":"y","?":"y","?":"y","?":"y","?":"y","?":"y","?":"y","?":"y","?":"y","z":"z","ž":"z","?":"z","?":"z","?":"z","z":"z","?":"z","?":"z","?":"z","?":"z","?":"z","?":"z","z":"z","?":"z","?":"ff","?":"ffi","?":"ffl","?":"fi","?":"fl","?":"ij","œ":"oe","?":"st","?":"a","?":"e","?":"i","?":"j","?":"o","?":"r","?":"u","?":"v","?":"x"};

//******************************************************************************
// Added an initialize function which is essentially the code from the S
// constructor.  Now, the S constructor calls this and a new method named
// setValue calls it as well.  The setValue function allows constructors for
// modules that extend string.js to set the initial value of an object without
// knowing the internal workings of string.js.
//
// Also, all methods which return a new S object now call:
//
//      return new this.constructor(s);
//
// instead of:
//
//      return new S(s);
//
// This allows extended objects to keep their proper instanceOf and constructor.
//******************************************************************************

  function initialize (object, s) {
    if (s !== null && s !== undefined) {
      if (typeof s === 'string')
        object.s = s;
      else
        object.s = s.toString();
    } else {
      object.s = s; //null or undefined
    }

    object.orig = s; //original object, currently only used by toCSV() and toBoolean()

    if (s !== null && s !== undefined) {
      if (object.__defineGetter__) {
        object.__defineGetter__('length', function() {
          return object.s.length;
        })
      } else {
        object.length = s.length;
      }
    } else {
      object.length = -1;
    }
  }

  function S(s) {
    if(!(this instanceof S)){
      return new S(s);
    }
    else
    {
      initialize(this, s);
    }
  }

  var __nsp = String.prototype;
  var __sp = S.prototype = {

    between: function(left, right) {
      var s = this.s;
      var startPos = s.indexOf(left);
      var endPos = s.indexOf(right, startPos + left.length);
      if (endPos == -1 && right != null)
        return new this.constructor('')
      else if (endPos == -1 && right == null)
        return new this.constructor(s.substring(startPos + left.length))
      else
        return new this.constructor(s.slice(startPos + left.length, endPos));
    },


    capitalize: function() {
      return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
    },

    charAt: function(index) {
      return this.s.charAt(index);
    },

    chompLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
         s = s.slice(prefix.length);
         return new this.constructor(s);
      } else {
        return this;
      }
    },

    chompRight: function(suffix) {
      if (this.endsWith(suffix)) {
        var s = this.s;
        s = s.slice(0, s.length - suffix.length);
        return new this.constructor(s);
      } else {
        return this;
      }
    },


    contains: function(ss) {
      return this.s.indexOf(ss) >= 0;
    },


    endsWith: function() {
      var suffixes = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < suffixes.length; ++i) {
        var l  = this.s.length - suffixes[i].length;
        if (l >= 0 && this.s.indexOf(suffixes[i], l) === l) return true;
      }
      return false;
    },

    ensureLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
        return this;
      } else {
        return new this.constructor(prefix + s);
      }
    },

    ensureRight: function(suffix) {
      var s = this.s;
      if (this.endsWith(suffix))  {
        return this;
      } else {
        return new this.constructor(s + suffix);
      }
    },

    isLower: function() {
      return this.isAlpha() && this.s.toLowerCase() === this.s;
    },

    isUpper: function() {
      return this.isAlpha() && this.s.toUpperCase() === this.s;
    },

    left: function(N) {
      if (N >= 0) {
        var s = this.s.substr(0, N);
        return new this.constructor(s);
      } else {
        return this.right(-N);
      }
    },

    lines: function() { //convert windows newlines to unix newlines then convert to an Array of lines
      return this.replaceAll('\r\n', '\n').s.split('\n');
    },

    pad: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      len = len - this.s.length;
      var left = Array(Math.ceil(len / 2) + 1).join(ch);
      var right = Array(Math.floor(len / 2) + 1).join(ch);
      return new this.constructor(left + this.s + right);
    },

    padLeft: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
    },

    padRight: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
    },

    replaceAll: function(ss, r) {
      //var s = this.s.replace(new RegExp(ss, 'g'), r);
      var s = this.s.split(ss).join(r)
      return new this.constructor(s);
    },

    strip: function() {
      var ss = this.s;
      for(var i= 0, n=arguments.length; i<n; i++) {
        ss = ss.split(arguments[i]).join('');
      }
      return new this.constructor(ss);
    },


    right: function(N) {
      if (N >= 0) {
        var s = this.s.substr(this.s.length - N, N);
        return new this.constructor(s);
      } else {
        return this.left(-N);
      }
    },

    setValue: function (s) {
     initialize(this, s);
     return this;
    },


    startsWith: function() {
      var prefixes = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < prefixes.length; ++i) {
        if (this.s.lastIndexOf(prefixes[i], 0) === 0) return true;
      }
      return false;
    },


    times: function(n) {
        var vetor = new Array(n+1);
        var textoRepetido = vetor.join(this.s);
        return new this.constructor(textoRepetido);
    },

    toBoolean: function() {
      if (typeof this.orig === 'string') {
        var s = this.s.toLowerCase();
        return s === 'true' || s === 'yes' || s === 'on' || s === '1';
      } else
        return this.orig === true || this.orig === 1;
    },

    toFloat: function(precision) {
      var num = parseFloat(this.s)
      if (precision)
        return parseFloat(num.toFixed(precision))
      else
        return num
    },


    toString: function() {
      return this.s;
    },

    valueOf: function() {
      return this.s.valueOf();
    }

  }

  var methodsAdded = [];
  function extendPrototype() {
    for (var name in __sp) {
      (function(name){
        var func = __sp[name];
        if (!__nsp.hasOwnProperty(name)) {
          methodsAdded.push(name);
          __nsp[name] = function() {
            String.prototype.s = this;
            return func.apply(this, arguments);
          }
        }
      })(name);
    }
  }

  function restorePrototype() {
    for (var i = 0; i < methodsAdded.length; ++i)
      delete String.prototype[methodsAdded[i]];
    methodsAdded.length = 0;
  }


/*************************************
/* Attach Native JavaScript String Properties
/*************************************/

  var nativeProperties = getNativeStringProperties();
  for (var name in nativeProperties) {
    (function(name) {
      var stringProp = __nsp[name];
      if (typeof stringProp == 'function') {
        //console.log(stringProp)
        if (!__sp[name]) {
          if (nativeProperties[name] === 'string') {
            __sp[name] = function() {
              //console.log(name)
              return new this.constructor(stringProp.apply(this, arguments));
            }
          } else {
            __sp[name] = stringProp;
          }
        }
      }
    })(name);
  }



//******************************************************************************
// Set the constructor.  Without this, string.js objects are instances of
// Object instead of S.
//******************************************************************************

  __sp.constructor = S;


/*************************************
/* Private Functions
/*************************************/

  function getNativeStringProperties() {
    var names = getNativeStringPropertyNames();
    var retObj = {};

    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      if (name === 'to' || name === 'toEnd') continue;       // get rid of the shelljs prototype messup
      var func = __nsp[name];
      try {
        var type = typeof func.apply('teststring');
        retObj[name] = type;
      } catch (e) {}
    }
    return retObj;
  }

  function getNativeStringPropertyNames() {
    var results = [];
    var stringNames = {};
    var objectNames = [];
    for (var name in String.prototype)
      stringNames[name] = name;

    for (var name in Object.prototype)
      delete stringNames[name];

    //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
    for (var name in stringNames) {
      results.push(name);
    }
    return results;
  }

  return S;

})();