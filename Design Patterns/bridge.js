//---------------Source Code: Pro Javascript Design Patterns----------------------
//In the world of API implementations, bridges are incredibly useful. In fact, they’re probably
// one of the most underused patterns. Of all patterns, this is the simplest to start putting into
// practice immediately. If you’re building a JavaScript API, this pattern can be used to ensure
// that the dependent classes and objects are coupled to it loosely. As defined by the Gang of
// Four, a bridge should “decouple an abstraction from its implementation so that the two can
// vary independently.” Bridges are very beneficial when it comes to event-driven programming,
// which is a style that is used often in JavaScript.
//If you’re just entering the world of JavaScript API development, you’re most likely going to
// be creating a lot of getters, setters, requesters, and other action-based methods. Whether
// they’re used to create a web service API or simple accessor and mutator methods, bridges
// will help you keep your API code clean come implementation time.


//Complicado de realizar testes.
addEvent(element, 'click', getBeerById);
function getBeerById(e) {
  var id = this.id;
  asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
    // Callback response.
    console.log('Requested Beer: ' + resp.responseText);
  });
}

//Com a separacao, o nome do metodo realmente reflete sua intencao e eh facil de testar.
function getBeerById(id, callback) {
  // Make request for beer by ID, then return the beer data.
  asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
    // callback response
    callback(resp.responseText);
  });
}

//o resultado eh a separacao do evento de interface do usuario, da real implementacao
//(Com sabe nesse principio que APIs sao feitas)
addEvent(element, 'click', getBeerByIdBridge);
function getBeerByIdBridge (e) {
  getBeerById(this.id, function(beer) {
    console.log('Requested Beer: '+beer);
  });
}


//-------------------- Source:http://www.dofactory.com/javascript/bridge-design-pattern   ------------------------------------
//The Bridge pattern allows two components, a client and a service, to work together with each component having its own interface.
// Bridge is a high-level architectural pattern and its main goal is to write better code through two levels of abstraction.
// It facilitates very loose coupling of objects. It is sometimes referred to as a double Adapter pattern.
// An example of the Bridge pattern is an application (the client) and a database driver (the service). 
// The application writes to a well-defined database API, for example ODBC, but behind this API you will find 
// that each driver's implementation is totally different for each database vendor (SQL Server, MySQL, Oracle, etc.).

// The Bridge pattern is a great pattern for driver development but it is rarely seen in JavaScript.


// input devices
 
var Gestures = function (output) {
    this.output = output;
 
    this.tap = function () { this.output.click(); }
    this.swipe = function () { this.output.move(); }
    this.pan = function () { this.output.drag(); }
    this.pinch = function () { this.output.zoom(); }
};
 
var Mouse = function (output) {
    this.output = output;
 
    this.click = function () { this.output.click(); }
    this.move = function () { this.output.move(); }
    this.down = function () { this.output.drag(); }
    this.wheel = function () { this.output.zoom(); }
};
 
// output devices
 
var Screen = function () {
    this.click = function () { log.add("Screen select"); }
    this.move = function () { log.add("Screen move"); }
    this.drag = function () { log.add("Screen drag"); }
    this.zoom = function () { log.add("Screen zoom in"); }
};
 
var Audio = function () {
    this.click = function () { log.add("Sound oink"); }
    this.move = function () { log.add("Sound waves"); }
    this.drag = function () { log.add("Sound screetch"); }
    this.zoom = function () { log.add("Sound volume up"); }
};
 
// logging helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
 
    var screen = new Screen();
    var audio = new Audio();
 
    var hand = new Gestures(screen);
    var mouse = new Mouse(audio);
 
    hand.tap();
    hand.swipe();
    hand.pinch();
 
    mouse.click();
    mouse.move();
    mouse.wheel();
 
    log.show();
}