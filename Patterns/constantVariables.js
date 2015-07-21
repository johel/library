// Exemplo modificado do livro Pro Javascript Design Patterns


/* Grouping constants together. */
var Class = (function() {
  
  // Private static attributes.
  var constants = {
    UPPER_BOUND: 100,
    LOWER_BOUND: -100
  }
  
 // Aqui x sera o construtor da classe "Class";
var x = function(){};

x.getConstant = function(name){
    return constants[name];
};

return x;

})();


/* Usage. */
Class.getConstant('UPPER_BOUND');