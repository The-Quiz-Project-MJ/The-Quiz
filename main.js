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

	//function that generate a random numbr between 0 and the length of the initial array;
	function randomNumberGenerator(array){
		return Math.floor(Math.random() * array.length)	
	}

	//function that remove a question from the question list
	function nextQuestion(questionNumber){
		questions.splice(questionNumber, 1)
	}

	//function that generate 5 random answers add the right answer to them and sort them alphabeticlly
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
	
	//function that display the answers to the user
	function displayAnswers(array){
		var i = 0;
		while(i < array.length){
			document.getElementsByClassName(i + 1)[0].innerHTML = array[i];
			i++
		}
	}

	//function that will generate the final msg to the user
	function outputMsg(res){
		var percentage = Math.round((result * 100)/maxQuestion);
		var msg = ""
		if(percentage < 10){
			return "You're a flag 'Ignorant' " + userName + ", you only got " + percentage + "%"
		}else if(percentage < 30){
			return "You really don't know your flags "  + userName + ", you only got " + percentage + "%"
		}else if(percentage < 50){
			return "Meh!!, " + userName + " you only got " + percentage + "%"
		}else if(percentage < 60){
			return "You're OK " + userName + ", you got " + percentage + "%"
		}else if(percentage < 80){
			return "You're Fine " + userName + ", you got " + percentage + "%"
		}else if(percentage < 100){
			return "You're good " + userName + ", you got " + percentage + "%"
		}
		return "You're a genius " + userName + ", you got " + percentage + "%"
	}

	var questions = objCreator(arrayOfCountries);//list of the questions
	var questionNumber = randomNumberGenerator(questions);//the index of the question
	var limit = 0;//number of the current question
	var result = 0;
	var id = 1;
	var userName = "";
	var src = "";
	var maxQuestion = "";

	//this will select the answer that the user click on
	$('.clicked').on('click', function(){
		var id = '#' + this.getAttribute("id")[3]
		$(id)[0].checked = true
	})

	//this function will start the game by displaying the question and answer and hiding the introduction questions
	$('#start').on('click', function(){
		userName = $('#userName').val();
		maxQuestion = $('#dropdown').val();
		startGame();
		questionNumber = randomNumberGenerator(questions)
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	})

	//this function will display the next question and answers to the user
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
		
		$(':checked')[1].checked = false;
		nextQuestion(questionNumber)
		questionNumber = randomNumberGenerator(questions)
		$('span').html('Q' + (limit + 1) + ' :')
		src = questions[questionNumber].url() 
		$('#question img').attr('src',src)
		displayAnswers(generateAnswers(arrayOfCountries,arrayOfCountries.indexOf(questions[questionNumber].name)))
	});

	//this function will play the game again
	$('#playAgain').on('click',function(){
		playAgain()
	})

	//this will display the final score and msg
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