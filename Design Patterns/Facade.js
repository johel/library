/*
The Façade pattern provides an interface which shields clients from complex functionality
 in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful
  and extremely useful. It is often present in systems that are built around a multi-layer architecture.

The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem
 or toolkit easy to use for the client.
*/

/*       Facade 
-- In sample code: Mortgage
knows which subsystems are responsible for a request
delegates client requests to appropriate subsystem objects

Sub Systems -- In sample code: Bank, Credit, Background
implements and performs specialized subsystem functionality
have no knowledge of or reference to the facade
*/

var Mortgage = function(name) {
    this.name = name;
}
 
Mortgage.prototype = {
 
    applyFor: function(amount) {
        // access multiple subsystems...
        var result = "approved";
        if (!new Bank().verify(this.name, amount)) {
            result = "denied";
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }
        return this.name + " has been " + result +
               " for a " + amount + " mortgage";
    }
}
 
var Bank = function() {
    this.verify = function(name, amount) {
        // complex logic ...
        return true;
    }
}
 
var Credit = function() {
    this.get = function(name) {
        // complex logic ...
        return true;
    }
}
 
var Background = function() {
    this.check = function(name) {
        // complex logic ...
        return true;
    }
}
 
function run() {
    var mortgage = new Mortgage("Joan Templeton");
    var result = mortgage.applyFor("$100,000");
 
    alert(result);
}
