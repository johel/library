//soluçao1

var LOGGER = {};

function Logger(){
	if(LOGGER!=={})
		return LOGGER;
	else
	{
		LOGGER=this;
		return LOGGER;
	}
	
}

a = new Logger();
b = new Logger();
console.log(a===b);


//solucao2

function Logger(){
	if(typeof Logger.singleInstance === 'undefined')
		Logger.singleInstance = this
	return Logger.singleInstance;
}

a = new Logger();
b = new Logger();
console.log(a===b);

//solucao3

var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 
//teste
function run() {
 
    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();
 
    alert("Same instance? " + (instance1 === instance2));  
}


//solucao 4

var Logger = (function(){
	var instance;
	return function(){
		 if (typeof instance === 'undefined') {
                instance = this;
            }
            return instance;
	}

})();

a = new Logger();
b = new Logger();
console.log(a===b);

//solucao 5 -- a melhor!

var Logger = (function(){
	var instance;
	function innerLogger(){
			 if (typeof instance === 'undefined') {
	                instance = this;
	            }
	            return instance;
		}

	innerLogger.prototype.saySomething = function(){console.log('Hey!')};

	return innerLogger;

})();

a = new Logger();
b = new Logger();
console.log(a===b);