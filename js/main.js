//// CLOCK

var dateOld = new Date(); 

function updateTime() {
	var clock = document.getElementById('clock');
	var dateNow = new Date();
	var date = new Date(dateNow - dateOld);

	var hours = date.getUTCHours();
	if (hours < 10) hours = '0' + hours;

	var minutes = date.getMinutes();
	if (minutes < 10) minutes = '0' + minutes;
	

	var seconds = date.getSeconds();
	if (seconds < 10) seconds = '0' + seconds;

	clock.children[1].innerHTML = hours + ':' + minutes + ':' + seconds;
}

function clockStart() { 
	var timerId = setInterval(updateTime, 1000);
	updateTime(); 
}

clockStart();

//// Rotate container

var degree = 0;

function rotateContainer() {
	var container = document.getElementById('container');
	
		degree += 90;

		if (degree == 360) {
			degree = 0;
			container.style.cssText = '';
			return;
		}
		
		container.style.cssText = 'transform: rotate(' + degree + 'deg);';
}

//// Toggle result button

var countBlack = 0;
 
function toggleResult() {
	var resultContainer = document.getElementsByClassName('result')[0];
	var resultButton = document.getElementById('resultButton');

	if ( resultContainer.classList.contains('hidden') ) {

		resultContainer.classList.remove('hidden');

		var pixel = document.getElementById('pixel');
		pixel.innerHTML = ' ' + countBlack;

		var clock = document.getElementById('clock');
		var timeResult = document.getElementById('timeResult');
		timeResult.innerHTML = ' ' + clock.children[1].innerHTML;

		resultButton.href = '#result';

		drawCanvas()

		return;
	}

	resultButton.href = '#';

	resultContainer.classList.add('hidden');
}

//// inject functions and cordinates to pixels

var buttons = document.getElementsByClassName('button');

for (var i = 0; i < 16; i++) {
	buttons[i].onclick = changeColor;
	buttons[i].myCol = i % 4;
	buttons[i].myRow = Math.floor(i / 4);
	//console.log(buttons[i].myRow, buttons[i].myCol);
}

//// Change color by click

function changeColor() {
	if (this.myBlack) {
		this.myBlack = false;	
		this.style.background = '';
		countBlack--;
		return;
	}
	
	this.myBlack = true;
	countBlack++;
	this.style.background = 'black';

}

//// Canvas

function drawCanvas() {
	var canvas = document.getElementById('canvas');
	var k = 0;

	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		for (var i = 0; i < 4; i++) {

			for (var j = 0; j < 4; j++)	 {

				if ( (buttons[k].myRow == i) && (buttons[k].myCol == j) && (buttons[k].myBlack) )
					ctx.fillStyle = 'black';
						else ctx.fillStyle = "#5da09a";
				
				k++;

				ctx.fillRect(j*26 , i*26 ,25,25);

			}

		}

	}

	canvas.style.cssText = 'transform: rotate(' + degree + 'deg);';
}