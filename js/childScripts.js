const lesson_quiz = [{
	lesson :"introduction-to-html",
	lesson_url:"https://training-place.net/adaptivelearning/lessons/introduction-to-html/",
	lesson_time : 10,
	quiz_url : "https://training-place.net/adaptivelearning/quizzes/html-quizz/"
},
{
	lesson :"introduction-and-basics-of-css",
	lesson_time : 10,
	lesson_url : "https://training-place.net/adaptivelearning/lessons/introduction-and-basics-of-css/",
	quiz_url : "https://training-place.net/adaptivelearning/quizzes/css-quiz/"
}]

var userData = null;
var quiz_canceled = false;
var focused_url = null;
var switched_focus_freq = 0;
var time_elapsed = 0;
const pathname = window.location.pathname // to get the fullPathname
const url = window.location.href
const page = pathname.split("/") // Split the pathname 



// window.alert(user_auth )

window.addEventListener("focus", () => {
	if(page[2] === "lessons") { // Check if we are in the lessons section
		if(pathname === focused_url) { // Check if we are in the same lesson ==>if its not the same lesson we reset
		 	if(switched_focus_freq < 2) {
				window.alert("Concentre toi sur le cours !!!");
				switched_focus_freq++;
			} else {
				const lessonPath = window.location.pathname // get the lesson url to come back to it if needed
				for(var i= 0; i < lesson_quiz.length; i++){ 
     				if(page[3] === lesson_quiz[i].lesson) { 	
						const quiz_url = lesson_quiz[i].quiz_url 
						window.location=quiz_url; 
						switched_focus_freq++;
					}	
				}
			} 
		}else {
			if(focused_url === null){ // the first time he switches the focus
				window.alert("Concentre toi sur le cours !!!");
				switched_focus_freq = 1;
			}else {
				switched_focus_freq = 0;
			}
			focused_url = pathname;
		}
	}
  console.log(
    "Tab is in focus",
    new Date().getMinutes(),
    "min:",
    new Date().getSeconds(),
    "s"
  );
	
// 	addFocusBehaviourToDatabase("focus")
});

window.addEventListener("load", () => {
		if(page[2]==="lessons" && quiz_canceled===true ) {
			window.alert("your quiz was canceled !!!")
			quiz_canceled = false
		}
});

window.addEventListener("load", () => {
		if(page[2]==="quizzes") {
			window.alert("Don't swith tabs or windows or the test will be cancelled !!!")
		}
});

window.addEventListener("blur", () => {	
	quiz_canceled = true;
	if(page[2]==="quizzes") {
		for(var i= 0; i < lesson_quiz.length; i++){ 
			if(url === lesson_quiz[i].quiz_url) {
				
				const lesson_url = lesson_quiz[i].lesson_url
				window.location=lesson_url; 
			}
		}
	}
	
	
  console.log(
    "Tab is Blurred",
    new Date().getMinutes(),
    "min:",
    new Date().getSeconds(),
    "s"
  );
	
// 	addFocusBehaviourToDatabase("blur")

});


const countdown_before_quiz = () => {
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

async function addFocusBehaviourToDatabase(type) {
// 	let user = await getCurrentUser()
	console.log(userData)
	if(userData !== null) {
		let _data = {
  			type: type,
  			userId : ""+userData.id
		}
		console.log("here !!!")
	const response = await fetch('http://localhost:5000/focus/addNewFocusBehaviour', {
  			method: "POST",
  			body: JSON.stringify(_data),
 			 headers: {"Content-type": "application/json; charset=UTF-8"}
		})
	
	const json = await response.json()
	
	console.log(json)
	}
}

async function addMouseBehaviourToDatabase(data) {
// 	let user = await getCurrentUser()
	console.log(userData)
	if(userData !== null) {
		let _data = {
  			direction : data.direction,
  			action : data.action,
			buttonClicked : data.buttonClicked,
  			type: data.type,
  			userId : ""+userData.id
		}
	const response = await fetch('http://localhost:5000/mouse/addNewMouseBehaviour', {
  			method: "POST",
  			body: JSON.stringify(_data),
 			 headers: {"Content-type": "application/json; charset=UTF-8"}
		})
	
	const json = await response.json()
	
	console.log(json)
	}
}

window.addEventListener("load", () => {
		const objBody = document.body
		objBody.addEventListener("click" , (e) => {
			window.alert("left mouse clicked")
			
		})
	objBody.addEventListener("contextmenu" , (e) => {
			window.alert("right mouse clicked")
			
		})
// 	objBody.addEventListener("mousedown" , (e) => {
// 		let data = {type : "button" , action : "click"}
// 		if(e.button === 0) {
// 			data.buttonClicked = "left click"
// 		} else if( e.button === 2) {
// 			data.buttonClicked = "right click"
// 		} else if (e.button === 1) {
// 			data.buttonClicked = "middle click"
// 		} else {
// 			data.buttonClicked = "extra button"
// 		}

// // 		addMouseBehaviourToDatabase(data)
// 			window.alert(e.button === 0 ? "Left Click" : e.button === 2 ? "Right Click" : e.button === 1 ? "Middle Click" : "Extra Button")
			
// 		})
	
	objBody.addEventListener('wheel', (e) => {
		const direction = detectMouseWheelDirection(e)
		const data = {direction : direction,
  					  action : "rotation",
  					  type: "wheel",}
		
// 		addMouseBehaviourToDatabase(data)
		window.alert("Wheeled " + direction)
	});
});


function detectMouseWheelDirection( e )
{
    var delta = null,
        direction = false
    if ( !e ) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if ( e.wheelDelta ) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if ( e.detail ) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    if ( delta !== null ) {
        direction = delta > 0 ? 'up' : 'down';
    }

    return direction;
}

async function testToken() {
  var token = localStorage.getItem('token');
// 	console.log(token)
	
	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', "Bearer " + token);
	
	const response = await fetch('https://training-place.net/adaptivelearning/wp-json/ldlms/v1/sfwd-courses', {
  		method: 'GET',
  		headers: myHeaders,
	})
	
	const json = await response.json()
	
	console.log(json)
}

async function getCurrentUser() {
	var token = localStorage.getItem('token');
	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', "Bearer " + token);
	
	const response = await fetch('https://training-place.net/adaptivelearning/wp-json/wp/v2/users/me', {
  		method: 'GET',
  		headers: myHeaders,
	})
	
	userData = await response.json()
	
	return userData
}

getCurrentUser()

countdown_before_quiz()

