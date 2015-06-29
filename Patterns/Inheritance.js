//Modelo de herança, source: The Principles of Object Oriented Javascrip

function Rectangle(length, width) {
	this.length = length;
	this.width = width;
}


Rectangle.prototype.getArea = function() {
	return this.length * this.width;
};

Rectangle.prototype.toString = function() {
	return "[Rectangle " + this.length + "x" + this.width + "]";
};
// inherits from Rectangle
function Square(size) {
	Rectangle.call(this, size, size);
	// optional: add new properties or override existing ones here
}

//onde a heranca ocorre de fato, note que o valor do construtor eh novamente Square
Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
	configurable: true,
	enumerable: true,
	value: Square,
	writable: true
	}
});

Square.prototype.toString = function() {
	return "[Square " + this.length + "x" + this.width + "]";
};

var square = new Square(6);
console.log(square.length);
console.log(square.width);
console.log(square.getArea());
// 6
// 6
// 36


//Exemplo de template method em que a real implementacao vem dos filhos e nao do pai

function Pai() {
	if(this.__proto__.constructor !== Pai )
    	this.nome = "Johel Herdado"
    else
    	this.nome = "Johel Pai"
}

Pai.prototype.falar = function(){
    if(this.verificaMaiorQueDoisAnos()){  //deixa implementacao de verificaMaiorQueDoisAnos pros filhos --template method
        console.log("Oi, meu nome eh:" + this.nome);
    }
    else
        console.log("Eu nao sei falar ainda");
}

function Filho(idade) {
    Pai.call(this);
    this.idade = idade;
}

Filho.prototype = Object.create(Pai.prototype, {
     constructor:  {
     configurable: true,
     enumerable: true,
     value:  Filho,
     writable: true
     }
 });

Filho.prototype.verificaMaiorQueDoisAnos = function () {
    return this.idade > 2;
}

var johelJr = new Filho(3);
johelJr.falar();

// var johel = new Pai();
// johel.falar(); //erro