var arrayOfCountries = ["Argentina","Angola","Brazil","Belgium","Canada","Mexico","Madagascar","Niger","Australia", "Tunisia","Spain","Oman","Libya","Jamaica","Ghana" ,"Cuba","Peru","Croatia","North-Korea","Estonia"]

function objCreator(array) {
	var obj = {};
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

$(document).ready(function(){
	var questionNumber = questionGenerator()
	var src = questions[questionNumber].url() 
	$('#question img').attr('src',src)
	var count = 0;
	$('button').on('click', function(){
		nextQuestion(questionNumber)
		questionNumber = questionGenerator()
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
	var id = $(':checked')[0].id
	console.log(document.getElementsByClassName(id)[0].innerText)

	/*if(document.getElementsByClassName(id)[0].innerText === answer){
		count++
	}*/

})	
})
