var words = ["hello", "cat", "peanut", "exclusive", "create", "lost", "helicopter", "pretend", "honesty", "party"];
var word = words[Math.floor(Math.random() * words.length)];
var guesses = []

var currentGame = document.getElementById("current-game");
var gameResult = document.getElementById("game-result");
var gameOver = document.getElementById("game-over");

showGuess(word, guesses)
gameOver.style.display = "none";

function showGuess(word, guesses) {
  var wordLetters = word.split("");
  var result = [];
	for (var i = 0; i < wordLetters.length; i ++) {
		if (guesses.includes(wordLetters[i])) {
			result.push(wordLetters[i]);
		} else {
			result.push("_");
		}
	}
	result = result.join(" ");
	document.getElementById("word").innerHTML = `${result}`;
	return result
}


function checkGuess() {
  event.preventDefault()
  var userGuess = document.getElementById("user-guess");
  var correctWord = document.getElementById("correct-word");
  if (userGuess.value.split("").length > 1 || userGuess.value == "") {
    document.getElementById("wrong-input").innerHTML = "Please input one letter!";
    return
  } else {
    guesses.push(userGuess.value);
    if (wrongGuessCount(word, guesses) === 7) {
      currentGame.style.display = "none";
      gameOver.style.display = "block";
      gameResult.innerHTML = "You lost!";
      correctWord.innerHTML = `The correct word was: ${word}`;
    	return;
    } else if (isWinner(word, guesses)) {
      currentGame.style.display = "none";
      gameOver.style.display = "block";
      gameResult.innerHTML = "You win!";
      correctWord.innerHTML = `The correct word was: ${word}`;
      return;
    } else {
      document.getElementById("wrong-input").innerHTML = "";
      document.getElementById("all-guesses").innerHTML = `You have guessed: ${guesses.join(" ")}`;
      document.getElementById("user-guess").value = "";
      showGuess(word, guesses)
    }
  }
}

function wrongGuessCount(word, guesses) {
	var wrongGuesses = 0;
	guesses.map(function(letter) {
		if (word.indexOf(letter) == -1) {
			wrongGuesses += 1;
		}
	});
	document.getElementById("guesses-number").innerHTML = `${7 - wrongGuesses}`;
  document.getElementById("hangman").src = `${wrongGuesses + 1}.jpg`
	return wrongGuesses;
}


function isWinner(word, guesses) {
	var wordLetters = word.split("");
  var result = []
	for (var i = 0; i < wordLetters.length; i ++) {
		if (guesses.includes(wordLetters[i])) {
			result.push(wordLetters[i]);
		}
	}
	result = result.join("");
	if (result == word) {
		return true
	} else {
		return false
	}
}

function playAgain() {
  location.reload()
}
