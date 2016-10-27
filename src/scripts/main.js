var hangman = require('./hangman.js')

hangman.config.message_element = document.getElementById('hangman_message')
hangman.config.letters_element = document.getElementById('hangman_letters')
hangman.config.start_element = document.getElementById('hangman_start')
hangman.config.reset_element = document.getElementById('hangman_reset')
hangman.config.input_element = document.getElementById('hangman_input')

hangman.init()
