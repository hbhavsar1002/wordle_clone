const lettersPattern = /^[a-z]$/;
let currentGuessCount = 1;
let asciiValue = 65;
let charValue = String.fromCharCode(asciiValue);
let currentGuess = document.querySelector('#guess' + currentGuessCount);
let prevGuess = document.querySelector('#guess' + currentGuessCount);
let solved = false;
const keyboard = document.querySelectorAll('.letter');
const dark_theme = document.querySelector('#dark');
const light_theme = document.querySelector('#light');
let solutionWord = '';
let revealAnswer = new Array(5).fill('');
let theme = '';
const wonModal = document.querySelector(".won-modal");
const giveUpModal = document.querySelector(".surrender");
const giveUpButton = document.querySelector(".give-up");
const cancelButton = document.querySelector(".surrender .modal-close-button");
const cancelReload = document.querySelector(".surrender .reload");
const howToModal = document.querySelector(".howtoplay-modal");
const howToButton = document.querySelector(".howtoplay-button");
const newGameReload = document.querySelector('#new-reload');
const newGameClose = document.querySelector('#new-close');
const newGameButton = document.querySelector('.new-game-button');
const lostMessage = document.querySelector("#lost");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

newGameReload.addEventListener('click', function(){
	location.reload();
});

newGameButton.addEventListener('click', function(){
	location.reload();
});

const newGameFunction = () =>{
	newGameButton.classList.remove('inactive');
	giveUpButton.classList.add('inactive');
	document.documentElement.style.setProperty('--give-up-container-justify-content', 'var(--left)');
	document.documentElement.style.setProperty('--give-up-container-width', 'var(--120)');
}

newGameClose.addEventListener('click', function(){
	
	wonModal.close();
	newGameFunction();
	
});

wonModal.addEventListener('mousedown', function(e) {
	if (e.target === wonModal){
		wonModal.close();
		newGameFunction();
		e.preventDefault();
	}
});

howToButton.addEventListener('click', function(){
	howToModal.showModal();
	howToModal.classList.remove('inactive');
});

howToModal.addEventListener('mousedown', function(e) {
	if (e.target === howToModal){
		howToModal.close();
		// Prevent the default behavior
		e.preventDefault();
	}
});


giveUpButton.addEventListener('click', function(){
	giveUpModal.showModal();
	giveUpModal.classList.remove('inactive');
});

cancelReload.addEventListener('click', function(){
	location.reload();
});

cancelButton.addEventListener('click', function(){
	lostMessage.classList.remove("inactive");
	newGameFunction();

	currentGuessCount = 7;
});

giveUpModal.addEventListener('mousedown', function(e) {
	if (e.target === giveUpModal){
		giveUpModal.close();
		lostMessage.classList.remove("inactive");
		newGameFunction();
		//location.reload();
		// Prevent the default behavior
		e.preventDefault();
	}
});

//console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);

const checkBrowserTheme = () =>{
	if(localStorage.getItem("theme")){
		theme = localStorage.getItem("theme");
	}
	else{
		if (window.matchMedia('(prefers-color-scheme: dark)').matches){
			theme = 'dark';
			//alert('theme is dark by default');
		}else{
			theme = 'light';
			//alert('theme is light by default');
			
		}
	}
	
};

dark_theme.addEventListener('mouseover', () => {
    dark_theme.style.backgroundColor = 'var(--green-hover-light)';
	dark_theme.querySelector('.svg-color path').style.stroke = 'var(--green-hover-dark)';
    dark_theme.querySelector('.svg-color path').setAttribute('stroke', 'var(--green-hover-dark)', 'important');
});

dark_theme.addEventListener('mouseout',()=>{
	dark_theme.style.backgroundColor = 'var(--guess-tile-border-color)';
	dark_theme.querySelector('.svg-color path').style.stroke = 'var(--body-color)';
    dark_theme.querySelector('.svg-color path').setAttribute('stroke', 'var(--body-color)', 'important');
});

light_theme.addEventListener('mouseover', () => {
    light_theme.style.backgroundColor = 'var(--green-hover-dark)';

    light_theme.querySelectorAll('.svg-color line').forEach(line => {
        line.style.stroke = 'var(--green-hover-light)';
    });

    light_theme.querySelector('.svg-color circle').style.stroke = 'var(--green-hover-light)';

});

light_theme.addEventListener('mouseout', () => {
    light_theme.style.backgroundColor = 'var(--guess-tile-border-color)';

    light_theme.querySelectorAll('.svg-color line').forEach(line => {
        line.style.stroke = 'var(--body-color)';
    });

    light_theme.querySelector('.svg-color circle').style.stroke = 'var(--body-color)';

});



howToButton.addEventListener('mouseover',()=>{
	if (localStorage.getItem('theme') == 'light'){
		howToButton.style.backgroundColor = 'var(--green-hover-light)';
		howToButton.querySelector('.ques-color').style.fill = 'var(--green-hover-dark)';

	}else{
		howToButton.style.backgroundColor = 'var(--green-hover-dark)';
		howToButton.querySelector('.ques-color').style.fill = 'var(--green-hover-light)';
	}


});

howToButton.addEventListener('mouseout',()=>{
	if (localStorage.getItem('theme') == 'light'){
		howToButton.querySelector('.ques-color').style.fill = 'var(--body-color)';
		howToButton.style.backgroundColor = 'var(--guess-tile-border-color)';
	}else{
		howToButton.querySelector('.ques-color').style.fill = 'var(--body-color)';
		howToButton.style.backgroundColor = 'var(--guess-tile-border-color)';
	}
});



const setLightTheme = () =>{
	light_theme.classList.add('inactive');
	dark_theme.classList.remove('inactive');
	document.documentElement.style.setProperty('--body-background-color', 'var(--white)');
	document.documentElement.style.setProperty('--body-color', 'var(--black)');
	document.documentElement.style.setProperty('--guess-tile-border-color', 'var(--gray-3)');
	document.documentElement.style.setProperty('--guess-tile-has-letter', 'var(--gray-4)');
	document.documentElement.style.setProperty('--button-color', 'var(--black)');
	document.documentElement.style.setProperty('--absent', 'var(--absent-light)');
	document.documentElement.style.setProperty('--green', 'var(--green-light)');
	document.documentElement.style.setProperty('--yellow', 'var(--yellow-light)');
	document.documentElement.style.setProperty('--dialog-color', 'var(--white)');
	document.documentElement.style.setProperty('--modal-header-color', 'var(--modal-header-light)');
	document.documentElement.style.setProperty('--green-hover', 'var(--green-hover-light)');
	document.documentElement.style.setProperty('--green-hover-text', 'var(--green-hover-dark)');
	document.documentElement.style.setProperty('--red-hover', 'var(--red-hover-light)');
	document.documentElement.style.setProperty('--red-hover-text', 'var(--red-hover-dark)');
	document.documentElement.style.setProperty('--gray-hover', 'var(--gray-hover-light)');
	
	localStorage.setItem('theme','light');
};

const setDarkTheme = () =>{
	dark_theme.classList.add('inactive');
	light_theme.classList.remove('inactive');
	document.documentElement.style.setProperty('--body-background-color', 'var(--black)');
	document.documentElement.style.setProperty('--body-color', 'var(--white)');
	document.documentElement.style.setProperty('--guess-tile-border-color', 'var(--gray-1)');
	document.documentElement.style.setProperty('--guess-tile-has-letter', 'var(--gray-2)');
	document.documentElement.style.setProperty('--button-color', 'var(--white)');
	document.documentElement.style.setProperty('--absent', 'var(--absent-dark)');
	document.documentElement.style.setProperty('--green', 'var(--green-dark)');
	document.documentElement.style.setProperty('--yellow', 'var(--yellow-dark)');
	document.documentElement.style.setProperty('--dialog-color', 'var(--black-1)');
	document.documentElement.style.setProperty('--modal-header-color', 'var(--modal-header-dark)');
	document.documentElement.style.setProperty('--green-hover', 'var(--green-hover-dark)');
	document.documentElement.style.setProperty('--green-hover-text', 'var(--green-hover-light)');
	document.documentElement.style.setProperty('--red-hover', 'var(--red-hover-dark)');
	document.documentElement.style.setProperty('--red-hover-text', 'var(--red-hover-light)');
	document.documentElement.style.setProperty('--gray-hover', 'var(--gray-hover-dark)');

	localStorage.setItem('theme','dark');

}

const setTheme = () =>{
	checkBrowserTheme();
	if (theme.length == 0){
		//set default theme as dark
		theme = 'dark'
		setDarkTheme();
	}

	if (theme == 'light'){
		setLightTheme();
	}
};

setTheme();


dark_theme.addEventListener('click', () =>{
	setDarkTheme();
});

light_theme.addEventListener('click', () =>{
	setLightTheme();
});

//console.log(keyboard);
// add eventlistener for currentLetter
keyboard.forEach(button => {
	button.addEventListener('click', () =>{
		//console.log(lettersPattern.test(button.value));
		//check if a letter is clicked
		if(currentGuessCount <= 6){
			if(lettersPattern.test(button.value) && currentGuess.dataset.letters.length < 5){
				updateLetters(button.value);
			}
			//check if Enter is clicked
			else if(button.value == 'enter' && currentGuess.dataset.letters.length == 5 
				&& solved == false){
				submitGuess();
			}
			//check if Backspace is clicked
			else if(button.value == 'backspace' && currentGuess.dataset.letters.length > 0){
				deleteFromLetters();
			}
		}
	});

});


const loadWords = () =>{

	//from a file 
	return fetch('./app/wordlist.json')
		.then((response) => response.json())
		.then(({ words }) => words)
		.catch(() => []);
	
};

let globalWords = [];

const loadValidWords = () => {
	return fetch('./app/words.json')
    .then((response) => response.json())
    .then(({ words }) => {
      globalWords = words; 
	  //console.log(globalWords.length);
    })
    .catch(() => {
      //console.error('Failed to load words');
      return []; 
    });
  };

loadValidWords();

const chooseWord = () => {
	const headers = {
		'Content-Type': 'application/json'
	};
	
	loadWords().then(database => {
		// choose random item from words array
		
		let randomIndex = Math.floor(Math.random() * (database.length - 1)) + 1;
		solutionWord = database[randomIndex];
		//console.log('randomWord: ' + solutionWord);


		const spanWord = document.querySelector(".solution-word");
		spanWord.innerText = solutionWord;

		const wordMeanings = document.querySelectorAll(".word-meaning");
		
		console.log(`${url}${solutionWord}`);

			//fetch the meaning of the word
		fetch(`${url}${solutionWord}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Word not found'); // Throw an error if response is not successful (e.g., 404)
			}
			return response.json();
		})
		.then((data) => {
			let definition = data[0].meanings[0].definitions[0].definition;
			console.log(data);
			console.log("def",definition);
			wordMeanings.forEach(wordMeaning => {
				wordMeaning.innerHTML = definition;
			});
			
		}).catch((error) => {
			wordMeanings.forEach(wordMeaning => {
				// Apply the operation to each element
				wordMeaning.innerHTML = error.message;
			});
		});
	});
};

chooseWord();

// detect keypress (letter, backspace, other)
document.addEventListener('keydown',(e) =>{
	//console.log('keypress: ' + e.key);
	var keycode1 = (e.key ? e.key : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }

	let keypress = lettersPattern.test(e.key.toLowerCase());
	if(currentGuessCount <= 6){
		// if a letter
		if (keypress && currentGuess.dataset.letters.length < 5){
			updateLetters(e.key);
		}
		// if backspace
		else if(e.key == 'Backspace' && currentGuess.dataset.letters.length > 0){
			deleteFromLetters();
		}
		else if(e.key == 'Enter' && currentGuess.dataset.letters.length == 5 
			&& solved == false){
			submitGuess();
		}
	}
	else if(currentGuessCount == 7){
		showSolution();
	}
	
	
});

const showSolution = () =>{
	setTimeout(()=>{
		//alert('Better luck next time!! The solution was ' + solutionWord);
	},500)
	
};

const checkIfGuessComplete = (i) =>{
	if(i==4){
		checkWin();
	}
};

const checkValidity = () => {
    return new Promise((resolve, reject) => {
        fetch(`${url}${currentGuess.dataset.letters}`)
            .then((response) => {
				if(response.status === 504){
					alert("timeput");
					throw new Error('Gateway Timeout');
				}
                if (!response.ok) {
                    throw new Error('Word not found'); // Throw an error if response is not successful (e.g., 404)
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                resolve(true); // Resolve with true if word is found
            })
            .catch((error) => {
                // Handle error
                console.error('Error:', error.message);
				if(!globalWords.includes(currentGuess.dataset.letters)){
					showPopup();
					setTimeout(()=>{
						hidePopup();
					},1500);
					reject(false);
				}else{
					resolve(true);
				}
            });
    });
}

function showPopup() {
    document.querySelector('.popup').classList.add('active');
}

// Hide the popup
function hidePopup() {
    document.querySelector('.popup').classList.remove('active');
}


const submitGuess = () =>{
	let add = 0;

	//console.log('submit guess');
    checkValidity()
        .then((isValid) => {
            if (!isValid) {
                return; 
            }
			// Logic for valid guess
			for (let i = 0; i < 5; i++) {
				//add = add + i * 200;
				//console.log("addition", add);
				(function (i){
					setTimeout(() => {
						//document.addEventListener('keydown', preventDefault); 
						colorTile(i, checkLetter(i));							
					}, i * 150);
				})(i);
				
			}

			if(solutionWord == currentGuess.dataset.letters){
				setTimeout(() => {
					updateKeyboard();
					}, 1800);
				setTimeout(() => {
					wonModal.showModal();
					wonModal.classList.remove('inactive');
				}, 2500);
			}else{
				setTimeout(() => {
					//document.addEventListener('keydown', preventDefault);
					updateKeyboard();
				}, 900);
			}
			//clear the array
			revealAnswer = new Array(5).fill('');
		})
        .catch((error) => {
            // Handle any errors from checkValidity()
            console.error('Error:', error.message);
        });
};


const getStatus= ()=>{
	let keyColor = {};

	//console.log("checking", prevGuess.dataset.letters);

	for(let j = 0; j < prevGuess.dataset.letters.length; j++){
		//console.log(keyColor);
		if(prevGuess.dataset.letters.charAt(j) in keyColor){
			
			if(keyColor[prevGuess.dataset.letters.charAt(j)] == 'absent'
			&& revealAnswer[j] != 'absent'){
				keyColor[prevGuess.dataset.letters.charAt(j)] = revealAnswer[j];
			}
			else if(keyColor[prevGuess.dataset.letters.charAt(j)] == 'present'
			&& revealAnswer[j] != 'absent'){
				keyColor[prevGuess.dataset.letters.charAt(j)] = revealAnswer[j];
			}/** 
			else if(keyColor[prevGuess.dataset.letters.charAt(j)] != 'correct'
			&& revealAnswer[j] == 'correct'){
				keyColor[prevGuess.dataset.letters.charAt(j)] = revealAnswer[j];
			}*/
		}
		else{
			keyColor[prevGuess.dataset.letters.charAt(j)] = revealAnswer[j];
		}
		
	}
	return keyColor;
};

const setColor = (keyColor) =>{
	let keys = Object.keys(keyColor);
	//console.log(keys);
	for(let j = 0; j < keys.length; j++){
		//console.log('test');
		let currentKey = document.querySelector('#letter-' + keys[j]);
		//console.log(currentKey);
		setTimeout(()=>{
			if(currentKey.classList.length > 1){
				if(currentKey.classList.contains('absent') && keyColor[keys[j]] != 'absent'){
					currentKey.classList.replace('absent', keyColor[keys[j]]);
				}
				else if(currentKey.classList.contains('present') && keyColor[keys[j]] != 'absent'){
					currentKey.classList.replace('present', keyColor[keys[j]]);
				}/** 
				else if(!currentKey.classList.contains('correct') && keyColor[keys[j]] == 'correct'){
					
					currentKey.classList.replace('present', keyColor[keys[j]]);
				}*/
			}
			else{
				currentKey.classList.add(keyColor[keys[j]]);
			}
			
		},500);
	}
};

const updateKeyboard = () =>{
	
	let keyColor = getStatus();
	
	if(keyColor.length != 0 ){
		setColor(keyColor);
	}
};


const winMessage = document.querySelector("#win");

const checkWin = () =>{
	prevGuess = document.querySelector('#guess' + currentGuessCount);
	if(solutionWord == currentGuess.dataset.letters){
		// win
		solved = true;
		setTimeout(()=>{
			jumpTiles();
		},500);
	}
	else{
		
		if(currentGuessCount == 6){
			
			setTimeout(()=>{
				lostMessage.classList.remove("inactive");
			},1000);
		}
		currentGuessCount = currentGuessCount + 1;
		currentGuess = document.querySelector('#guess' + currentGuessCount);

		if(currentGuessCount == 2){
			giveUpButton.classList.remove('inactive');
		}
	}
}

const jumpTiles = () =>{
	for(let i = 0; i<5 ; i++){
		setTimeout(()=>{
			let currentTile = document.querySelector('#guess' + currentGuessCount+ 'Tile' + (i + 1));
			currentTile.classList.add('jump');
		}, i*200);
	}
	setTimeout(()=>{
		winMessage.classList.remove('inactive');
	},1100);
};

//Compare guess to solution
// here we need to check we letter in both words
// parameter = letter position in word
const checkLetter = (position) =>{
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solutionWord.charAt(position);
	//console.log(guessedLetter,solutionLetter);
	console.log(position);
	// add all the guess word's check in this array
	if(revealAnswer[position].length !== 0){
		return revealAnswer[position];
	}
	// if letters match return "correct"
	if(guessedLetter == solutionLetter){
		//finalReveal[guessedLetter] = 'correct';
		revealAnswer[position] = 'correct'
		return revealAnswer[position];
	}
	// not a match but letter exists in solution word, then return "present"
	// not a match and letter does not exists in solution word, then return "absent"
	else{
		return checkLetterExists(guessedLetter,position) ? 'present' : 'absent';
	}

};

const checkLetterExists = (letter,position) =>{
	if (solutionWord.includes(letter)){
		let solWordOcc = letterOccurence(solutionWord, letter);
		let guessWordOcc = letterOccurence(currentGuess.dataset.letters, letter);


		if (solWordOcc == guessWordOcc){
			//finalReveal[guessedLetter] = 'present';
			//console.log("guessocc == solocc");
			revealAnswer[position] = 'present';
			return true;
		}
		else if(solWordOcc > guessWordOcc){
					
			//finalReveal[guessedLetter] = 'present';
			//console.log("solWordOcc > guessWordOcc");s
			revealAnswer[position] = 'present';
			return true;
			
		}
		else if(solWordOcc < guessWordOcc){
			//console.log("solWordOcc < guessWordOcc");
			let solIndexes = letterIndices(solutionWord,letter);
			
			//console.log("indexes of occurence "+indexes);
			let correctCounter = 0;
			for(let j = 0; j< solIndexes.length; j++){
				let wordIndex = solIndexes[j];
				if (revealAnswer[wordIndex] == 'correct'){
					correctCounter += 1;
				}
				else if (revealAnswer[wordIndex] == ''){
					//console.log('the letter has not yet revealed');
					if (currentGuess.dataset.letters.charAt(wordIndex) == solutionWord.charAt(wordIndex)){
						//console.log("letter in future are equal");
						revealAnswer[wordIndex] = 'correct';
						correctCounter += 1;
					}
				}
			}

			let guessIndexes = letterIndices(currentGuess.dataset.letters,letter);
			//console.log(guessIndexes);
			//console.log('correctCounter ' + correctCounter);

			if (correctCounter == solIndexes.length){
				//console.log("both counter is equal");
				revealAnswer[position] = 'absent';
				return false;
			}else{
				for(let j = 0; j < guessIndexes.length; j++){
					let wordIndex = guessIndexes[j];
					//console.log("in for loop now with index", wordIndex);
					
					if(wordIndex == position){
						//console.log('when position equals wordindex');
						revealAnswer[wordIndex] = 'present';
					}else{
						revealAnswer[wordIndex] = 'absent';
					}
				};
				
				return true;
			}

		}
	}else{
		// guess letter is absent in the solution word
		//finalReveal[guessedLetter] = 'absent';
		//console.log("absent");
		revealAnswer[position] = 'absent';
		return false;
		//return solutionWord.includes(letter);
	}
	
};

const letterOccurence = (word, letter) => {
    if (typeof word !== 'string') {
        return 0; // Return 0 if word is not a string
    }
    return (word.match(new RegExp(letter, 'g')) || []).length;
};

const letterIndices = (word,letter) => {
	const regex = new RegExp(letter, 'g');
	const matches = [];

	let match;
	while ((match = regex.exec(word)) !== null) {
    	matches.push(match.index);
	}
	return matches;
};

const colorTile = (i, status) =>{
	let tileNum = i + 1;
	flipTile(tileNum,status);
	checkIfGuessComplete(i);
};

const flipTile = (tileNum, status) =>{
	let tile = document.querySelector('#guess' + currentGuessCount +'Tile' + tileNum);
	tile.classList.add('flip-in');
	setTimeout(()=>{
		tile.classList.add(status);
	}, 200);
	setTimeout(()=>{
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	},200);
	setTimeout(()=>{
		tile.classList.remove('flip-out');
	},1000);
	
};


// update "letters"
const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters =  oldLetters + letter;
	currentGuess.dataset.letters = newLetters;

	let currentTile = newLetters.length;
	//console.log('currentTile: ' + currentTile);
	updateTiles(currentTile, letter);
};


// update tile markup
const updateTiles = (tileNumber, letter) =>{
	//console.log('updateTiles(' + tileNumber,letter+ ')' );
	let currentTile = document.querySelector('#guess' + currentGuessCount +'Tile' + tileNumber);
	currentTile.dataset.letter = letter;
	currentTile.innerText = letter;
	currentTile.classList.add('has-letter');
};

// Backspace -- Delete last letter
const deleteFromLetters = () => {
	// remove last letter from data-letters 
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0,-1);
	currentGuess.dataset.letters = newLetters;
	deleteFromTiles(oldLetters.length);

};

// Backspace -- Delete last tile markup
const deleteFromTiles = (tileNumber) => {
	// remove markup from last tile and data-letter
	let currentTile = document.querySelector('#guess' + currentGuessCount +'Tile' + tileNumber);
	currentTile.classList.remove('has-letter');
	currentTile.innerText = '';
	currentTile.dataset.letter = '';
};