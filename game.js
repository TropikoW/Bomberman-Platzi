const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');
const livesHTML = document.querySelector('#livesHTML');
const time = document.querySelector('#time');

const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x : undefined,
    y : undefined,
};
const doorPosition = {
    x : undefined,
    y : undefined,
};
let enemyPositions = [];

let timeStart;
let timePlayer;
let timeInterval;
let canvasSize;
let elementSize;
let lives = 3;
let level = 0;
let messageInDoor = false;

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

    stardGame();
};

function stardGame() {

    showLives();
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    }

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTimes,100);
    }

    const mapRows = map.trim().split('\n');  /*.trim delete the space white and .split divides the array in sub arrays more specifid in sub chains */
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize); /*with this clearRect i keep clear the before position*/
    mapRowCols.forEach((row,rowI)=>{ /*here i sign up in the row */
        row.forEach((col,colI)=>{/*here i sign up in the col */
            const emoji = emojis[col]; /*here add the emoji of column and row */
            const posX = elementSize * (colI + 1); /*here calculate the position in x and i add one position for start in the end of canvas*/
            const posY = elementSize * (rowI + 1); /*here calculate the position in y and i add one position for start in the end of canvas */

            if(col == 'O'){ /*with this validation i can see if the column has anywhere update of move */
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX; /*if do not has anywhere update position ...update the position in x*/
                    playerPosition.y = posY; /*if do not has anywhere update position ...update the position in x */
                }
                doorPosition.x = posX;
                doorPosition.y = posY;
            } else if(col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X') { /*here i save the position of all obstacle */
                enemyPositions.push({
                    x : posX,
                    y : posY,
                });
            };
            game.fillText(emoji,posX,posY); /*with the fillText i can draw */
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
    const giftCollisionX = giftPosition.x.toFixed(3) === playerPosition.x.toFixed(3);
    const giftCollisionY = giftPosition.y.toFixed(3) === playerPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        levelWin();
        stardGame();
    };

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);

        return enemyCollisionX && enemyCollisionY;
    });

    if(enemyCollision) {
        levelFail();
    };

    const doorCollisionX = doorPosition.x.toFixed(3) === playerPosition.x.toFixed(3);
    const doorCollisionY = doorPosition.y.toFixed(3) === playerPosition.y.toFixed(3);
    const doorCollision = doorCollisionX && doorCollisionY;

    if (doorCollision) {
        if(messageInDoor == false) {
            console.log('Good luck');
            messageInDoor = true;
        } else if(messageInDoor == true) {
            console.log('Do you want to go at the previous level back?');
        };
    };

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
};

function levelWin() {
    console.log('Woww, you passed to next level');
    level++;
};

function levelFail() {
    console.log('Stop, you crashed with some obstacle!');
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    lives--;

    if(lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    
    console.log(lives);
    stardGame();
};

function gameWin() {
    clearInterval(timeInterval);
    console.log('Congratulations!, you finish the game!')
};

function showLives() {
    const heartArray = Array(lives).fill(emojis['HEART']);
    livesHTML.innerHTML = '';
    heartArray.forEach(heart => {
        livesHTML.append(heart)
    })
    // livesHTML.innerHTML = heartArray;
};

function showTimes() {
    time.innerHTML = Date.now() - timeStart;
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

    if(window.innerWidth > window.innerHeight) {
        if((playerPosition.y - elementSize) < elementSize - 53) {
            console.log('out',elementSize)
        } else {
            playerPosition.y -= elementSize;
            stardGame();
        };
    } else if(window.innerHeight > window.innerWidth) {
        if((playerPosition.y - elementSize) < elementSize) {
            console.log('out',elementSize)
        } else {
            playerPosition.y -= elementSize;
            stardGame();
        };
    }
};
btnRight.addEventListener('click',moveRight);
function moveRight() {
    console.log('i want move to right');

    if(window.innerHeight > window.innerWidth) {
        if((playerPosition.x - elementSize) > elementSize + 220) {
            console.log('out',elementSize)
        } else {
            playerPosition.x += elementSize;
            stardGame()
        }
    } else {
        if((playerPosition.x - elementSize) > elementSize + 400) {
            console.log('out',elementSize)
        } else {
            playerPosition.x += elementSize;
            stardGame()
        }
    };
};
btnLeft.addEventListener('click',moveLeft);
function moveLeft() {
    console.log('i want move to left')
    if(window.innerHeight > window.innerWidth) {
        if((playerPosition.x - elementSize) < elementSize) {
            console.log('out',elementSize)
        } else {
            playerPosition.x -= elementSize;
            stardGame()
        };
    } else {
        if((playerPosition.x - elementSize) < elementSize) {
            console.log('out',elementSize)
        } else {
            playerPosition.x -= elementSize;
            stardGame()
        };
    };
};
btnDown.addEventListener('click',moveDown);
function moveDown() {
    console.log('i want to move down')
    if(window.innerHeight > window.innerWidth) {
        if((playerPosition.y - elementSize) > elementSize + 210) {
            console.log('out',elementSize);
        } else {
            playerPosition.y += elementSize;
            stardGame();
        };
    } else if(window.innerWidth > window.innerHeight) {
        if((playerPosition.y - elementSize) > elementSize + 400) {
            console.log('out',elementSize)
        } else {
            playerPosition.y += elementSize;
            stardGame();
        };
    };
};

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);