/**
 * 
 * Creation Date: 2020 Jan, 25
 * Last Modified: 2020 Jan, 26
 * 
 *  Overview on Separation of Concerns:
 * 		- [    implemented  ] Presentation layer
 * 		- [    implemented  ] Logic & Data  layer
 * 		- [No implementation] Input layer
 * 		- [No implementation] Network layer
 * 
 * 	Our Proposal
 * 	We've started this code to...
 * 									...have fun
 * 									...apply basic uses of JS Language on Canvas.
 * 									...consolidate JS coding paradigmas
 * 									...code remotely
 * 									...test developing tools like console browser, VSCode, etc...
 * 									...practice JSDoc documentation - see link reference below
 * 									...practice English on a real envitonment
 */

 /** *************************************************************************************************************** */
 /** 																												 */
 /** *************************************************************************************************************** */
 
/**
 * @file OMG, it's full of stars...
 * @fileoverview Check "Our Proposal" aforementioned
 * @supported Tested on Chrome so far
 * @version 1.0.0.0
 * 
 * @author Erivan "Raven Codde" Cerqueira <...@gmail.com>
 * @author Toni Calfim <751127@gmail.com>
 * 
 * @see {@link JSDoc} for further information...
 * @see {@link http://bit.ly/38fOjwE|JSDoc}
 *
 * @see {@link ConstLetVar} for further information...
 * @see {@link http://bit.ly/38j2UaO|ConstLetVar}
 *
 * @see {@link Canvas Commands} for further information...
 * @see {@link http://bit.ly/37mKmGC|Canvas Commands}
 *
 * @see {@link More Canvas Commands} for further information...
 * @see {@link http://bit.ly/2TX2R07|More Canvas Commands}
 *
 * @todo Ellaborate on it
 * @license Pode usar à vontade!
 */
		
const STARS_DIAMETER = 2
		
const COLOR_PALLETE = [
	'white', 'yellow', 'lightyellow', 'blue', 'lightblue',      'darkblue', 'red', 'darkred', 'orange', 'darkorange'
	//'turquoise', 'purple', 'green',  'darkturquoise', 'lightgreen', 'darkgreen' , ,
]

// Instancia canvas como referenciada no HTML que chama esse script
const canvas = document.getElementById("canvas")
const context2D = canvas.getContext("2d")
		
const starsData = {
	stars: {
	// Object Stars Definitions goes here...
	}
}
		
function getRandomNumber(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

const createStarObject =  () => {
    
    let positionX = getRandomNumber(0, 650);
    let positionY = getRandomNumber(0,125);
	let diameter  = STARS_DIAMETER;
	
	let pulsing  = 0;
    let blinking = 0;
	
	let timeToFall      =   getRandomNumber(0,1000);  // See wait = http://bit.ly/2TXHvjy
	let velocityToFall  =	getRandomNumber(1, 5); // we need to visually test smoothness - try no to use only integers
	let directionToFall =	getRandomNumber(-1, 1);
            
    let color    = COLOR_PALLETE[
        getRandomNumber(0, COLOR_PALLETE.length)
    ];
    
    return {

  	     	x: positionX,
            y: positionY,
			diameter,   
			pulsing,
			blinking,
			timeToFall,
			velocityToFall,
			directionToFall,
            color,
    }
}

for ( let i = 0; i < 25; i++ ) {
	const newStar = 'star' + i;
	starsData.stars[newStar] = createStarObject();
}	

function update() {
		
	const stars = starsData.stars;

	for ( const starID in stars ) {
			
		const currentStar = stars[starID];			
		const currentTimeToFall = currentStar.timeToFall;

		if ( currentTimeToFall != 0 ) {

			currentStar.timeToFall = currentTimeToFall - 1;

		} else {

			const currentVelocityToFall = currentStar.velocityToFall
			const currentAngleToFall = currentStar.directionToFall

			const currentPositionX = currentStar.x;
			const currentPositionY = currentStar.y;

			currentStar.x = currentPositionX + 1 * currentAngleToFall;
			currentStar.y = currentPositionY + currentVelocityToFall;				

		}
	}
}
	
function drawStars() {

	context2D.clearRect(0, 0, context2D.canvas.width, context2D.canvas.height) // Clear canvas

	const stars = starsData.stars;
		
	for ( const starID in stars ) {
		
		context2D.beginPath()
		context2D.fillStyle =  stars[starID].color
		context2D.arc(stars[starID].x, stars[starID].y, STARS_DIAMETER, 0, 2 * Math.PI)
		context2D.fill()
		context2D.closePath()

	}

}

function animateLoop(){
	
	update();
	drawStars();
	requestAnimationFrame(animateLoop);	
}

animateLoop();