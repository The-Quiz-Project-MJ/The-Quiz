var arrayOfCountries = ["Argentina", "Qatar", "Lebanon", "Austria","Malaysia", "Egypt", "Angola", "Jordan", "Syria", "Brazil", "Saudi-Arabia", "Malaysia", "Denmark", "Iran", "Cambodia", "Kazakhstan", "India", "China", "Bahrain", "Palestine", "Bhutan", "Afghanistan", "Poland", "Belgium", "Canada", "Mexico", "Madagascar", "Niger", "Australia", "Tunisia", "Spain", "Bangladesh", "Oman", "Libya", "Jamaica", "Ghana", "Cuba", "Peru", "Croatia", "Korea-North", "Estonia"]

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

function randomNumberGenerator(array){
	return Math.floor(Math.random() * array.length)	
}

function nextQuestion(questionNumber){
	questions.splice(questionNumber, 1)
}

function generateAnswers(array,n){
	var copyArray = array.map(function(elm){
		return elm
	});
	var num = randomNumberGenerator(copyArray)
	var newArray = [array[n]];
	for(var i= 0; i < 5; i++){
		num = randomNumberGenerator(copyArray)
		if (copyArray[num] !== array[n]){
			newArray.push(copyArray[num])
			copyArray.splice(num, 1)
		}else {
			i--
		}
	}
	return newArray.sort();
}

function hide() {
	$('.question').hide();
	$('#answers').hide();
	//$('img').hide();
}

function outputMesaage(result) {
	var percentage = result*5;
	var message = "";
	if(percentage < 20) {
		return "You Suck You only made "+ percentage + " %"
	} else if(percentage < 20) {
		return "You Suck You only made "+ percentage + " %"
	} else if(percentage < 40) {
		return "You Suck You only made "+ percentage + " %"
	} else if(percentage < 60) {
		return "You Suck You only made "+ percentage + " %"
	} else if(percentage < 20) {
		return "You Suck You only made "+ percentage + " %"
	} else if(percentage < 20) {
		return "You Suck You only made "+ percentage + " %"
	} else {
		return "You "
	}
}

function displayAnswers(array){
	var i = 0;
	while(i < array.length){
		document.getElementsByClassName(i + 1)[0].innerHTML = array[i];
		i++
	}
}

var questionNumber = randomNumberGenerator(questions)
var a = 0;
var result = 0;
var id = 1;
var src = "";
var percentage = "";
 	
$('#start').on('click', function(){
	$('.question').show()
	$('#answers').show()
	$('img').show();
	$('#start').hide()
	questionNumber = randomNumberGenerator(questions)
	src = questions[questionNumber].url() 
	$('#question img').attr('src',src)
	displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
})

$('#next').on('click', function(){
	id = $(':checked')[0].id
	if(document.getElementsByClassName(id)[0].innerText === questions[questionNumber].name){
		++result
	}
	if(a === 4){
		//console.log('aaaaaaaaaaaaaa')
		//alert('Your final score is : ' + result)
		percentage = result*25  
		
		var newStr = 'Your result is : ' + percentage + " %"
		//alert('Your score ' + newStr)
		//$('section #question').hide()
		$('#answers').hide();
		$('#question').html(newStr)
	     
	}
	++a
	console.log(a, result)
	$(':checked')[0].checked = false;
	nextQuestion(questionNumber)
	questionNumber = randomNumberGenerator(questions)
	src = questions[questionNumber].url() 
	$('#question img').attr('src',src)
	displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
});

$(document).ready(hide())	

var id = 1
	$('.clicked').on('click', function(){
		var id = '#' + this.getAttribute("id")[3]
		$(id)[0].checked = true
	})


	$('#start').on('click', function(){
		$('.question').show()
		$('#answers').show()
		$('img').show()
		$('#start').hide()
		questionNumber = randomNumberGenerator(questions)
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	})



	$('#next').on('click', function(){
		id = $(':checked')[0].id
		if(document.getElementsByClassName(id)[0].innerText === questions[questionNumber].name){
			++result
		}
		if(a === 19){
			console.log('aaaaaaaaaaaaaa')
			alert('Your final score is : ' + result)
		}
		++a
		console.log(a, result)
		$(':checked')[0].checked = false;
		nextQuestion(questionNumber)
		questionNumber = randomNumberGenerator(questions)
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	});

$(document).ready(function(){
	$('.question').hide()
	$('#answers').hide()
	$('img').hide()

})	
