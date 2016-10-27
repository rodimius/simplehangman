#A simple hangman game

Simple enough to make without a framework. Javascript compiled with webpack
into the `/build` folder to allow me to use modules without a runtime library.

##To build
Run `npm run webpack` in the root of the repository.

Linted using [Standard](http://standardjs.com).

Run `npm run standard` in the root of the repository to lint.

The words used in the game are antidisestablishmentarianism, bikes,
cheeseburgers, crackerjack, fusion, and mammalian, they are obfuscated in the source to prevent casual cheating.

##To run
Run `npm run http-server` in the root directory of the repository. You will then be able to browse to `localhost:8080`.

##Instructions

Begin by pressing start, a new word will be selected at random.

Type a letter into the text box and press enter, this counts as a guess.

If you guess wrong, you lose a life.

You start the game with 5 lives.

When you have no lives left you lose the game.

If you guess all of the letters you win the game.
