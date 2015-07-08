/*
When you find yourself calling the same function and passing mostly the same parameters, then the function is probably a good candidate for currying. You can create a new
function dynamically by partially applying a set of arguments to your function. The
new function will keep the repeated parameters stored (so you don’t have to pass them
every time) and will use them to pre-fill the full list of arguments that the original
function expects.

Currying has nothing to do with the spicy Indian dish; it comes from the name of the
mathematician Haskell Curry. (The Haskell programming language is also named after
him.) Currying is a transformation process—we transform a function. An alternative
name for currying could be schönfinkelisation, after the name of another mathematician, Moses Schönfinkel, the original inventor of this transformation.

 */

//Source Javascript Patterns

function schonfinkelize(fn) {
	var slice = Array.prototype.slice,
	stored_args = slice.call(arguments, 1);
	return function () {
		var new_args = slice.call(arguments),
		args = stored_args.concat(new_args);
		return fn.apply(null, args);
 	};
}

//examples

// a normal function
function add(a, b, c, d, e) {
	console.log(a + b + c + d + e);
}

// works with any number of arguments
schonfinkelize(add, 1, 2, 3)(5, 5); // 16
// two-step currying
var addOne = schonfinkelize(add, 1);
addOne(10, 10, 10, 10); // 41
var addSix = schonfinkelize(addOne, 2, 3);
addSix(5, 5); // 16