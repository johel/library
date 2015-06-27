// Tentativa de reproduzir listeners e callers
//Observer pattern ou Publisher Subscriber;

var publisher = {
	subscribers: [],
	emit: function(eventName){
		for(var i=0;i<this.subscribers.length; i+=1){
			this.subscribers[i].doSomethingOnEvent(eventName);
		}
	},
	addSubscriber: function(subscriber){
		this.subscribers.push(subscriber);
	}
}

var subscriber = {
	events: [],
	addListener: function(eventName, callBack){
		this.events.push({eventName:eventName, eventAction:callBack})
	},
	doSomethingOnEvent: function (eventName) {
		var eventsToBeCalled = this.events.filter(function(event){
			return event.eventName === eventName;
		});
		eventsToBeCalled.forEach(function(item){
			item.eventAction();
		})
	}
}

publisher.addSubscriber(subscriber);
subscriber.addListener('hello', function () { console.log("First I introduce myself"); });
subscriber.addListener('hello', function () { console.log("then I ask for another drink");});
publisher.emit('hello');

//--------------------------------
// Exemplo de listeners do livro The Principles of Object Oriented Javascript

function EventTarget(){
}

EventTarget.prototype = {
	constructor: EventTarget,

	addListener: function(type, listener){
		// create an array if it doesn't exist
		if (!this.hasOwnProperty("_listeners")) {
			this._listeners = [];
		}
		if (typeof this._listeners[type] == "undefined"){
			this._listeners[type] = [];
		}
		this._listeners[type].push(listener);
	},

	fire: function(event){
		if (!event.target){
			event.target = this;
		}
		if (!event.type){ // falsy
			throw new Error("Event object missing 'type' property.");
		}
		if (this._listeners && this._listeners[event.type] instanceof Array){
			var listeners = this._listeners[event.type];
			for (var i=0, len=listeners.length; i < len; i++){
				listeners[i].call(this, event);
			}
		}
	},

	removeListener: function(type, listener){
		if (this._listeners && this._listeners[type] instanceof Array){
			var listeners = this._listeners[type];
			for (var i=0, len=listeners.length; i < len; i++){
				if (listeners[i] === listener){
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}
}

// Exemplo

var target = new EventTarget();

target.addListener("message", function(event) {
	console.log("Message is " + event.data);
})
target.fire({
	type: "message",
	data: "Hello world!"
});


//---------------------------------------------------------------------------------------------
// EXEMPLO DO LIVRO - LEARNING JAVASCRIPT DESIGN PATTERNS


var pubsub = {};
(function(q) {
		var topics = {},
	subUid = -1;
	// Publish or broadcast events of interest
	// with a specific topic name and arguments
	// such as the data to pass along
	q.publish = function( topic, args ) {
		if ( !topics[topic] ) {
		return false;
		}
		var subscribers = topics[topic],
		len = subscribers ? subscribers.length : 0;
		while (len--) {
		subscribers[len].func(topic, args);
		}
		return this;
	};
	// Subscribe to events of interest
	// with a specific topic name and a
	// callback function, to be executed
	// when the topic/event is observed
	q.subscribe = function( topic, func ) {
		if (!topics[topic]) {
			topics[topic] = [];
			}
		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};
	// Unsubscribe from a specific
	// topic, based on a tokenized reference
	// to the subscription
	q.unsubscribe = function( token ) {
		for ( var m in topics ) {
			if ( topics[m] ) {
				for (var i = 0, j = topics[m].length; i < j; i++) {
					if (topics[m][i].token === token) {
					topics[m].splice(i, 1);
					return token;
					}
				}
			}
		}
		return this;
	};
}( pubsub ));


//Exemplo 1 de uso
var testHandler = function (topics, data) {
	console.log(topics + ": " + data);
};
// Subscribers basically "subscribe" (or listen)
// And once they've been "notified" their callback functions are invoked
var testSubscription = pubsub.subscribe('example1', testHandler);
// Publishers are in charge of "publishing" notifications about events
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', ['test', 'a', 'b', 'c']);
pubsub.publish('example1', [{
	'color': 'blue'
	}, {
	'text': 'hello'
}]);
// Unsubscribe if you no longer wish to be notified
pubsub.unsubscribe(testSubscription);
// This will fail
pubsub.publish('example1', 'hello again! (this will fail)');

//Exemplo 2 de uso

var grid = {
	addEntry: function (data) {
		if (typeof data !== 'undefined') {
			console.log('Entry:'
			+ data.title
			+ ' Changenet / %'
			+ data.changenet
			+ '/' + data.percentage + ' % added');
		}
	},
	updateCounter: function (timestamp) {
		console.log('grid last updated at: ' + timestamp);
	}
};

var gridUpdate = function (topics, data) {
	grid.addEntry(data);
	grid.updateCounter(data.timestamp);
}

var gridSubscription = PubSub.subscribe('dataUpdated', gridUpdate);

PubSub.publish('dataUpdated', {
title: "Microsoft shares",
changenet: 4,
percentage: 33,
timestamp: '17:34:12'
});

PubSub.publish('dataUpdated', {
title: "Dell shares",
changenet: 10,
percentage: 20,
timestamp: '17:35:16'
});

//-----------------------------

//Imlementaçao base para JQuery

/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

//Exemplo de uso:
//https://jsfiddle.net/johel/3nbpxup2/
//https://jsfiddle.net/johel/vzu87h3s/2/


