var arrayOfCountries = ["Argentina","Angola","Brazil","Belgium","Canada","Mexico","Madagascar","Niger","Australia", "Tunisia","Spain","Oman","Libya","Jamaica","Ghana" ,"Cuba","Peru","Croatia","Korea-North","Estonia"]

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
function generateAnswers(array,n){
	var copyArray = array;
	var newArray = [array[n]];
	var num = questionGenerator();
	function innerFunction(array, i){
		i = i || 0;
		console.log(i, array[num], num, n)
		if(i === 5){
			return newArray;
		}
		if (num ==! n){
			newArray.push(array[num])
			array.splice(num, 1)
			return innerFunction(array, i + 1)
		}
		num = questionGenerator();
		return innerFunction(array, i)
	}
	return innerFunction(copyArray).sort()
/*	for(var i= 0; i < 6; i++){
		var num = questionGenerator()
		if (num ==! n){
			newArray.push(array[i])
		}else {
			i--
		}
	}
	return newArray.sort();*/
}
function displayAnswers(array){
	var i = 0;
	while(i < array.length){
		console.log(array)
		document.getElementsByClassName(i + 1)[0].innerHTML = array[i];
		i++
	}
}

$(document).ready(function(){
	var questionNumber = questionGenerator()
	var src = questions[questionNumber].url() 
	$('#question img').attr('src',src)
	displayAnswers(generateAnswers(arrayOfCountries,questionNumber))
	var count = 0;
	$('button').on('click', function(){
		nextQuestion(questionNumber)
		questionNumber = questionGenerator()
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,questionNumber))
		var id = $(':checked')[0].id
	console.log(document.getElementsByClassName(id)[0].innerText)
	/*if(document.getElementsByClassName(id)[0].innerText === answer){
		count++
	}*/
})	
})
