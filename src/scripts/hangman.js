define('hangman',
  function () {
    var config = {
      message_element: null,
      letters_element: null,
      start_element: null,
      reset_element: null,
      input_element: null
    }

    var messages = {
      begin: 'Press start to begin',
      guess: 'Enter a letter',
      win: 'You Win!',
      lose: 'You Lost :('
    }

    var lives = 5

    // simply encoded strings, enough to deter a casual source browse, but not enough to stop someone determined
    // without a server to store state away from the user real security is impossible
    var words = ['YW50aWRpc2VzdGFibGlzaG1lbnRhcmlhbmlzbQ==', 'YmlrZXM=', 'Y2hlZXNlYnVyZ2Vycw==', 'Y3JhY2tlcmphY2s=', 'ZnVzaW9u', 'bWFtbWFsaWFu']

    var current_word

    var letter_states = []

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
      current_word = randomWord()
      setMessage(messages.guess)
      hide(config.start_element)
      show(config.reset_element)

      // create the placeholder elements for unknown letters
      for (var i = 0; i < atob(current_word).length; i++) {
        letter_states.push({letter: atob(current_word)[i], guessed: false})
        var li = document.createElement('li')
        li.appendChild(document.createTextNode('_'))
        config.letters_element.appendChild(li)
      }
    }

    var reset = function () {
      lives = 5
      current_word = null
      letter_states = []
      clearLetters()
      setMessage(messages.begin)
      hide(config.reset_element)
      show(config.start_element)
    }

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
      for (var i = 0; i < letter_states.length; i++) {
        if (letter_states[i].letter === letter) {
          letter_states[i].guessed = true
          config.letters_element.children[i].innerHTML = letter
        }
      }
    }

    var loseLife = function () {
      lives = lives - 1
      setMessage('Lives left: ' + lives)
    }

    var guess = function (letter) {
      if (letter.match(/[a-z]/i)) {
        if (atob(current_word).indexOf(letter) !== -1) {
          fillInLetter(letter)
        } else {
          loseLife()
        }
      }
    }

    var init = function () {
      bindInputs()
      hide(config.reset_element)
      setMessage(messages.begin)
    }

    return {
      config: config,
      wordLength: 6,
      init: init
    }
  }
)
