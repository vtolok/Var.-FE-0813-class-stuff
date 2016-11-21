// Logwindow HANDLER


var EventHandler = (function (){
	var submitButton = document.querySelector('.form_submit');
		showButton = document.querySelector('.show_local_storage');
		clearButton = document.querySelector('.clear_local_storage');
		
		submitButton.addEventListener('click', function (e){
			loginHandler();
		});

		showButton.addEventListener('click', function(e){
			outputFromLocalStorage();
		});

		clearButton.addEventListener('click', function(e){
			clearStorages();
		});

})();

var loginHandler = function(){
	var loginData=null,
		username=null,
		password=null,
		targetElem = null;

	targetElem=document.querySelector('.user_login_form');
	username=targetElem.elements["username"].value;
	password=targetElem.elements["password"].value;
	inputCheck(username, password);
	inputToLocalStorage(username, password);
	// inputToSessionStorage(username, password);
};


	function inputCheck (username, password){
		console.log("Username: "+username+"; "+"Password: "+password);
	};

	function	inputToLocalStorage(username, password){
		localStorage.setItem('user', username);
		localStorage.setItem('pwd', password);	
	};

var outputFromLocalStorage = function(){
	var anchor = document.querySelector('.pagewrapper');
		outputBox = document.createElement('div');
		user= localStorage.user,
		pwd= localStorage.pwd;

	outputBox.innerHTML=("LOCAL STORAGE: Username: "+user+"; "+"Password: "+pwd);
	outputBox.classList.add('container');
	anchor.appendChild(outputBox);

};

function	clearStorages(){
	localStorage.clear();
};