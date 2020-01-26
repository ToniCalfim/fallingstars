"use strict"

/**
	Creation Date: 2020 Jan, 25
	Last Modified: 2020 Jan, 26

	Programers: @RavenCodde, @ToniCalfim

	Separation of Concerns:
		- [ ] Presentation
		- [ ] Logic & Data
		- [X] Input
		- [X] Network

	Os links http://bit.ly/37mKmGC e http://bit.ly/2TX2R07 são referências de commandos canvas.

	Our Proposal
	We've started this code to...
									...have fun
									...apply basic uses of JS Language on Canvas.
									...consolidate JS coding paradigmas
									...code remotely
									...test developing tools like console browser, VSCode, etc...
 */

// Instancia canvas como referenciada no HTML que chama esse script
const myCanvas = document.getElementById("myCanvas")
const context = myCanvas.getContext("2d")

// Randomiza um número inteiro dentro de um intervalo
function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

// Stars' Data Structure.
// It's empty to be filled by starsData.stars
const starsData = {
	stars: {
		// Object Stars Definitions goes here...
	}
}

const STARS_DIAMETER = 2

const COLOR_PALLETE = ['white', 'yellow', 'lightyellow', 'blue', 'lightblue', 'darkblue', 'red', 'darkred', 'orange', 'darkorange']
						//'turquoise', 'purple', 'green',  'darkturquoise', 'lightgreen', 'darkgreen' , ,

// Define numbers of stars
for ( let i = 0; i < 150; i++ ) {

	const newStar = 'star' + i;
	
	starsData.stars[newStar] = {
		x:					randomInt(0, 650),
		y:					randomInt(0, 125),
		blinking:			0,	// boolean
		pulsing:			0,	// boolean
		timeToFall:			randomInt(0,1000),  //randomInt(0, 3) * 1000,
		velocityToFall:		randomInt(1, 5), // we need to visually test smoothness - try no to use only integers
		directionToFall:	randomInt(-1, 1),
		diameter:			STARS_DIAMETER,
		color:				COLOR_PALLETE[randomInt(0, COLOR_PALLETE.length)]
	}
}

// FactoryCreateS
// const factoryCreateStar = ({x, y, blinking, pulsing, timeToFall, velocityToFall, diameter, color}) => ({
	// 	x,
	// 	y,
	// 	blinking,
	// 	pulsing,
	// 	timeToFall,
	// 	angleToFall,
	// 	velocityToFall,
	// 	diameter,
	// 	color
	//   });
	
	//   const ravenStar = factoryCreateStar( {x:100, y:60, blinking:0, pulsing:0, timeToFall:0, angleToFall:0, velocityToFall:0, diameter: 20, color:'green' } )
	//createUser(  { userName: 'echo', avatar: 'echo.png' }   ) ;
	
	
	
	
	function update() {
		let x = randomInt(0, 650)
		let y = randomInt(0, 125)	

		//var input = {'x': 0, 'y': 0};
        //input['x'] += 1;
		//rectanglePositionX = ameiva.input['x'];

		// x = 10, y = 10
		// 

		for ( const data in starsData.stars ) {
			const timeFall = starsData.stars[data].timeToFall;

			if(timeFall == 0){
				const velocityFall = starsData.stars[data].velocityToFall
				const angleFall = starsData.stars[data].directionToFall

				const currentPositionX = starsData.stars[data].x;
				const currentPositionY = starsData.stars[data].y;

				starsData.stars[data].x = currentPositionX + 1 * angleFall;
				starsData.stars[data].y = currentPositionY + velocityFall;
			}else {
				starsData.stars[data].timeToFall = timeFall -1;
			}
		}

		// starsData.stars['star6'].y = starsData.stars['star6'].y +1;
		// starsData.stars['star6'].x = starsData.stars['star6'].x -1;
	}
	
	function drawStars() {
		update();
		// Laço para percorrer a estrutura de dados starsData

		context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Dá um clear no canvas	

		for ( const eachStar in starsData.stars ) {
			console.log( starsData.stars[eachStar].color )
			 context.beginPath()
			 context.fillStyle =  starsData.stars[eachStar].color  ///COLOR_PALLETE[randomInt(0, COLOR_PALLETE.length)]
			 context.arc(starsData.stars[eachStar].x, starsData.stars[eachStar].y, STARS_DIAMETER, 0, 2 * Math.PI)
			 context.fill()
			 context.closePath()
		}


	// See wait = http://bit.ly/2TXHvjy
	requestAnimationFrame(drawStars)	
}

drawStars()