This is the first project for the WDI class. It is a browser based tic-tac-toe game.

The game uses Jquery to perform several tasks:
  -Check when a player clicks an empty square and print either X or O depending on whose turn it is.
  -increment a player's score when a win is detected.
  -clear the board when a game is won or ties.
  -create a fixed element in the top left corner with a register/login form when a button is clicked

This site uses AJAX to have a somewhat functioning login/register function
  -upon completing the register or login form with valid information, a new popup will appear:
    -upon successful register, a box with the username and user ID
    -upon successful login, a box with the username, user ID, and token for the session
    -upon un-successful login/register, a box with an error message
