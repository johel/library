!function (exports) {
  'use strict';

  function EnumElem(value, str, attrs) {
    this._value = value;
    this._str = str;
    if (typeof attrs === 'object') {
      for (var prop in attrs) {
        if (!attrs.hasOwnProperty(prop)) {
          continue;
        }
        if (prop.charAt(0) !== '_') {
          this[prop] = attrs[prop];
        } else {
          throw new TypeError('The object of extra attributes can\'t have any attribute starting with \'_\', but <'
            + prop + '> starts with \'_\'');
        }
      }
    } else if (typeof attrs !== 'undefined') {
      throw new TypeError('The 3rd attribute in EnumElem should be an Object');
    }
    Object.freeze(this);
  }

  EnumElem.prototype.valueOf = function () {
    return this._value;
  };
  EnumElem.prototype.toString = function () {
    return this._str;
  };

  function Enum() {
    var name, value, str, attrs;
    for (var i in arguments) {
      if (typeof arguments[i] === 'string') {
        name = arguments[i];
        value = Number(i) + 1;
        str = name;
      } else {
        var obj = arguments[i];
        name = Object.keys(obj)[0];
        if (obj[name] instanceof Array) {
          value = obj[name][0];
          str = obj[name][1];
          if (obj[name][2]) {
            attrs = obj[name][2];
          }
        } else {
          if (typeof obj[name] === 'number') {
            value = obj[name];
            str = name;
          } else {
            value = Number(i) + 1;
            str = obj[name];
          }
        }
      }
      try {
        this[name] = new EnumElem(value, str, attrs);
      } catch (e) {
        throw e;
      }
      this['_' + str] = this[name];
      this['_' + value] = this[name];
    }
    Object.freeze(this);
  }

  Enum.prototype.parse = function (value) {
    if (!Array.isArray(value)) {
      return this['_' + value.valueOf()];
    }
    return value.map(function (value) {
      return this.parse(value);
    }.bind(this));
  };
  exports.Enum = Enum;
}(typeof exports === 'undefined' ? this.types = {} : exports);

// Exemplos de uso da classe Enum

var Cores = new types.Enum('Azul', 'Verde', 'Amarelo');
console.log(Cores.Azul); // EnumElem Azul
console.log(Cores.Verde); // EnumElem Verde
console.log(Cores.Amarelo); // EnumElem Amarelo

console.log(+Cores.Azul); // 1
console.log(Number(Cores.Verde)); // 2
console.log(Cores.Amarelo + 10); // 13

console.log(Cores.Azul.toString()); // 'Azul'
console.log(String(Cores.Verde)); // 'Verde'
console.log('O sol eh '.concat(Cores.Amarelo)); // 'Amarelo'
console.log(Cores.Amarelo + ' escuro'); // '3 escuro'

var minhaCor = Cores.Azul;
console.log(minhaCor === Cores.Azul); // true
switch (minhaCor) {
  case Cores.Azul:
    console.log('Azul');
    break;
  case Cores.Verde:
    console.log('Verde');
    break;
  case Cores.Amarelo:
    console.log('Amarelo');
    break;
} // 'Azul'

minhaCor = Cores.parse(2);
console.log(minhaCor === Cores.Verde); // true

minhaCor = Cores.parse('Amarelo');
console.log(minhaCor === Cores.Amarelo); // true

var minhasCores = Cores.parse([2, 'Verde', [1, 3]]);
console.log(minhasCores[0] === Cores.Verde); // true
console.log(minhasCores[1] === Cores.Verde); // true
console.log(minhasCores[2][0] === Cores.Azul); // true
console.log(minhasCores[2][1] === Cores.Amarelo); // true

var Animais = new types.Enum(
  {UrsoPardo: [2, 'Urso Pardo']},
  {CachorroQuente: [7, 'Cachorro Quente']},
  {MacacoPrego: [3, 'Macaco Prego']}
);

console.log(+Animais.UrsoPardo); // 2
console.log(+Animais.CachorroQuente); // 7
console.log(+Animais.MacacoPrego); // 3

console.log(Animais.UrsoPardo.toString()); // 'Urso Pardo'
console.log(Animais.CachorroQuente.toString()); // 'Cachorro Quente'
console.log(Animais.MacacoPrego.toString()); // 'Macaco Prego'

var Comidas = new types.Enum(
  {CuscuzComLeite: [0, 'Cuscuz com leite', {gostoso: true, preco: 0.50}]},
  {PaoPizza: [1, 'Pão Pizza', {gostoso: true, preco: 4.50}]},
  {FileDeGato: [2, 'Filé de gato', {gostoso: false, preco: 3.00}]}
);

console.log(+Comidas.CuscuzComLeite); // 0
console.log(+Comidas.PaoPizza); // 1
console.log(+Comidas.FileDeGato); // 2

console.log(Comidas.CuscuzComLeite.gostoso); // true
console.log(Comidas.PaoPizza.gostoso); // true
console.log(Comidas.FileDeGato.gostoso); // false

console.log(Comidas.CuscuzComLeite.preco); // 0.50
console.log(Comidas.PaoPizza.preco); // 4.50
console.log(Comidas.FileDeGato.preco); // 3.00