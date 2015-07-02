// Decorator Pattern
// Implementaçao em javascript dd exemplo dos cafes presente no livro design patterns - head first

//decorator pattern


//componente a ser exapandido(podem existir varios implementando a mesma interface)
var Expresso = function () {
    this.price = 2;
    this.cost = function () {
        return this.price;
    };
    this.description = function () { return "Express coffe" ;};
};

//decorator - adds milk to the coffe and change its cost
var Mocha = function(someCoffe) {
    this.cost = function() {
        return ( 1 + someCoffe.cost() );
    };
    this.description = function () {
        return someCoffe.description() + " plus: " + "milk";
    };
    this.price = function() {
        return 1.1 * this.cost();
    };
};

//decorator - adds chocolate to the coffe and change its cost
var Late = function(someCoffe) {
    this.cost = function() {
        return ( 2 + someCoffe.cost() );
    };
    this.description = function () {
        return someCoffe.description() + " plus: " + "chocolate";
    };
    this.price = function() {
        return 1.1 * this.cost();
    };
};

var doubleMochaCoffe = new Mocha(new Mocha(new Expresso()));
var lateMochaExpresso = new Mocha(new Late(new Expresso()));
doubleMochaCoffe.descrition();
lateMochaExpresso.price();