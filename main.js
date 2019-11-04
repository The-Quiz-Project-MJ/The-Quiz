var arrayOfCountries = ["Argentina","Angola","Brazil","Belgium","Canada","Mexico","Madagascar","Niger","Australia"]

function objCreator(array) {
	var arrayOfObjects = [];
	for (var i = 0; i < array.length; i++) {
		arrayOfObjects.push({
			name : array[i],
			url : function() {
			return "https://www.countries-ofthe-world.com/flags-normal/flag-of-" + this.name + ".png"
		}
		});
	}
	return arrayOfObjects;
}

var questions = objCreator(arrayOfCountries);
function questionGenerator(){
	return Math.floor(Math.random() * questions.length)	
}


function nextQuestion(questionNumber){
	questions.splice(questionNumber, 1)
}
function generateAnswers(arr, array){

}

$(document).ready(function(){
	var questionNumber = questionGenerator()
	console.log(questionNumber, questions[questionNumber].url())
	var count = 0;
	$('button').on('click', function(){
	var id = $(':checked')[0].id
	questionNumber = questionGenerator()
	nextQuestion(questionNumber)
	questionGenerator()
	console.log(questionNumber, questions[questionNumber].url())
	console.log(document.getElementsByClassName(id)[0].innerText)

	/*if(document.getElementsByClassName(id)[0].innerText === answer){
		count++
	}*/
})	
})
