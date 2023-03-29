const canvas = document.querySelector('#canvas'); /*here i call to var in my html */
const game = canvas.getContext('2d'); /*here i say to my canvas the context of my draw */

// function startGame() {
//     // game.fillRect(0,0,300,300) /*is the same function to (clearRect) but this draww */
//     // game.clearRect(80,0,10,50) /*position x,position y,width,height*/ /*clearRect for clear */
//     game.font = '25px Verdana'; /*i here declarate the size and style */
//     game.textAlign = 'end'; /*i here declarate the position about the line */
//     game.fillText('*',20,40) /*the first argument is the text, and the next argument is the position x and y */
// };

window.addEventListener('load',startGame);