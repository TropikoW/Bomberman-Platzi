const canvas = document.querySelector('#canvas'); /*here i call to var in my html */
const game = canvas.getContext('2d'); /*here i say to my canvas the context of my draw */

// function startGame() {
//     // game.fillRect(0,0,300,300) /*is the same function to (clearRect) but this draww */
//     // game.clearRect(80,0,10,50) /*position x,position y,width,height*/ /*clearRect for clear */
//     game.font = '25px Verdana'; /*i here declarate the size and style */
//     game.textAlign = 'end'; /*i here declarate the position about the line */
//     game.fillText('*',20,40) /*the first argument is the text, and the next argument is the position x and y */
// };
let canvasSize; /*this var used for get the size of canvas*/
let elementSize; /*this var used for get the size of elements */

const emojis={
    '-':' ',
    'O':'🚪',
    'X':'💣',
    'I':'🎁',
    'PLAYER':'💀',
    'BOMB_COLLISION':'🔥',
    'GAME_OVER':'👎',
    'WIN':'🏆',
  };
  
const maps=[];
  
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`
);

maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
`
);
  
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`
);

function startGame() {
    game.font = elementSize + 'px Verdana'; /*is obligatory that before of px place the font */
    game.textAlign = 'end'; /*here align my object to the line end */
    // game.fillText('*',elementSize,elementSize); /*first argument = the object, second argument = the position x, third argument = position y */

    const mapRow = maps[0].trim().split('\n'); /*here eliminate the space empty and line breaks */
    const mapRowCols = mapRow.map(col => col.trim().split('')); /*here eliminate the same of up, but this time in all lines */
    console.log({'map row':mapRow,'mapRowCol': mapRowCols,'map row cols[0]' :mapRowCols[0],'map row cols[0][0]' :mapRowCols[0][0]});

    // for(let row = 1; row <= 10 ; row++) { /*here initialized an cicled *for*, this cicle is for multiply for 10 the object */
    //     for(let col = 1 ; col <= 10 ; col++) { /*here i get the cols for each the rows */
    //         game.fillText(emojis[mapRowCols[row -1][col -1]],elementSize * col,elementSize * row); /*here i draw each of the drawing of obstacle*/
    //     };
    // };
    /*this forEach is same to up, the forEach run the arrays of mapRowCols for each of row and index row, column and index column, and i get the position x and y, before i draw in the canvas all this and done */
    mapRowCols.forEach((row,rowI)=>{ /*start the forEach with row*/
        row.forEach((col,colI)=>{  /*before start other forEach, this time with the cols */
            const emoji = emojis[col]; /*in this var i get the emojis fo col */
            const posX = elementSize * (colI +1); /*here i get the position x */
            const postY = elementSize * (rowI +1); /*here i get the position y */
            game.fillText(emoji,posX,postY); /*here i draw the emojis and put the position x and y */
        });
    });
};
function setCanvasSize() {
    if(window.innerWidth > window.innerHeight) { /*here validate if the width is major to height */
        canvasSize = window.innerWidth * 0.4; /*here calculate the width of laptop screen and multiply for 0.4 */
    } else if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerHeight * 0.4;
    }
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    // canvas.setAttribute('width', window.innerWidth * 0.8) /*with this operation i get the property width of canvas(var of html) and multiply for 0.8px everytime that the width update */
    // canvas.setAttribute('height', window.innerHeight * 0.4) /*with this operation i get the property height of canvas(var of html) and multiply for 0.4px everytime that the height update */

    elementSize = canvasSize/10; /*here get the size of the var canvasSize and divide by ten */
    console.log({canvasSize,elementSize});

    startGame();
};

window.addEventListener('load',setCanvasSize); /*with this line chargue the function setCanvasSize when is all load in the html */
window.addEventListener('resize',setCanvasSize); /*with this line i listen all the resize that get me the navegator*/