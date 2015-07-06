// The pros of the configuration objects are:
// -No need to remember the parameters and their order
// -You can safely skip optional parameters
// -Easier to read and maintain
// -Easier to add and remove parameters
// The cons of the configuration objects are:
// -You need to remember the names of the parameters
// -Property names cannot be minified

addPerson("Bruce", "Wayne", new Date(), null, null, "batman");

addPerson(conf);
var conf = {
	username: "batman",
	first: "Bruce",
	last: "Wayne"
};
addPerson(conf);