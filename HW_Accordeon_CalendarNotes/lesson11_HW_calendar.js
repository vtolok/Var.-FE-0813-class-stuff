// calendar
var monthCalendar = (function (){
	function Constructor (root, startingDay){
		// console.log("1) Constructor, content[1].header: "+content[1].header);
		this.rootElem = document.querySelector(root);
		this.startingDay=startingDay;
		this.daysInWeek = 7;
		this.daysAndNotes={
			days: [],
			notes: []
		}; //массив объектов день+данные(стринга)

		this.init(); //"поехали!"
	};


	Constructor.prototype.renderAllCalendar = function (){
		self=this;

		var calendar_container = document.createElement('div'),
			calendar_field = document.createElement('div');

		calendar_container.classList.add('calendar_container');
		calendar_field.classList.add('calendar_field');

		this.renderHeader(calendar_field);
		this.renderTable(calendar_field);
		calendar_container.appendChild(calendar_field);
		this.rootElem.appendChild(calendar_container);
	};

	Constructor.prototype.renderHeader = function (targetElem){
		var monthNames = 	["January", "February", "March", "April", "May", "June",
  							"July", "August", "September", "October", "November", "December"],
			monthSelector = document.createElement('div'),
			monthSelectorArrowLeft = document.createElement('div'),
			monthSelectorArrowRight = document.createElement('div'),
			monthSelectorCurrent = document.createElement('div'),
			clearfix = document.createElement('div');


			monthSelector.classList.add('month_selector');
			monthSelectorArrowLeft.classList.add('month_selector__arrow');
			monthSelectorArrowRight.classList.add('month_selector__arrow');
			monthSelectorCurrent.classList.add('month_selector__current');
			clearfix.classList.add('clearfix');

			monthSelectorArrowLeft.innerHTML="&lt";
			monthSelector.appendChild(monthSelectorArrowLeft);
								// console.log('1) self.startingDay. in renderHeader: '+self.startingDay);
			monthSelectorCurrent.innerHTML=monthNames[self.startingDay.getMonth()].toUpperCase()+" "+self.startingDay.getFullYear();
			monthSelector.appendChild(monthSelectorCurrent);
			monthSelectorArrowRight.innerHTML="&gt";
			monthSelector.appendChild(monthSelectorArrowRight);
			monthSelector.appendChild(clearfix);
			targetElem.appendChild(monthSelector);
	};

	Constructor.prototype.renderTable = function (targetElem){

		var dateSelector = document.createElement('div'),
			dateSelectorTable = document.createElement('table');

		var table = {
				headRow: null, //объект типа node
				allOtherRows: [] //массив объектов типа node;
			};

			dateSelector.classList.add('date_selector');
			dateSelectorTable.classList.add('date_selector__table');

			this.renderTableHead(table);
			dateSelectorTable.appendChild(table.headRow);

			this.renderTableBody(table);

			for (var i=0; i<6;i++){	//вставка массива объектов типа node, по-штучно;
				dateSelectorTable.appendChild(table.allOtherRows[i]);
			};

			dateSelector.appendChild(dateSelectorTable);
			targetElem.appendChild(dateSelector);
	};

	Constructor.prototype.renderTableHead = function(table){
		var weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
			table.headRow=document.createElement('tr');
			for (var x; x<7;x++){
				table.headRow.innerHTML+="<th>"+weekDays[x]+"</th>";
			};
	};

	Constructor.prototype.renderTableBody = function(table){
		var tableDates = this.prepareCalendarMatrix(),
			/*[
			[27, 28, 29, 30, 1, 2, 3],
			[4, 5, 6, 7, 8, 9, 10],
			[11,12,13,14,15,16,17],
			[18,19,20,21,22,23,24],
			[25,26,27,28,29,30,31]],*/
			aNote=null,
			aDay=null,
			aRow=null;

		for (var row=0; row<6; row++){ 
			if (tableDates[row]){
				aRow = document.createElement('tr');
				for (var x=0; x<this.daysInWeek;x++){
					aDay=document.createElement('td');
					aDay.innerHTML+=tableDates[row][x];
				// если это первая неделя месяца... 
					if (row==0){
						// то проверяем: является и текущая дата БОЛЬШЕ, чем дата последнего дня этой недели (который обязательно меньше, чем дата любого дня последней недели ПРЕДЫДУЩЕГО месяца)
						if (tableDates[row][x]>tableDates[row][this.daysInWeek-1]){
							aDay.classList.add('wrong_month_dates');
						}
						else {
							//в блок "памятки" пойдут только те дни (week 1), которые относятся к ЭТОМУ месяцу
			 				// var noteContent = 'Lorem ipsum dolor sit amet...';

				 			aNote = document.createElement('div');
				 			aNote.classList.add('dayContent');
				 			// aNote.innerHTML=(noteContent);
				 			// self.daysAndNotes.notes.push(noteContent);
				 			aDay.appendChild(aNote);
							this.daysAndNotes.days.push(aDay); 
						};
					}
					else {
						// если это последняя надаля месяца...
						if (row==4||row==5||row==6){
							// то проверяем: является ли текущая дата МЕНЬШЕ, чем дата первого дня этой недели  //!! A BUG !!
							if (tableDates[row][x]<tableDates[row][0]){
								aDay.classList.add('wrong_month_dates');
							}
							else {
								//в блок "памятки" пойдут только те дни (week 1), которые относятся к ЭТОМУ месяцу
				 				// var noteContent = 'Lorem ipsum dolor sit amet...';

					 			aNote = document.createElement('div');
					 			aNote.classList.add('dayContent');
					 			// aNote.innerHTML=(noteContent);
					 			// self.daysAndNotes.notes.push(noteContent);
					 			aDay.appendChild(aNote);
								this.daysAndNotes.days.push(aDay); 
							};
						}
						else {
							//в блок "памятки" пойдут только те дни (week 1), которые относятся к ЭТОМУ месяцу
				 			// var noteContent = 'Lorem ipsum dolor sit amet...';

				 			aNote = document.createElement('div');
				 			aNote.classList.add('dayContent');
				 			// aNote.innerHTML=(noteContent);
				 			// self.daysAndNotes.notes.push(noteContent);
				 			aDay.appendChild(aNote);
							this.daysAndNotes.days.push(aDay);  
						};
					};
					aRow.appendChild(aDay);
				};	
			};

			table.allOtherRows.push(aRow); //ЗАПОЛНЕНИЕ массива объектов типа node;
		};		
	};

	//вычислитель дат месяца в неделях
	Constructor.prototype.prepareCalendarMatrix = function(){
		var calendarMatrix=[],
			maxRows=6,
			lastRowFlag=false;

		//----------------
		var getDaysInPrevMonth = function() {  //ALPHA
			return new Date(self.startingDay.getFullYear(), self.startingDay.getMonth(), 0 ).getDate(); //день 0 месяца - это ПОСЛЕДНИЙ день прошлого месяца!
		};

		var getDaysInThisMonth = function() {  //BETA
			var nextMonth = new Date (self.startingDay.setMonth(self.startingDay.getMonth()+1));
			return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 0 ).getDate();//день 0 прошлого месяца - это ПОСЛЕДНИЙ день этого!
		};
		
		var getDayOfWeekForDayOne = function() { // GAMMA		//for November 2005 - it shoud be tuesday (i.e. day 2 (0 is Sunday))
			return self.startingDay.getDay();
		};

		var getDayOfWeekForLastDay = function() { // DELTA		//for November 2005 - it shoud be tuesday (i.e. day 2 (0 is Sunday))
			var nextMonth = new Date (self.startingDay.setMonth(self.startingDay.getMonth()+1));
			return nextMonth.getDay();
		};

		var alpha=getDaysInPrevMonth(),
			beta=getDaysInThisMonth(),
			gamma=getDayOfWeekForDayOne();
			delta=getDayOfWeekForLastDay();

		// console.log("29) this.startingDay in prepareCalendarMatrix: "+this.startingDay);
		// console.log("30) getDaysInPrevMonth() in prepareCalendarMatrix: "+/*getDaysInPrevMonth()*/alpha);
		// console.log("31) getDaysInThisMonth() in prepareCalendarMatrix: "+/*getDaysInThisMonth()*/beta);
		// console.log("32) getDayOfWeekForDayOne() in prepareCalendarMatrix: "+/*getDayOfWeekForDayOne()*/gamma);
		// console.log("33) getDayOfWeekForLastDay() in prepareCalendarMatrix: "+/*getDayOfWeekForLastDay()*/delta);

		var CalendarFirstRowGenerator = function (alpha, gamma) {
			var contentArray = [],
				staringDateOfLastMonth = alpha-(gamma-1);// первый день последней недели "старого" месяца = последнее число "старого" - (порядковый номер первого дня недели у "нового" месяца - 1 (ибо числа месяца))
			for (var y=0, z=0; y<self.daysInWeek; y++){
				if (y<gamma){								//числа старого месяца в первом рядке (если есть)
					contentArray.push(staringDateOfLastMonth+y);
				}
				else {										//числа текущего месяца в первом рядке
					contentArray.push(1+z);
					z++;
				};
			};
			return contentArray;
		};


	//--------------
		var CalendarMiddleRowsGenerator = function (gamma) { //rowIndex = 0 for week 2, 1 for week 3 etc
			var contentArray = [],
				startingDateOfCurrentRow = (x-1)*7+(7-(gamma-1)); //(x-1): порядковый номер (он же - кол-во "полных" недель тьек. месяца) - на 1 больше чем опорный перечислитель х; (gamma-1) - порядковый номер дня, начинающегося ПОСЛЕ последнего дня из FirstRow 
			for (var y=0; y<self.daysInWeek; y++){
				contentArray.push(startingDateOfCurrentRow+y);
			};
			return contentArray;
		};

	//----------------
		var CalendarLastRowGenerator = function (beta, delta) {  // !!! <><><><><><><> A BUG!!!
			var contentArray = [],
				startingDateOfCurrentRow = (x-1)*7+(7-(gamma-1)), // -"-
				lastDayOfThisMonth = delta-1;

			//костыль :-(
			if (startingDateOfCurrentRow>beta){
				return;
			};

			for (var y=0, z=0; y<self.daysInWeek; y++){   
				if (y<lastDayOfThisMonth){
					contentArray.push(startingDateOfCurrentRow+y);
				}
				else{
					lastRowFlag=true;
					contentArray.push(1+z);
					z++;
				};
			};
			return contentArray;
		};


	//------------matrix build controller-----------//
		for (var x=0;x<maxRows;x++){
			if (x==0){
				calendarMatrix[x]=CalendarFirstRowGenerator(alpha, gamma);
			}
			else {
				if (x==4||x==5||x==6){
					if (lastRowFlag==false){
					calendarMatrix[x]=CalendarLastRowGenerator(beta, delta);
					};
				}
				else {
						calendarMatrix[x]=CalendarMiddleRowsGenerator(gamma);
				};
			};
		};

		// console.log("33) calendarMatrix in prepareCalendarMatrix: "+calendarMatrix/*[calendarMatrix.length-1]*/);
		return calendarMatrix;
	};

	Constructor.prototype.handleEvents = function(){
		var self = this; // замыкание
		this.handleDaysSelection();
		this.handleNotesSelection();


	};

	Constructor.prototype.handleDaysSelection = function (){
		this.daysAndNotes.days.forEach (function (item){
	 		item.addEventListener('click', function(e){
	 			var daySelectedFlag=false,
	 				noteSelectedFlag=false;

	 			if ((item.classList.contains('selected'))||(item.lastChild.classList.contains('selected'))){
	 				daySelectedFlag=true;
	 				noteSelectedFlag=true;
	 				self.clearSelection();
	 			}

	 			else{
	 				self.clearSelection()
					item.classList.add('selected');
		 			item.lastChild.classList.add('selected');
	 			};
			});
	 	});
	};

	Constructor.prototype.clearSelection = function(){
		self.daysAndNotes.days.forEach (function (item){
			item.classList.remove('selected');
			item.lastChild.classList.remove('selected');
		});
	};

	Constructor.prototype.handleNotesSelection = function (){
		this.daysAndNotes.days.forEach (function (item){
			item.lastChild.addEventListener('click', function(e){
				if (item.lastChild.classList.contains('editable')){
					var aNote=null;

					item.lastChild.classList.remove('editable');
					item.lastChild.contentEditable=false;
					if (item.lastChild.textContent){
						aNote=item.lastChild.textContent;
						console.log(" 39) self.daysAndNotes.days[0] and notes[0] from handleNotesSelection>eventListener: "+self.daysAndNotes.days[0]+"(contains notes)"+self.daysAndNotes.notes[0]);
						self.daysAndNotes.notes[(item.firstChild.textContent)-1]=aNote;
					};
				}
				else{
					item.lastChild.classList.add('editable');
					item.lastChild.contentEditable=true;
				};
				e.stopPropagation();
			});
		});
	};


	Constructor.prototype.init = function(){
		this.renderAllCalendar();
		this.handleEvents();
	};

	return Constructor;
})();