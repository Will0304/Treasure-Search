// set up the variables used in the code
		var attempts = 0, name = "", call_counter = 0, attempt_limit=20;

		// this function returns the user-friendly formatted hint messages for how to reach the treasure
		function direction_hint(a,b){
			return `The treasure is ${Math.abs((b/37.795).toFixed(2))}cm ${b<0?'below':'above'} you, ${Math.abs((a/37.795).toFixed(2))}cm on your ${a>0?'left':'right'}`
		}

		/*	Set up the function that handles the treasure finding process. 
			It is only called if the previsus two stages of the game have been complted successfully
		*/ 
		function stage3(){

				//the randint function will generate a random integer (used for x and y coordinates of the treasure)
				function randint (size) {
					return Math.floor ( Math.random() * size )
				}

				// bound the image with the 'map' id to the function in order to make it visible ('inline')
				var map = document.getElementById("map")
				map.style.display = 'inline'

				// set up the treasure target as a dictionary with the x and y properties with values determined by the randint function 
				var target = {x: randint(map.width), y: randint(map.height)}
				

				// this function determines the distance of the user click to the targeted treasure.
			 	function get_dist ( coord, target) {
					var diffX = coord.offsetX - target.x
					var diffY = coord.offsetY - target.y

					//output the x-difference, y-difference, and a straight (hypothenuse) line difference
					return [diffX, diffY, Math.sqrt(diffX*diffX+diffY*diffY)]
				}
				

				// the hint function outputs the detailed calculated messages to the user 
				function hint(a,b,distance){

					attempts_left = attempt_limit-attempts

					// in order to increase the chance of winning, the win area is set to 1.5pxl^2 as opposed to 1pxl^2
					if (distance < 3){

						// if the user found the treasure, hide the map and display the treasure picture
						map.style.display='none'
						var treasure = document.getElementById("treasure")
						treasure.style.display = 'inline'

						//modify the h3 and h4 paragraphs to display the final stats messages
						$('h3').text(`You won!`)
						$('#heading4').text(`CONGRATULATIONS, ${name}! You have found the treasure in ${attempt_limit>attempts?'only':''} ${attempts} attempts!`)
					}

					/* this if-else block will provide different outputs based on the length of the straight line from click to treasure.
					 Note: a and b stand for the x and y coordinate differences and will be used for the direction_hint function */
					else if ( distance < 10 )
						$('h3').text(`Boiling hot${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 20 )
						$('h3').text(`Really hot${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 40 )
						$('h3').text(`Hot${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 80 )
						$('h3').text(`Warm${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 120 )
						$('h3').text(`Cold${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 160 )
						$('h3').text(`Very cold${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else if ( distance < 320 )
						$('h3').text(`Super cold${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
					else
						$('h3').text(`Freezing${attempts_left==0?', but':'!'} You have ${attempts_left} attempts left. ${direction_hint(a,b)}`)
				}


				// this set of rules will execute when the map picture is clicked on.
				$('#map').click( function (location){
					attempts++
					// display the end-of-game message if the attempts have reached the attempt limit 
					if (attempts>attempt_limit){
						$('h2').text('Uh Oh! You ran out of attempts!')
						return
					}
				// set x, y & dist to the result of get_dist called from the user click coordinates.
					var [x,y,dist] = get_dist(location,target)// x,y  and dist = x&y-difference and straight line length
					// call the hint function to output the message to the console.
					hint(x,y,dist)
				})
		}


		// the stage 2 of the game sets the paragraphs and headings to contain certain phrases
		function stage2(){

				$('h1').text(`Welcome to the game, ${name}!`)
				$('h1').fadeIn(200)
				$('h2').text(`You have just found out that there is a treasure\nhidden somewhere in the city of Fredericton!`)
				$('h3').text(`You have ${attempt_limit} attempts to find it!`)
				$('h4').text(`The treasure could be anywhere, even in the water!\nClick on the city map to orient and find the treasure!`)
				$('h5').text(`Begin the treasure search!`)
				$('h5').click(function(){
					// if heading 5 ('begin the treasure hunt') is clicked on, clear all the paragraphs and headings 
					for (i of ['h1','h2','h3','h4','h5','p'])
						$(i).text("")
					stage3()
				})
		}

		// this is the stage on of the game which prompts the user for their name, and the amount of attempts they would like to have 
	

		function stage1(){
			attempt_limit = +(prompt("Please input the amount of attempts you would like to have.")||attempt_limit)
			prompt_the_name = function (count){
				if (count==0){
					name = prompt("Please input your name here")||"Unknown"
					if (name!=""){
						// fade out the introductory message and call the stage2() function for further setting development
						$('h1').fadeOut(2000)
						setTimeout(stage2,3000)
					}
				}
				
			}

			$('h1').text("Start the game!")
			$('h1').click(function(){
				prompt_the_name(call_counter++)
			})
		}
		// call the stage1() function to begin the game
		stage1()
