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
 * @fileoverview OMG, it's full of stars...
 * @supported Tested on Chrome so far
 * @version 1.0.0.0 standing for major.minor.revision.x
 * 
 * @author Erivan "Raven Codde" Cerqueira <soulidbrasil@gmail.com>
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
 * @license Use it as you will!
 * 
 */

/** Current canvas instance as a reference to the canvas on the HTML file that calls this script */
const canvas = document.getElementById( "canvas" )
const context2D = canvas.getContext( "2d" )

/** *************************************** */
/** ***** Beginning of the Data Layer ***** */
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
	'darkgreen',
]

function getRandomNumber( min, max ) {
	/**
	 * @see {@link More Randomizing Functions} for further information...
	 * @see {@link https://mzl.la/2GAjNli|More Randomizing Functions}
	 */

	min = Math.ceil( min );
	max = Math.floor( max) ;

	return Math.floor( Math.random() * ( max - min + 1) ) + min;

}

const starsData = {
	/**
	 * Here we have the cradle of stars, where all the stars are allocated in.
	 * All stars created by the function createStarObject() are going to be moved here.
	 * Both functions starsData, createStarObject, plus the forthcoming FOR work together.
	 *
	 * Attributes of the objects are going to be accessed from here...
	 *
	 * Structuraly we have an object inside another object. In JavaScript, "chaves" represents
	 * an object. Here "starsData" is an object, and "star" is another object. And then you can
	 * access the attributes as if objects were hashtables.
	*/
	stars: {
		/**
		 * All objects created by the function createStarObject() go here...
		 */
	}
}

const createStarObject = () => {
	/**
	 * This is a Factory Function, that returns already instanced aobjects.
	 * 
	 * Here all the **ATTRIBUTES** of the objects are declared, instanced, first calculated, and returned
	 * 
	 * New attributes must be declared firstly here.
	 * 
	 * All —(maybe?!)— the attributes are going to be recalculated by the function update()
	 */
    let positionX = getRandomNumber( 2, 650 )
    let positionY = getRandomNumber( 3, 125 )
	let diameter = 1.25;

    let color = COLOR_PALLETE[getRandomNumber( 0, COLOR_PALLETE.length )]

	let pulsing = 0
    let blinking = 0

	let timeToFall = getRandomNumber( 0, 7500 ) // See wait = http://bit.ly/2TXHvjy

	/**
	 * 
	 * Both attributes velocityToFall and angleToFall add in favor of velocity.
	 * 
	 * So said, the attribute velocityToFall must be always >= zero or
	 * objects won't go down, but will go up.
	 * 
	 * And the attribute angleToFall says about the inclination objects will fall.
	 * 
	 * In short, the bigger the numbers, the faster objects will fall; but if the
	 * numbers are very high, objects may start to flick.
	 * 
	 */
	let velocityToFall = getRandomNumber( 0, 4 )	// Changes the Y axis
	let angleToFall = getRandomNumber( -7, 7 )  	// Changes the X axis

    return {

		x: positionX,
        y: positionY,

		diameter,
		color,

		pulsing,
		blinking,

		timeToFall,
		angleToFall,
		velocityToFall,

    }
}

for ( let i = 0; i < 175; i++ ) {
	/**
	 * 
	 * This FOR populates the Cradle of Stars on function starsData with a 
	 * sequentialy named object and their respective aleatory values
	 * for the attributes.
	 * 
	 */

	const newStar = 'star' + i

	starsData.stars[newStar] = createStarObject()

}	

/** **************************************** */
/** ***** Beginning of the Logic Layer ***** */
function update() {

	/** This const "stars" gives us easy access to the population of stars inside starsData */
	const stars = starsData.stars

	for ( const starID in stars ) {

		const currentStar = stars[starID]

		const currentTimeToFall = currentStar.timeToFall

		if ( currentTimeToFall != 0 ) {

			currentStar.timeToFall = currentTimeToFall - 1

		}

		else {

			const currentVelocityToFall	= currentStar.velocityToFall
			const currentAngleToFall = currentStar.angleToFall

			const currentPositionX = currentStar.x
			const currentPositionY = currentStar.y

			currentStar.x = currentPositionX + 1 * currentAngleToFall
			currentStar.y = currentPositionY + currentVelocityToFall

		}
	}
}

/** *********************************************** */
/** ***** Beginning of the Presentation Layer ***** */
function drawStars() {

	context2D.clearRect( 0, 0, context2D.canvas.width, context2D.canvas.height ) // Clear canvas

	const stars = starsData.stars

	for ( const starID in stars ) {

		const currentStar = stars[starID]

		context2D.beginPath()
		context2D.fillStyle = currentStar.color
		context2D.arc( currentStar.x, currentStar.y, currentStar.diameter, 0, 2 * Math.PI )
		context2D.fill()
		context2D.closePath()

	}
}

function animateLoop() {

	update()
	drawStars()
	requestAnimationFrame( animateLoop )

}

animateLoop()