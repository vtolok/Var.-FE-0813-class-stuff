// login window
var loginWindow = (function (){

	function Constructor (root){
		this.rootElem = document.querySelector(root);

		this.init();
	};

	Constructor.prototype.init = function(){
		this.render();
		this.handleInput();
	};

	Constructor.prototype.render = function (){
		
		var loginWindowWrapper = document.createElement('div'),
			loginWindowCore= document.createElement('div'),
			userLoginForm= document.createElement('form'),
			inputsTable=[],
			i=0;

			userLoginForm.classList.add('user_login_form');
			loginWindowCore.classList.add('logWindow_core');
			loginWindowWrapper.classList.add('logWindow_wrapper');

			userLoginForm.setAttribute("method", "post");
			userLoginForm.setAttribute("enctype", "text/plain");
			

			for (i; i<5; i++){

				var div = document.createElement('div');
				if (i==0){
					div.innerHTML='<p>Login</p>';
				}
				else{
					if (i==4){
						div.innerHTML='<a href="#">Lost your passord?</a>';
					}
					else{
						var input = document.createElement('input');
						inputsTable.push(input);
						div.appendChild(input);
					};
				};
				userLoginForm.appendChild(div);
			};

			inputsTable[0].setAttribute("type", "text");
			inputsTable[0].setAttribute("placeholder", "username");
			inputsTable[0].setAttribute("name", "username");
			inputsTable[1].setAttribute("type", "password");
			inputsTable[1].setAttribute("placeholder", "password");
			inputsTable[1].setAttribute("name", "password");
			inputsTable[2].setAttribute("type", "submit");
			inputsTable[2].setAttribute("placeholder", "login");

			// console.log("3) userLoginForm.getElementsByTagName('div').length in render: "+ userLoginForm.getElementsByTagName('div').length);
			userLoginForm.getElementsByTagName('div')[1].classList.add('form_login');
			userLoginForm.getElementsByTagName('div')[2].classList.add('form_password');
			userLoginForm.getElementsByTagName('div')[3].classList.add('form_submit');
			
			loginWindowCore.appendChild(userLoginForm);
			loginWindowWrapper.appendChild(loginWindowCore);
			this.rootElem.appendChild(loginWindowWrapper);
	};

	Constructor.prototype.handleInput = function(){

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

		function loginHandler (){
			debugger;
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
				debugger;
				console.log("Username: "+username+"; "+"Password: "+password);
			};

			function	inputToLocalStorage(username, password){
				localStorage.setItem('user', username);
				localStorage.setItem('pwd', password);	
			};

		function outputFromLocalStorage (){
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

	};

	return Constructor;
})();
