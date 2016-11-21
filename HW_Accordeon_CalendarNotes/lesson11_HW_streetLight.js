var streetLight = (function (){

	function Constructor (root){
		// debugger;
		this.rootElem = document.querySelector(root);
		this.circles = [],
		this.buttonCasing=null,
		this.switchBtns= [],
		this.onFlag=false;

		this.init(); //"поехали!"
		
	};

	Constructor.prototype.renderAll = function (){

		this.renderStreetLight();
		this.renderSwitch();
	};


	Constructor.prototype.renderStreetLight = function (){
		var i=0,
			circle = null;

		for(i; i<3;i++){
			circle=document.createElement('div');
			circle.classList.add('circle');
			this.circles.push(circle);
			this.rootElem.appendChild(circle);
		};	
	};


	Constructor.prototype.renderSwitch = function (){
		var j=0,
			button=null;

		this.buttonCasing = document.createElement('div');
		this.buttonCasing.classList.add('buttonCasing');
		console.log("-2) this.buttonCasing from renderSwitch: "+this.buttonCasing);
		this.rootElem.appendChild(this.buttonCasing);

		for(j; j<2;j++){
			button=document.createElement('div');
			button.classList.add('btn');
			this.switchBtns.push(button);
			if (j==1){
				button.classList.add('off');
			};
			this.buttonCasing.appendChild(button);
		};
	};


	Constructor.prototype.handleAllEvents = function(){
		var self = this; // замыкание данных о this (объекте класса streetLight), нужных для корректной работы callback (у него есть нужный нам метод clearLights!), когда сам конструктор streetLight уже УМЕР )
	
		this.handleCircles();
		this.handleSwitch();
	};

	Constructor.prototype.handleCircles = function(){
		var self = this;
		this.circles.forEach (function (item){
			item.addEventListener('click', function(e){
				self.clearLights(); // через this. нельзя обратиться ко всему Контсруктору, т.к. в этой функции this - это уже лишь 1 из item (потеря контекста) 
				if(self.onFlag==true){
					this.classList.add('active');
				};
			});
		});
	};


	Constructor.prototype.handleSwitch = function(){
		var self = this;
		this.buttonCasing.addEventListener('click', function(){
			self.alterSwitch();

			// console.log("7) buttonCasing.firstChild from handleSwitch: "+self.buttonCasing.firstChild);
			if(self.buttonCasing.firstChild.classList.contains('off')){
				self.onFlag=true;	
			}
			else{
				self.onFlag=false;
				self.clearLights();	
			};
			console.log("8) self.onFlag from handleSwitch: "+self.onFlag);		
		});
	};

	Constructor.prototype.alterSwitch = function(){
		// console.log("4) j from alterSwitch: "+j);
		for (var j=0;j<2;j++){
			// console.log("5) this.switchBtns[j] form alterSwitch: "+this.switchBtns[j]);
			this.switchBtns[j].classList.toggle('off');
		};
	};

	Constructor.prototype.clearLights = function(){
		this.circles.forEach (function (item){
			item.classList.remove('active');
		});
	};

	Constructor.prototype.onOff = function(){
		/////////
	};

	Constructor.prototype.init = function (){
		this.renderAll();
		this.handleAllEvents();
	};

	return Constructor;
})();

