"use strict"

/**
 * 
 * Creation Date: 2020 Jan, 25
 * Last Modified: 2020 Jan, 30
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
/**                                         */
/** ***** Beginning of the Data Layer ***** */
/**                                         */
/**                                         */
/** *************************************** */
const COLOR_PALLETE = [
	//
	// New suitable colors may apply: https://www.w3schools.com/colors/colors_names.asp
	//

	//'white', // White collor will be used for the blinking property

	'lightyellow',
	//'yellow',			// This color won't do
	
	//'lightblue',		// This color won't do
	//'blue',
	'darkblue',

	//'red',			// This color won't do
	//'darkred',

	//'orange',			// This color won't do
	//'darkorange',		// This color won't do

	'turquoise',
	'darkturquoise',

	'purple',

	//'lightgreen',		// This color won't do
	'green',
	'darkgreen',

]

function getRandomNumber( min, max ) {
	/**
	 * 
	 * @see {@link More Randomizing Functions} for further information...
	 * @see {@link https://mzl.la/2GAjNli|More Randomizing Functions}
	 * 
	 */

	min = Math.ceil( min );
	max = Math.floor( max) ;

	return Math.floor( Math.random() * ( max - min + 1) ) + min;

}

const cradleOfStars = {
	/**
	 * 
	 * Here we have the cradle of stars, where all the stars are allocated in.
	 * All stars created by the function createStars() are going to be moved here.
	 * Both functions cradleOfStars, createStars, plus the forthcoming FOR work together.
	 *
	 * Attributes of the objects are going to be accessed from here...
	 *
	 * Structuraly we have an object inside another object. In JavaScript, "chaves" represents
	 * an object. Here "cradleOfStars" is an object, and "star" is another object. And then you can
	 * access the attributes as if objects were hashtables.
	 * 
	*/
	stars: {
		/**
		 * 
		 * All stars created by the function createStars() go here...
		 * 
		 */
	}
}

const createStars = () => {
	/**
	 * 
	 * This is a Factory Function, it returns already instanced objects.
	 * 
	 * Here all the **ATTRIBUTES** of the objects are declared, instanced, first calculated, and returned
	 * 
	 * New attributes must be declared firstly here.
	 * 
	 * All —(maybe?!)— the attributes are going to be recalculated by the function update()
	 * 
	 */
	let positionX = getRandomNumber( 2, context2D.canvas.width )	
	
	/** Stars are born in these coordinates area. The second parameter causes stars disperses more over canvas */
	let positionY = getRandomNumber( 3, 325 )

	let diameter = 1.25;

    let color = COLOR_PALLETE[getRandomNumber( 0, COLOR_PALLETE.length )]

	let pulsing = 0
    let blinking = 0

	let timeToFall = getRandomNumber( 0, 12500 ) // See wait = http://bit.ly/2TXHvjy

	/**
	 * 
	 * Both forthcoming attributes velocityToFall and angleToFall add in favor of velocity.
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
	let velocityToFall = getRandomNumber( 4, 5 )	// Changes the Y axis
	let angleToFall = getRandomNumber( -9, 9 )  	// Changes the X axis

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

for ( let numberOfStars = 0; numberOfStars < 175; numberOfStars++ ) {
	/**
	 * 
	 * This FOR populates the Cradle of Stars on function cradleOfStars with a 
	 * sequentialy named object and their respective aleatory values
	 * for the attributes.
	 * 
	 */

	const newStar = 'star' + numberOfStars

	cradleOfStars.stars[newStar] = createStars()

}	

/** **************************************** */
/**                                          */
/** ***** Beginning of the Logic Layer ***** */
/**                                          */
/**                                          */
/** **************************************** */
function update() {
	
	context2D.clearRect( 0, 0, context2D.canvas.width, context2D.canvas.height ) // Clear canvas

	/** This const "stars" gives us easy access to the population of stars inside cradleOfStars */
	const stars = cradleOfStars.stars

	for ( const starID in stars ) {

		/** This const "currentStar" gives us easy access to unique starID inside cradleOfStars */
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
/**                                                 */
/** ***** Beginning of the Presentation Layer ***** */
/**                                                 */
/**                                                 */
/** *********************************************** */
function drawSky() {

	/**
	 *
	 * We can have both linear and radial gradients,
	 * see link https://www.w3schools.com/graphics/canvas_gradients.asp
	 *
	 */

	                 // createLinearGradient( startinX, startingY, endingX, endingY );
	var gradient = context2D.createLinearGradient( 250, 0, 250, 500 );

	/** Values here range from 0 to 1 */
	gradient.addColorStop( .25, "black" );
	gradient.addColorStop( .60 ,"DarkSlateGray" );
	gradient.addColorStop( .95, "lightgray" );

	context2D.fillStyle = gradient;
	context2D.fillRect(0, 0, context2D.canvas.width, context2D.canvas.height);

}

function drawCity() {

	/** Element "city" was previously declared on the HTML file */
	var image = document.getElementById( "city" );
	context2D.drawImage( image, -7, 285 );

}

function drawStars() {

	/** This const "stars" gives us easy access to the population of stars inside cradleOfStars */
	const stars = cradleOfStars.stars

	for ( const starID in stars ) {

		/** This const "currentStar" gives us easy access to unique starID inside cradleOfStars */
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

	drawSky()

	drawStars()

	drawCity()

	requestAnimationFrame( animateLoop )

}
	
animateLoop()
