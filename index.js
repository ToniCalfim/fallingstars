"use strict"

/**
 * 
 * Creation Date: 2020 Jan, 25
 * Last Modified: 2020 Jan, 26
 *
 *
 *  Overview on Separation of Concerns for this project:
 *
 * 		- Data  layer			: Implemented
 * 		- Logic layer			: Implemented
 * 		- Presentation layer	: Implemented
 * 		- Input layer			: Not applicable
 * 		- Network layer			: Not applicable
 *
 */

/**
 *
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
 * 
 */
 
// Canvas instance as a reference to the canvas on the HTML file that calls this script
const canvas = document.getElementById("canvas")
const context2D = canvas.getContext("2d")


/* ***** ***** ***** Beginning of the Data Layer ***** ***** ***** */
const STARS_DIAMETER = 1.25


const COLOR_PALLETE = [
	// New colors may apply
	'white',
	'yellow',
	'blue',
	'red',
	'orange',

	'turquoise',
	'purple',
	'green',

	'lightblue',	
	'lightyellow',
	'lightgreen',

	'darkred',
	'darkblue',
	'darkorange',
	'darkturquoise',
	'darkgreen'
]

function getRandomNumber(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

const starsData = {
	/*
		Here we have the cradle of stars, where all the stars are allocated in.

		All stars created by the function createStarObject() are going to be moved here.
		Both functions starsData, createStarObject, plus the forth FOR work together.	
	*/

	stars: {
		//
		// All objects created by the function createStarObject() go here...
		//
	}
}

const createStarObject	=  () => {

    let positionX		= getRandomNumber(2, 650);
    let positionY 		= getRandomNumber(3,125);
	let diameter  		= STARS_DIAMETER;

	let pulsing  		= 0;
    let blinking 		= 0;

	let timeToFall      =   getRandomNumber(0,7500);  // See wait = http://bit.ly/2TXHvjy
	let velocityToFall  =	getRandomNumber(1, 5); // visually test smoothness - try to use decimals
	let directionToFall =	getRandomNumber(-1, 1);

    let color    		= COLOR_PALLETE[ getRandomNumber(0, COLOR_PALLETE.length) ];

    return {

		x: positionX,
        y: positionY,

		diameter,
		color,

		pulsing,
		blinking,

		timeToFall,
		directionToFall,
		velocityToFall,

    }
}

for ( let i = 0; i < 175; i++ ) {

	const newStar = 'star' + i;

	starsData.stars[newStar] = createStarObject();

}	


/* ***** ***** ***** Beginning of the Logic Layer ***** ***** ***** */
function update() {

	const stars = starsData.stars;

	for ( const starID in stars ) {

		const currentStar 			= stars[starID];
		const currentTimeToFall 	= currentStar.timeToFall;

		if ( currentTimeToFall != 0 ) {

			currentStar.timeToFall 	= currentTimeToFall - 1;

		}

		else {

			const currentVelocityToFall	= currentStar.velocityToFall
			const currentAngleToFall	= currentStar.directionToFall

			const currentPositionX		= currentStar.x;
			const currentPositionY 		= currentStar.y;

			currentStar.x 				= currentPositionX + 1 * currentAngleToFall;
			currentStar.y 				= currentPositionY + currentVelocityToFall;

		}
	}
}

/* ***** ***** ***** Beginning of the Presentation Layer ***** ***** ***** */
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
