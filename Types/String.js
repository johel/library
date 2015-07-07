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