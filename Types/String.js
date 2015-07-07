/**
 * Arquivo que lista todas as extensões customizadas do objeto nativo string no javascript
 */

//source: http://stackoverflow.com/questions/1038746/equivalent-of-string-format-in-jquery


String.prototype.formatConfig = function (args) {
    var newStr = this;
    for (var key in args) {
        newStr = newStr.replace('{' + key + '}', args[key]);
    }
    return newStr;
}

//example
console.log("Hello {name}".formatConfig({ name: 'World' })); // Hello World



//Biblioteca já prontas
//-> http://stringjs.com/
//https://code.google.com/p/js-methods/

/**
* String prototype extensions.
* Extends string prototype with the following methods:
* trim, ltrim, rtrim, collapseSpaces, remove, reverse, repeat, pad, capitalize, camelize, truncate, stripTags
* 
* This extensions doesn't depend on any other code or overwrite existing methods.
*
*
* Copyright (c) 2007 Harald Hanek (http://js-methods.googlecode.com)
* 
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.gnu.org/licenses/gpl.html) licenses.
* 
* @author Harald Hanek
* @version 0.9
* @lastchangeddate 10. October 2007 17:40:58
* @revision 876
*/

(function(){

	/**
	* Extend the string prototype with the method under the given name if it doesn't currently exist.
	*
	* @private
	*/
	function append(name, method)
	{
		if(!String.prototype[name])
			String.prototype[name] = method;
	}


	/**
	* Entfernt Whitespace am Anfang und Ende des Strings und reduziert Whitespace innerhalb des Strings auf ein Zeichen.
	*
	* @example " My   name      is  Harry!   ".collapseSpaces();
	* @result "My name is Harry!"
	*
	* @name collapseSpaces
	* @return String
	*/
	append("collapseSpaces", function(){ 
		return this.trim().replace(/\s{2,}/g, " ").replace(/{(Keyword):\s*(.*?)\s*}/gi, "{$1:$2}");
	});


	/**
	* Removes a specified length of characters from a given postion.
	*
	* @example "JavaScript".remove(4, 6);
	* @result "Java"
	*
	* @name remove
	* @param Int start start postion
	* @param Int length length
	* @return String
	*/
	append("remove", function(start, length){ 
		var s = '' ;
		if(start > 0)
			s = this.substring(0, start);
	
		if(start + length < this.length)
			s += this.substring(start + length , this.length);
		return s ;
	});


	/**
	* Reverses the characters in the specified string.
	*
	* @example "Hello".reverse();
	* @result "olleH"
	*
	* @name reverse
	* @return String
	*/
	append("reverse", function(){ 
		if(!this)
			return '';
		var a = (this+'').split('');
		a.reverse();
		return a.join('');
	});


	/**
	* Returns 'str' repeated 'count' times, optionally placing 'separator' between each repetition
	*
	* @example "Hello".repeat(5);
	* @result "HelloHelloHelloHelloHello"
	*
	*
	* @example "Hello".repeat(5,'#');
	* @result "Hello#Hello#Hello#Hello#Hello"
	*
	* @name repeat
	* @param Int count Number of repetitions
	* @param String separator Separator
	* @return String
	*/
	append("repeat", function(count, separator){
		var t = this, s = "";
		while(--count+1 > 0)
			s += (separator && count != 0) ? t+separator : t;
		return s;
	});


	/**
	* Pad a string up to a given length. Padding characters are added to the left of the string.
	* 
	*
	* @example "22".pad(4, '#');
	* @result "##22"
	*
	*
	* @example "22".pad(4, '#', 1);
	* @result "22##"
	*
	* @name pad
	* @param Int length The final length of the string. (optional) default is (30)
	* @param String	ch Character used to fill up the string. (optional) default is (' ')
	* @param Int direction Direction to fill (start, end) 0|1 . (optional) default is start (0)
	* @return String
	*/
	append("pad", function(length, ch, direction){
		length = length || 30;
		direction = direction || 0;
		ch = ch || ' ';
		var t = this;
		while(t.length < length)
			t = (direction == 1) ? t+=ch : ch+t;
		return t;
	});


	/**
	* Capitalizes the first letter of a string and downcases all the others.
	*
	* @example "my name is harry".capitalize();
	* @result "My Name Is Harry"
	*
	* @name capitalize
	* @return String
	*/
	append("capitalize", function(){ 
		var w = this.split(' ');
		for(var i = 0; i < w.length; i++)
			//w[i] = w[i].charAt(0).toUpperCase() + w[i].substring(1);
			w[i] = w[i].charAt(0).toUpperCase() + w[i].substring(1).toLowerCase();
			
		return w.join(" ");
	});


	/**
	* Converts a string separated by dashes and/or underscores into a camelCase equivalent.
	* For instance, 'java-script' would be converted to 'javaScript'.
	*
	* @example "java-script".camelize();
	* @result "javaScript"
	*
	* @example "java_script_methods".camelize();
	* @result "javaScriptMethods"
	*
	* @example "java_script-methods".camelize();
	* @result "javaScriptMethods"
	*
	* @name camelize
	* @return String
	*/
	append("camelize", function(){
		return this.replace( /[-_]([a-z])/ig, function(z,b){ return b.toUpperCase()} );
	});


	/**
	* Returns a string that is no longer than a certain length.
	*
	* @example "JavaScript ".truncate(5);
	* @result "Ja..."
	*
	* @example "JavaScript ".truncate(5, "#");
	* @result "Java#"
	*
	* @name truncate
	* @param Number length (optional) The maximum length of the returned String, default is 50
	* @param String suffix (optional) The suffix to append to the truncated String, default is "..."
	* @return String
	*/
	append("truncate", function(length, suffix){
		length = length || 50;
		suffix = suffix === undefined ? "..." : suffix;
		return this.length > length ? this.slice(0, length - suffix.length) + suffix : this;
	});


	/**
	* Returns a string with all HTML tags stripped.
	*
	* @example "<div id='type'>JavaScript</div>".stripTags();
	* @result "JavaScript"
	*
	* @name stripTags
	* @return String
	*/
	append("stripTags", function(){
		return this.replace(/<\/?[^>]+>/gi, '');
	});

})();