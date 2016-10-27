/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var hangman = __webpack_require__(1)

	hangman.config.message_element = document.getElementById('hangman_message')
	hangman.config.letters_element = document.getElementById('hangman_letters')
	hangman.config.start_element = document.getElementById('hangman_start')
	hangman.config.reset_element = document.getElementById('hangman_reset')
	hangman.config.input_element = document.getElementById('hangman_input')

	hangman.init()


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var config = {
	      message_element: null,
	      letters_element: null,
	      start_element: null,
	      reset_element: null,
	      input_element: null
	    }

	    var messages = {
	      begin: 'Press start to begin',
	      guess: 'Enter a letter, you have 5 lives',
	      win: 'You Win!',
	      lose: 'You Lost :('
	    }

	    var lives = 5

	    // simply encoded strings, enough to deter a casual source browse, but not enough to stop someone determined
	    // without a server to store state away from the user real security is impossible
	    var words = ['YW50aWRpc2VzdGFibGlzaG1lbnRhcmlhbmlzbQ==', 'YmlrZXM=', 'Y2hlZXNlYnVyZ2Vycw==', 'Y3JhY2tlcmphY2s=', 'ZnVzaW9u', 'bWFtbWFsaWFu']

	    var currentWord

	    var letterStates = []

	    var setMessage = function (message) {
	      config.message_element.innerHTML = message
	    }

	    var show = function (element) {
	      element.style.display = 'block'
	    }

	    var hide = function (element) {
	      element.style.display = 'none'
	    }

	    var clearLetters = function () {
	      while (config.letters_element.firstChild) {
	        config.letters_element.removeChild(config.letters_element.firstChild)
	      }
	    }

	    var randomWord = function () {
	      return words[Math.floor(Math.random() * words.length)]
	    }

	    var start = function () {
	      currentWord = randomWord()
	      setMessage(messages.guess)
	      hide(config.start_element)
	      show(config.reset_element)
	      show(config.input_element)

	      // create the placeholder elements for unknown letters
	      for (var i = 0; i < atob(currentWord).length; i++) {
	        letterStates.push({letter: atob(currentWord)[i], guessed: false})
	        var li = document.createElement('li')
	        li.appendChild(document.createTextNode('_'))
	        config.letters_element.appendChild(li)
	      }
	    }

	    var reset = function () {
	      lives = 5
	      currentWord = null
	      letterStates = []
	      clearLetters()
	      setMessage(messages.begin)
	      hide(config.reset_element)
	      hide(config.input_element)
	      show(config.start_element)
	    }

	    // set up all user interaction
	    var bindInputs = function () {
	      config.start_element.addEventListener('click', start)
	      config.reset_element.addEventListener('click', reset)
	      config.input_element.addEventListener('keydown', function (e) {
	        if (e.keyCode === 13) {
	          guess(config.input_element.value)
	          config.input_element.value = ''
	        }
	      })
	    }

	    var fillInLetter = function (letter) {
	      var guessedLetters = 0
	      for (var i = 0; i < letterStates.length; i++) {
	        if (letterStates[i].letter === letter) {
	          letterStates[i].guessed = true
	          // update display to fill in placeholder
	          config.letters_element.children[i].innerHTML = letter
	        }
	        // update guessed count
	        if (letterStates[i].guessed === true) { guessedLetters++ }
	      }

	      // victory condition
	      if (guessedLetters === letterStates.length) {
	        setMessage(messages.win)
	        hide(config.input_element)
	      }
	    }

	    var loseLife = function () {
	      lives = lives - 1
	      // loss condition
	      if (lives === 0) {
	        setMessage(messages.lose)
	        hide(config.input_element)
	      } else {
	        setMessage('Lives left: ' + lives)
	      }
	    }

	    var guess = function (letter) {
	      if (letter.match(/[a-z]/i)) {
	        if (atob(currentWord).indexOf(letter) !== -1) {
	          fillInLetter(letter)
	        } else {
	          loseLife()
	        }
	      }
	    }

	    var init = function () {
	      bindInputs()
	      hide(config.reset_element)
	      hide(config.input_element)
	      setMessage(messages.begin)
	    }

	    return {
	      config: config,
	      wordLength: 6,
	      init: init
	    }
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }
/******/ ]);