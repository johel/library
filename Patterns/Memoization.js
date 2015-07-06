// source: Javascript The Good Parts

//versao 1: com alto custo de memoria

var fibonacci = function (n) {
return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

// versao 2, guardando os resultados anteriores
var fibonacci = function () {
	var memo = [0, 1];
	var fib = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
		};
	return fib;
}();

// versao 3 - generalizando
var memoizer = function (memo, fundamental) {
	var shell = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};
	return shell;
};


//exemplos de aplicaçao
var fibonacci = memoizer([0, 1], function (shell, n) {
return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1, 1], function (shell, n) {
return n * shell(n - 1);
});


//**********outra implementaçao que independe do tipo de parametro que eh passado********
//fonte: javascript patterns

//opcao 1
var myFunc = function (param) {
	if (!myFunc.cache[param]) {
		var result = {};
		// ... expensive operation ...
		myFunc.cache[param] = result;
	}
	return myFunc.cache[param];
};
// cache storage
myFunc.cache = {};

//opcao generalista
var myFunc = function () {
	var cachekey = JSON.stringify(Array.prototype.slice.call(arguments)),result;

	if (!myFunc.cache[cachekey]) {
		result = {};
		// ... expensive operation ...
		myFunc.cache[cachekey] = result;
	}
	return myFunc.cache[cachekey];
}
// cache storage
myFunc.cache = {};

