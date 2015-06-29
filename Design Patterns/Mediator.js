/*The Observer pattern: Defines a one-to-many dependency between objects so that when one object changes state, 
all its dependents are notified and updated automatically.

The Mediator pattern: Define an object that encapsulates how a set of objects interact. Mediator promotes loose 
coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.

Source: dofactory

Example:

The observer pattern: Class A, can have zero or more observers of type O registered with it.
 When something in A is changed it notifies all of the observers.

The mediator pattern: You have some number of instances of class X (or maybe even several different 
types:X, Y & Z), and they wish to communicate with each other (but you don't want each to have explicit
 references to each other), so you create a mediator class M. Each instance of X has a reference to a
  shared instance of M, through which it can communicate with the other instances of X (or X, Y and Z).*/



//Exemplo abaixo retirado de: http://www.dofactory.com/javascript/mediator-design-pattern

//Note que ao contrario do observer pattern os subscribers(participantes) possuem uma referencia de publisher(chatroom)
//setada no momento que chat room registra os participantes. Essa referencia eh o intermediador.

var Participant = function(name) {
	this.name = name;
	this.chatroom = null;
};
 
Participant.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};
 
var Chatroom = function() {
    var participants = {};
 
    return {
 
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
 
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in participants) {   
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
 
// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();
 
function run() {
    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");
 
    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);
 
    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
 
    log.show();
}