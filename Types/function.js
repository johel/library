/* Add a method to the Function object that can be used to declare methods. */
Function.prototype.method = function(name, fn) {
	this.prototype[name] = fn;
};
/* Anim class, with methods created using a convenience method. */
var Anim = function() {

};

Anim.method('start', function() {

});
Anim.method('stop', function() {
...
});