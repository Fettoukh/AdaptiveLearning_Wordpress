const countdown_before_quiz = (page , time_elapsed , lesson_quiz) => {
	if(page[2] === "lessons") { // Check if we are in the lessons section
		myVar = setInterval(function(){ 
			time_elapsed++ ;
			console.log(time_elapsed);
			const lessonPath = window.location.pathname // get the lesson url to come back to it if needed
			for(var i= 0; i < lesson_quiz.length; i++){ 
     			if(page[3] === lesson_quiz[i].lesson) { // trying to figure out which lesson we are in to get the right quiz		
					const quiz_url = lesson_quiz[i].quiz_url 
					if(time_elapsed >lesson_quiz[i].lesson_time ){
						window.setTimeout(function(){ 
						window.location=quiz_url; 
// 						time_elapsed = 0;
						}, 3000);
					}
				}
			}
		}, 1000);
	}
}

module.exports = {countdown_before_quiz}