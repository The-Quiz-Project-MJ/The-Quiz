var arrayOfCountries = ["Argentina","Angola","Brazil","Belgium","Canada","Mexico","Madagascar","Niger","Australia",""]

function objCreator(array) {
	var obj = {};
	var arrayOfObjects = [];
	for (var i = 0; i < array.length; i++) {
		obj.name = array[i];
		obj.url = function() {
			return "https://www.countries-ofthe-world.com/flags-normal/flag-of-" + this.name + ".png"
		}

		arrayOfObjects.push(obj);
	}
	return arrayOfObjects;
}

