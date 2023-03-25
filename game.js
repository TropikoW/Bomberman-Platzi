const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');

const playerPosition = {
    x: undefined,
    y: undefined,
}

let canvasSize;
let elementSize;

function setCanvasSize() {

    /*x game.fillRect(0,0,100,100); left,rigth || y up,down */ /*number look like pixels */

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    };

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    
    elementSize = canvasSize / 10;
    window.innerWidth;

    console.log({canvasSize,elementSize});
    stardGame();
};

function stardGame() {

    game.font = (elementSize - 10) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');  /*.trim delete the space white and .split divides the array in sub arrays more specifid in sub chains */
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({'map':map, 'mapRows':mapRows,'mapRowCols':mapRowCols});

    game.clearRect(0,0,canvasSize,canvasSize); /*with this clearRect i keep clear the before position*/
    mapRowCols.forEach((row,rowI)=>{ /*here i sign up in the row */
        row.forEach((col,colI)=>{/*here i sign up in the row */
            const emoji = emojis[col]; /*here add the emoji of column and row */
            const posX = elementSize * (colI + 1); /*here calculate the position in x and i add one position for start in the end of canvas*/
            const posY = elementSize * (rowI + 1); /*here calculate the position in y and i add one position for start in the end of canvas */
            game.fillText(emoji,posX,posY); /*with the fillText i can draw */

            if(col == 'O'){ /*with this validation i can see if the column has anywhere update of move */
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX; /*if do not has anywhere update position ...update the position in x*/
                    playerPosition.y = posY; /*if do not has anywhere update position ...update the position in x */
                    console.log({playerPosition,posX,posY});
                }
            }
        });
    });
    movePlayer();
    // for(let row = 1 ; row <= 10 ; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize * col,elementSize * row);
    //     }
    // };
};

function movePlayer() {
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
};

window.addEventListener('keydown',moveByKeys);

function moveByKeys(event) {
    if(event.key == 'ArrowUp') moveUp(); /*the event.key listen the events of clicks in the keyboard */
     else if(event.key == 'ArrowRight') moveRight();
     else if(event.key == 'ArrowLeft') moveLeft();
     else moveDown();
};
btnUp.addEventListener('click',moveUp);
function moveUp() {
    console.log('i want move to up')

    if((playerPosition.y - elementSize) < 0) {
        console.log('out')
    } else {
        playerPosition.y -= elementSize;
        stardGame();
    };
};
btnRight.addEventListener('click',moveRight);
function moveRight() {
    console.log('i want move to right');
    if(playerPosition.x > 500) {
        console.log('out')
    } else {
        playerPosition.x += elementSize;
        stardGame()
    }
};
btnLeft.addEventListener('click',moveLeft);
function moveLeft() {
    console.log('i want move to left')
    if((playerPosition.x - elementSize) < 53) {
        console.log('out')
    } else {
        playerPosition.x -= elementSize;
        stardGame()
    };
};
btnDown.addEventListener('click',moveDown);
function moveDown() {
    console.log('i want to move down')
    if((playerPosition.y - elementSize) > 450) { /*with this validation i test if the position is major to 450px */
        console.log('out');
    } else {
        playerPosition.y += elementSize;
        stardGame()
    };
};

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);