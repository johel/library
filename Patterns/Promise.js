// source: Eloquent Javascript 2nd edition -p.335

function get ( url ) {
	return new Promise (function (succeed , fail) {
		var req = new XMLHttpRequest () ;
		req.open ("GET", url, true );
		req.addEventListener ("load", function () {
			if (req.status < 400)
				succeed ( req . responseText ) ;		
			else
				fail (new Error("Request failed: " + req . statusText ));
			});
		req . addEventListener ("error" , function () {
			fail (new Error ("Network error") );
		});
		req . send (null) ;
	});
}

// exemplo:

get ("example / data.txt") . then ( function ( text ) {
	console . log (" data . txt : " + text );
},function ( error ) {
	console . log (" Failed to fetch data . txt : " + error ) ;
});

//other example
//
//We want to get the name of the mother of the spouse of example/bert.json.
// And if something goes wrong, we want to remove the loading text and
// show an error message instead. Here is how that might be done with
// promises:
< script >
	function showMessage ( msg ) {
		var elt = document . createElement (" div ") ;
		elt . textContent = msg ;
		return document . body . appendChild ( elt );
		}

		var loading = showMessage (" Loading ...") ;
		getJSON ("example / bert.json") . then (function (bert) {
			return getJSON ( bert . spouse ) ;
		}).then (function (spouse) {
			return getJSON ( spouse . mother );
		}).then (function (mother) {
			showMessage (" The name is " + mother . name );
		}).catch (function (error) {
			showMessage (String (error) ) ;
		}).then (function () {
			document.body.removeChild(loading);
		}) ;
	
</ script >


// exemplo utilizado no angularJs
   angular.module('todo').factory('Todo', function TodoFactory ($http) {
		'use strict';
		var service = {
		insert: function (todo) {
				return $http.post('/api/todo', JSON.stringify(todo)); //Isso eh uma promise!!!
			}
		}
		return service;
	});


	$scope.addTodo = function (todo) {
		$scope.saving = true;
		todo.finished = false;
		Todo.insert(todo)
		.then(function success() {
			var newTodoCopy = JSON.parse(JSON.stringify(todo)); //maneira de fazer deep copy de objetos
			$scope.todos.push(newTodoCopy);
			$scope.todo.content = "";
			$scope.todo.tag="";
		}, function error() {
			alert("deu errado!");
		})
		.finally(function () {
			$scope.saving = false;
		});

	};

