
// collection object
var cocktails = {
	margarita: ["tequila", "lime", "triple sec", "salt"],
	martini: ["gin", "vermouth", "olive"],
	gimlet: ["gin", "lime"],
	old_fashioned: ["bourbon", "vermouth", "orange slice", "cherry"],
	shirley_temple: ["7up", "grenadine", "cherry"]
	tom_collins: ["lime", "gin", "sour mix", "soda"]
};


// helper function
function has(item, ingredient) {
	return item.indexOf(ingredient) >= 0;
}


// Version-A: Basic pick function
function pickA(collection) { 
	// collection is only essential parameter
	// second argument could be: callback function or list of properties
	// if second argument is NOT provided, function will return an empty object
	var result = {};
	if (arguments.length === 1) {
		return result;
	} 
	if (typeof arguments[1] === "function") { // example: pick(cocktails, hasLime)
		for (var prop in collection) {
			if (arguments[1](collection[prop], arguments[2])) {
				result[prop] = collection[prop];
			}
		}
	}
	else {
		for (var i = 1; i < arguments.length; i++) {
			if (collection[arguments[i]]) {
				result[arguments[i]] = collection[arguments[i]];
			}
		}
	}
	return result;
}

pickA(cocktails, has, "gin"); // should return object with martini and gimlet
pickA(cocktails, has, "cherry"); // should return object with old_fashioned and shirley_temple


// Version-B: pick function that returns object containing ANY cocktails containing ANY ingredients entered as parameters
function pickB(collection) { 
	var result = {};
	if (arguments.length === 1) {
		return result;
	} 
	if (typeof arguments[1] === "function") { // example: pick(cocktails, hasLime)
		for (var prop in collection) {
			for (var i = 2; i < arguments.length; i++) {
				if (arguments[1](collection[prop], arguments[i])) {
					result[prop] = collection[prop];
				}
			}
		}
	}
	else { // example: pick(cocktails, "margarita", "greyhound", "gimlet"); // returns obj with "margarita" and "gimlet"
		for (var i = 1; i < arguments.length; i++) {
			if (collection[arguments[i]]) {
				result[arguments[i]] = collection[arguments[i]];
			}
		}
	}
	return result;
}

pickB(cocktails, has, "gin", "tequila", "salt"); // should return object with "margarita", "martini", "gimlet"
pickB(cocktails, has, "cherry", "salt"); // should return object with "margarita", "old_fashioned", "shirley_temple"



// Version-C: pick function that returns object containing ONLY cocktail(s) containing ALL ingredients entered as parameters
function pickC(collection) { 
	var result = {};
	if (arguments.length === 1) {
		return result;
	} 
	if (typeof arguments[1] === "function") { // example: pick(cocktails, hasLime)
		for (var prop in collection) {
			var hasAll = true;
			for (var i = 2; i < arguments.length; i++) {
				if (!(arguments[1](collection[prop], arguments[i]))) {
					hasAll = false;
				}
			}
			if (hasAll) {
				result[prop] = collection[prop];
			}
		}
	}
	else { // example: pick(cocktails, "margarita", "greyhound", "gimlet"); // returns obj with "margarita" and "gimlet"
		for (var i = 1; i < arguments.length; i++) {
			if (collection[arguments[i]]) {
				result[arguments[i]] = collection[arguments[i]];
			}
		}
	}
	return result;
}

pickC(cocktails, has, "gin", "vermouth"); // should return object with "martini" only
pickC(cocktails, has, "gin", "lime"); // should return object with "gimlet" and "tom collins"



