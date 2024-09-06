import './style.css'

// check if the input is empty, not numbers and a valid string
// Show the result
// Error handling
// CDN safety for input
// Decrease speed?
// Change 300 to variable for the game board size -> easier to change
// Delete unused code
// Make the game board size dynamic or at least bigger

// Define constants
const GRID_SIZE = 20 // each square is 20x20 pixels
const GAME_SIZE = 400
const GRID_WIDTH = GAME_SIZE / GRID_SIZE // 400 / 20 = 20 squares

// Global variables
let playerName = ''
let snake = [{ x: 10, y: 10 }] // Start position for the snake
let food = {}
let dx = 1 // Direction x, (1 = right, -1 = left)
let dy = 0 // Direction y (1 = down, -1 = up)
let gameLoop
let gameBoard
let currentLetterIndex = 0
let score = 0
let highScore = 0
let newFoodPosition

// Define the elements
const nameForm = document.querySelector('#nameForm')
const nameInput = document.querySelector('#nameInput')
const resultDiv = document.querySelector('#result')
const enterName = document.querySelector('#nameInputField')
gameBoard = document.querySelector('#gameBoard')
const scoreBoard = document.querySelector('#scoreBoard')
const currentScoreElement = document.querySelector('#currentScore')
const highScoreElement = document.querySelector('#highScore')

// Add this function to sanitize the input
function sanitizeInput(input) {
  // Remove any characters that aren't letters, spaces, or accented characters
  return input.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
}

// Modify your form submission event listener
nameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  playerName = nameInput.value.trim() // Trim whitespace
  playerName = sanitizeInput(playerName) // Sanitize input

  if (playerName && playerName.length <= 20) {
    // Check length again
    startGame()
  } else {
    alert('Ange ett giltigt namn, max 20 bokstäver')
  }
})

// ************************* Start the game *************************
function startGame() {
  nameForm.classList.add('hidden')
  gameBoard.classList.remove('hidden')
  scoreBoard.classList.remove('hidden')
  enterName.classList.add('hidden')
  // Show message about how to play the game
  resultDiv.style.display = 'block'
  resultDiv.innerHTML = `<p>Hej ${playerName}! Använd piltangenterna för att styra ormen och "moffa upp" ditt namn.</p>`

  updateScore()

  createFood()
  // Set how often the snake should move
  gameLoop = setInterval(moveSnake, 100)
  document.addEventListener('keydown', changeDirection)
}

// ************************* Check if the food is overlapping the snake *************************
function isOverlappingSnake(position) {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  )
}

// ************************* Create the food-element *************************
function createFoodElement(x, y, letter) {
  // Create a div-element for the food
  const foodElement = document.createElement('div')

  // Add class to the food-element
  foodElement.className =
    'absolute bg-red-500 flex items-center justify-center text-white font-bold text-base'

  // Set size and position with style (Tailwind does not support exact pixel values)
  foodElement.style.width = `${GRID_SIZE}px`
  foodElement.style.height = `${GRID_SIZE}px`
  foodElement.style.left = `${x * GRID_SIZE}px`
  foodElement.style.top = `${y * GRID_SIZE}px`

  // Add the letter to the food-element
  foodElement.textContent = letter

  // Add Id to the food-element
  foodElement.id = 'food'
  return foodElement
}

// ************************* Append the food-element to the game board *************************
function createFood() {
  if (currentLetterIndex === playerName.length) {
    currentLetterIndex = 0
  }

  do {
    food = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_WIDTH),
      letter: playerName[currentLetterIndex],
    }
  } while (isOverlappingSnake(food))

  // Create the food element and append it to the game board
  const foodElement = createFoodElement(food.x, food.y, food.letter)
  gameBoard.appendChild(foodElement)

  currentLetterIndex++
}

// ************************* Move the snake *************************
function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  }

  if (checkCollision(head)) {
    endGame()
    return
  }

  // Add the new head to the snake, in the beginning of the array
  snake.unshift(head)

  // Check if the snake has eaten the food - if the head is on the same position as the food - if so remove the food, else remove the last element in the snake. This illustrates the snake moving.
  if (head.x === food.x && head.y === food.y) {
    document.querySelector('#food').remove()
    score++
    updateScore()
    createFood()
  } else {
    snake.pop()
  }

  updateGameBoard()
}

// ************************* Update the game board - Draw the snake and food *************************
function updateGameBoard() {
  // Clear the game board
  gameBoard.innerHTML = ''

  // Draw the snake
  snake.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.className = 'absolute bg-gradient-2'
    snakeElement.style.width = `${GRID_SIZE}px`
    snakeElement.style.height = `${GRID_SIZE}px`
    snakeElement.style.left = `${segment.x * GRID_SIZE}px`
    snakeElement.style.top = `${segment.y * GRID_SIZE}px`
    gameBoard.appendChild(snakeElement)
  })

  // Draw the food (letter)
  const foodElement = createFoodElement(food.x, food.y, food.letter)
  gameBoard.appendChild(foodElement)
}

// ************************* Update the score *************************
function updateScore() {
  currentScoreElement.textContent = `Poäng: ${score}`
  if (score > highScore) {
    highScore = score
    highScoreElement.textContent = `Highscore: ${highScore}`
  }
}

// ************************* Change direction *************************
function changeDirection(e) {
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const UP_KEY = 38
  const DOWN_KEY = 40

  const keyPressed = e.keyCode

  if (keyPressed === LEFT_KEY && dx === 0) {
    dx = -1
    dy = 0
  }
  if (keyPressed === UP_KEY && dy === 0) {
    dx = 0
    dy = -1
  }
  if (keyPressed === RIGHT_KEY && dx === 0) {
    dx = 1
    dy = 0
  }
  if (keyPressed === DOWN_KEY && dy === 0) {
    dx = 0
    dy = 1
  }
}

// ************************* Check if the snake has hit something *************************
function checkCollision(head) {
  // Check if the snake has hit the border
  if (
    head.x < 0 ||
    head.x >= GRID_WIDTH ||
    head.y < 0 ||
    head.y >= GRID_WIDTH
  ) {
    return true
  }

  // Check if the snake has hit itself
  return snake.some((segment, index) => {
    if (index === 0) return false // Ignore the head
    return segment.x === head.x && segment.y === head.y
  })
}

// ************************* End the game *************************
function endGame() {
  clearInterval(gameLoop)
  document.removeEventListener('keydown', changeDirection)

  showGameOverMessage()

  // Show name input form again
  // nameForm.classList.remove('hidden')
  // gameBoard.classList.add('hidden')
  // scoreBoard.classList.add('hidden')
  // resultDiv.style.display = 'none'
  // enterName.classList.remove('hidden')
}

// ************************* Show Game Over Message *************************
function showGameOverMessage() {
  const gameOverDiv = document.createElement('div')
  gameOverDiv.className =
    'absolute inset-0 flex items-center justify-center shadow-game-over'

  const messageContainer = document.createElement('div')
  messageContainer.className =
    'w-full h-full bg-custom-gradient flex flex-col items-center justify-center text-center'

  const gameOverTitle = document.createElement('h2')
  gameOverTitle.className = 'text-6xl font-bold text-white mb-6 font-viaoda'
  gameOverTitle.textContent = 'GAME OVER'

  const scoreMessage = document.createElement('p')
  scoreMessage.className = 'text-2xl text-white mb-6 font-viaoda'
  scoreMessage.textContent = `Din poäng: ${score}`

  const playAgainBtn = document.createElement('button')
  playAgainBtn.className =
    'px-6 py-3 bg-white text-gradient-1 rounded-full hover:bg-gradient-5 hover:text-white transition-colors duration-300 text-xl font-viaoda shadow-md hover:shadow-lg transform hover:scale-105 transition-transform'
  playAgainBtn.textContent = 'Spela igen'
  playAgainBtn.addEventListener('click', restartGame)

  messageContainer.appendChild(gameOverTitle)
  messageContainer.appendChild(scoreMessage)
  messageContainer.appendChild(playAgainBtn)
  gameOverDiv.appendChild(messageContainer)

  gameBoard.appendChild(gameOverDiv)
}

// ************************* Restart the game *************************
function restartGame() {
  // Clear the game board
  gameBoard.innerHTML = ''

  // Reset game state
  snake = [{ x: 10, y: 10 }]
  dx = 1
  dy = 0
  score = 0
  currentLetterIndex = 0

  // Start the game again
  startGame()
}
