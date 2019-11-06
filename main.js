function theQuiz(){

	var arrayOfCountries = ["Argentina", "Qatar", "Lebanon", "Austria","Malaysia", "Egypt", "Angola", "Jordan", "Syria", "Brazil", "Saudi-Arabia", "Malaysia", "Denmark", "Vietnam", "Iran", "Cambodia", "Kazakhstan", "India", "China", "Bahrain", "Palestine", "Bhutan", "Afghanistan", "Poland", "Belgium", "Canada", "Mexico", "Madagascar", "Niger", "Australia", "Tunisia", "Spain", "Bangladesh", "Oman", "Nepal", "Libya", "Jamaica", "Ghana", "Cuba", "Peru", "Croatia", "Korea-North", "Estonia"]

	//function that create an array of object containing the img of the questions
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
	
	function displayAnswers(array){
		var i = 0;
		while(i < array.length){
			document.getElementsByClassName(i + 1)[0].innerHTML = array[i];
			i++
		}
	}

	function outputMsg(res){
		var percentage = Math.round((result * 100)/maxQuestion);
		var msg = ""
		if(percentage < 10){
			return "You're a flag 'Ignorant' " + userName + ", you only made " + percentage + "%"
		}else if(percentage < 30){
			return "You really don't know your flags "  + userName + ", you only made " + percentage + "%"
		}else if(percentage < 50){
			return "Meh!!, " + userName + " you only made " + percentage + "%"
		}else if(percentage < 60){
			return "You're OK " + userName + ", you made " + percentage + "%"
		}else if(percentage < 80){
			return "You're Fine " + userName + ", you made " + percentage + "%"
		}else if(percentage < 100){
			return "You're good " + userName + ", you made " + percentage + "%"
		}
		return "You're a genius " + userName + ", you made " + percentage + "%"
	}

	var questions = objCreator(arrayOfCountries);
	var questionNumber = randomNumberGenerator(questions);
	var limit = 0;//number of the current question
	var result = 0;
	var id = 1;
	var userName = "";
	var src = "";
	var maxQuestion = "";


	$('.clicked').on('click', function(){
		var id = '#' + this.getAttribute("id")[3]
		$(id)[0].checked = true
	})

	$('#start').on('click', function(){
		userName = $('#userName').val();
		maxQuestion = $('#dropdown').val();
		startGame();
		questionNumber = randomNumberGenerator(questions)
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	})

	$('#next').on('click', function(){
		if($(':checked')[1] === undefined){
			alert('You need to choose an answer')
		}
		id = $(':checked')[1].id
		if(document.getElementsByClassName(id)[0].innerText === questions[questionNumber].name){
			++result
		}
		if(limit === maxQuestion - 2){
		$('#next').text('Show Result')
		}
		if(limit === maxQuestion - 1){
			finalScore();
			return 1;
		}
		++limit
		console.log(limit, result)
		$(':checked')[1].checked = false;
		nextQuestion(questionNumber)
		questionNumber = randomNumberGenerator(questions)
		$('span').html('Q' + (limit + 1) + ' :')
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	});

	$('#playAgain').on('click',function(){
		playAgain()
	})

	function finalScore(){
		hide();
		$('#question').append('<p id="result">' + outputMsg(result) + '</p>')
		$('.next').show();
		$('#playAgain').show();
	}
	
	function hide(){
		$('.question').hide()
		$('.answers').hide()
		$('.next').hide()
		$('#next').hide()
		$('img').hide()
		$('#playAgain').hide()
	}
	
	function playAgain(){
		$('p').hide()
		hide()
		$('#btn').show()
		$('.userName').show()
		$('#numbers').show()
		$('#next').text('Next')
		result = 0;
		limit = 0;
		questions = objCreator(arrayOfCountries);
	}

	function startGame(){
		$('.userName').hide()
		$('#name').hide()
		$('#numbers').hide()
		$('#btn').hide()
		$('.question').show()
		$('.next').show()
		$('#next').show()
		$('.answers').show()
		$('img').show()
	}
	
	$(document).ready(hide())
}

theQuiz();