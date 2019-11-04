
$(document).ready(function(){
	var count = 0;
	$('button').on('click', function(){
	var id = $(':checked')[0].id
	console.log(document.getElementsByClassName(id)[0].innerText)
	/*if(document.getElementsByClassName(id)[0].innerText === answer){
		count++
	}*/
	
})	
})
