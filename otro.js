const canvas = document.querySelector('#canvas');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

function setCanvasSize() {
    if (window.innerWidth < window.innerHeight) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    };
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementSize =  canvasSize / 10

    console.log({canvasSize,elementSize})
    paintCanvas();
};
function paintCanvas() {
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    for (let row = 1; row <= 10; row++) {
        for(let column = 1 ; column <= 10 ; column++){
            game.fillText('*',elementSize * column,elementSize * row);
        }
    }/*this cicle *for* iterates about the row creating the teen rows, and add columns */
};
window.addEventListener('resize',setCanvasSize);
window.addEventListener('load',setCanvasSize);