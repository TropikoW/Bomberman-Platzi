## Getting Started

### 1. HTML Variable Declaration

- The `canvas` constant is used to reference the HTML canvas element.
- The `game` constant declares the game context, specifying its dimensions.
- Buttons (`btnUp`, `btnLeft`, `btnRight`, `btnDown`) constants reference HTML buttons.

### 2. Object and Array Declaration

- The `playerPosition` constant declares an object to store the player's position and defines the initial position.
- The `giftPosition` constant declares an object with coordinates similar to `playerPosition`.
- The `enemiesPosition` array, initialized as empty, stores enemy object positions.
- The `canvasSize` and `elementsSize` variables are declared to manage canvas and element sizes.

### 3. Function Definitions

#### setCanvasSize()

- Validates whether `innerHeight` is greater than `innerWidth` and sets the `canvasSize` variable accordingly.
- Sets the canvas width and height using `canvas.width` and `canvas.height`.
- Initializes `elementsSize` based on `canvasSize` and calls the `startGame` function.

#### startGame()

- Sets font properties for the game context.
- Initializes the `map` constant using an array from the "MAPS.JS" file.
- Processes and cleans up `mapRow` and `mapRowCols` to prepare for the game.
- Clears the game frame using `clearRect`.
- Iterates through rows and columns, handling symbols and updating positions.
- Draws emojis on the canvas based on the processed map.
- Calls the `movePlayer` function.

#### movePlayer()

- Declares three functions (`giftCollisionX`, `giftCollisionY`, `giftCollision`) to handle collisions.
- Checks if the gift collides with the player using the declared functions.
- Outputs a message in the console if a collision occurs.
- Draws the "PLAYER" symbol on the canvas at the specified position.
