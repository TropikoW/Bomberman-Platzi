const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btns = document.querySelector('#btns');
const btnUp = document.querySelector('#up');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');
const livesHTML = document.querySelector('#livesHTML');
const time = document.querySelector('#time');
const record = document.querySelector('#records');
const pResult = document.querySelector('#result');
const messages = document.querySelector('#messages');
const email = document.querySelector('#email');

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
const trophyPosition = {
    x : undefined,
    y : undefined
};
let enemyPositions = [];

let timeStart;
let timePlayer;
let timeInterval;
let canvasSize;
let elementSize;
let lives = 3;
let level = 0;
let records = undefined;
let messageInDoor = false;

function setCanvasSize() {

    /*x game.fillRect(0,0,100,100); left,rigth || y up,down */ /*number look like pixels */

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    };

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    
    elementSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
};

function startGame() {

    showLives();
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    };

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTimes,100);
        showRecords();
    };

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
        startGame();
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
    startGame();
};

function gameWin(event) {
    clearInterval(timeInterval);
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
    email.innerText = '¿Do you want send me a feedback?, ¡send me to email!, jovannypersonal@gmail.com';
    

    if(recordTime) {
        if(recordTime > playerTime) {
            localStorage.setItem('record_time',playerTime);
            pResult.innerHTML = ('You have managed to beat the record!');
        } else {
            pResult.innerHTML = ('You have not managed to beat the record');
        }
    } else {
        localStorage.setItem('record_time',playerTime);
        pResult.innerHTML = ('Congratulation!, you started with a new record!');
    };
    showButtonReload();
    disabledButtons();
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

function showRecords() {
    record.innerHTML = localStorage.getItem('record_time');
};

function showButtonReload() {
    const containerButton = document.createElement('div');
    const reloadButton = document.createElement('button');
    const pButton = document.createElement('p');
    pButton.innerText = 'Reload';
    btns.appendChild(containerButton);
    containerButton.appendChild(reloadButton);
    reloadButton.appendChild(pButton);
    containerButton.setAttribute('id','buttonReload');
    const buttonReload = document.querySelector('#buttonReload');
    buttonReload.addEventListener('click',reloadPage);
};

function reloadPage() {
    location.reload();
};

function disabledButtons(event) {
    btnUp.disabled = true;
    btnRight.disabled = true;
    btnLeft.disabled = true;
    btnDown.disabled = true;
};

window.addEventListener('keydown',moveByKeys);

function moveByKeys(event) {
    if(event.key == 'ArrowUp') moveUp(); /*the event.key listen the events of clicks in the keyboard */
     else if(event.key == 'ArrowRight') moveRight();
     else if(event.key == 'ArrowLeft') moveLeft();
     else moveDown();
};
btnUp.addEventListener('click',moveUp);
function moveUp() { /*with this funcion move the user to up */
    if(Math.floor(playerPosition.y) <= elementSize) {
        console.log({'out': playerPosition,elementSize});
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
};
btnRight.addEventListener('click',moveRight);
function moveRight() { /*with this funcion move the user to right */
    const positionPlayer = Number(playerPosition.x.toFixed(2));
    if((positionPlayer + elementSize) > canvasSize) {
        console.log({'out': playerPosition,elementSize,canvasSize,positionPlayer});
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
};
btnLeft.addEventListener('click',moveLeft);
function moveLeft() { /*with this funcion move the user to left */
    const positionPlayer = playerPosition.x.toFixed(2);
    if(playerPosition.x.toFixed(1) <= elementSize) {
        console.log({'out': playerPosition,elementSize,canvasSize,positionPlayer});
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
};
btnDown.addEventListener('click',moveDown);
function moveDown() { /*with this funcion move the user to down */
    if(playerPosition.y >= canvasSize) {
        console.log({'out': playerPosition,elementSize,canvasSize});
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
};

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);