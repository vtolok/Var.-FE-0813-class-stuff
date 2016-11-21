// accordeon
var accordeon = (function (){
	function Constructor (root, content){
		// console.log("1) Constructor, content[1].header: "+content[1].header);
		this.rootElem = document.querySelector(root);
		this.content=content;
		this.accordBlocks = [];

		this.init(); //"поехали!"
	};

	Constructor.prototype.render = function (){
		var accordBlock=null,
			head=null,
			textBox=null;

					//console.log("2) render, this.content.length: "+this.content.length);
		for (i=0; i<this.content.length; i++){
			accordBlock=document.createElement('div');
			accordBlock.classList.add('accordBlock');

				head=document.createElement('div');
				head.classList.add('head');
					head_arrow=document.createElement('div');
					head_arrow.classList.add('head_arrow');
					head.appendChild(head_arrow);

					head_text=document.createElement('div');
					head_text.classList.add('head_text');
						// console.log("3) render, this.content[i].header: "+this.content[i].header)
					head_text.innerHTML=(this.content[i].header);
					head.appendChild(head_text);
				accordBlock.appendChild(head);

				textBox=document.createElement('div');
				textBox.classList.add('textBox');
						// console.log("4) render, this.content[i].text: "+this.content[i].text);
				textBox.innerHTML=(this.content[i].text)
						console.log("11) render, head_text.offsetLeft: "+head_text.offsetLeft);
				//textBox.offsetLeft=head_text.offsetLeft;
				accordBlock.appendChild(textBox);

			this.accordBlocks.push(accordBlock);

			this.rootElem.appendChild(accordBlock);
		};
	};

	Constructor.prototype.handleEvents = function(){
		var self = this; // замыкание
		this.accordBlocks.forEach (function (item){	
			item.addEventListener('click', function(e){
				if (this.classList.contains('active')){
					this.classList.toggle('active');
					this.firstChild.firstChild.classList.toggle('active')
					this.lastChild.classList.toggle('active')
				}
				else{
					self.clearAccord(); // через this. нельзя обратиться ко всему Контсруктору, т.к. в этой функции this - это уже лишь 1 из item (потеря контекста) 
					this.classList.toggle('active');
					this.firstChild.firstChild.classList.toggle('active')
					this.lastChild.classList.toggle('active');
				};
			});
		});
	};

	Constructor.prototype.clearAccord = function(){
		this.accordBlocks.forEach (function (item){
			item.classList.remove('active');
			item.firstChild.firstChild.classList.remove('active')
			item.lastChild.classList.remove('active');
		});
	};

	Constructor.prototype.init = function(){
		this.render();
		this.handleEvents();
	};

	return Constructor;
})();