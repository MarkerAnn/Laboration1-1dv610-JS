import './style.css'

// check if the input is empty, not numbers and a valid string
// Show the result
// Error handling
// CDN safety for input
// Add a loader
// Add a reset button
// Take care of the edge cases
// Handle the last letter
// Decrease speed?
// Center GameBoard
// Delete "Skriv ditt namn"
// Change 300 to variable for the game board size -> easier to change

// Global variables
let playerName = ''
let snake = [{ x: 150, y: 150 }] // Start position for the snake
let food = {}
let dx = 10 // Direction x, the snake moves 10px at a time at start
let dy = 0 // Direction y
let gameLoop
let gameBoard
let currentLetterIndex = 0
let score = 0
let highScore = 0

// Define the elements
const nameForm = document.querySelector('#nameForm')
const nameInput = document.querySelector('#nameInput')
const resultDiv = document.querySelector('#result')
const enterName = document.querySelector('#nameInputField')
const appDiv = document.querySelector('#app')
gameBoard = document.querySelector('#gameBoard')
const scoreBoard = document.querySelector('#scoreBoard')
const currentScoreElement = document.querySelector('#currentScore')
const highScoreElement = document.querySelector('#highScore')

// Add event listener to the form
nameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  playerName = nameInput.value.trim()
  if (playerName) {
    startGame()
  }
})

// Start the game
function startGame() {
  nameForm.classList.add('hidden')
  gameBoard.classList.remove('hidden')
  scoreBoard.classList.remove('hidden')
  enterName.classList.add('hidden')
  // Show message about how to play the game
  resultDiv.style.display = 'block'
  resultDiv.innerHTML = `<p>Hej ${playerName}! Använd piltangenterna för att styra ormen och "äta upp" ditt namn.</p>`

  updateScore()

  createFood()
  // Set how often the snake should move
  gameLoop = setInterval(moveSnake, 100)
  document.addEventListener('keydown', changeDirection)
}

function createFoodElement(x, y, letter) {
  // Create a div-element for the food
  const foodElement = document.createElement('div')

  // Add class to the food-element
  foodElement.className =
    'absolute w-2.5 h-2.5 bg-red-500 flex items-center justify-center text-white text-xs'

  // Set position with style (Tailwind does not support exact pixel values)
  foodElement.style.left = `${food.x}px`
  foodElement.style.top = `${food.y}px`

  // Add the letter to the food-element
  foodElement.textContent = food.letter

  // Add Id to the food-element
  foodElement.id = 'food'
  return foodElement
}

// Create food
function createFood() {
  if (currentLetterIndex === playerName.length) {
    currentLetterIndex = 0
  }

  // Food-object, it has 3 properties - position x, position y and the letter
  food = {
    x: Math.floor(Math.random() * 30) * 10,
    y: Math.floor(Math.random() * 30) * 10,
    letter: playerName[currentLetterIndex],
  }

  // Create the food element and append it to the game board
  const foodElement = createFoodElement(food.x, food.y, food.letter)
  gameBoard.appendChild(foodElement)

  // Decrease the currentLetterIndex, to get the next letter in the playerName
  currentLetterIndex++
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

  // Check if the snake has hit the border
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

// Update the game board
function updateGameBoard() {
  // Clear the game board
  gameBoard.innerHTML = ''

  // Draw the snake
  snake.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.className = 'absolute w-2.5 h-2.5 bg-green-500'
    snakeElement.style.left = `${segment.x}px`
    snakeElement.style.top = `${segment.y}px`
    gameBoard.appendChild(snakeElement)
  })

  // Draw the food
  const foodElement = createFoodElement(food.x, food.y, food.letter)
  gameBoard.appendChild(foodElement)
}

function updateScore() {
  currentScoreElement.textContent = `Poäng: ${score}`
  if (score > highScore) {
    highScore = score
    highScoreElement.textContent = `Highscore: ${highScore}`
  }
}

// Change direction on the snake
function changeDirection(e) {
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const UP_KEY = 38
  const DOWN_KEY = 40

  const keyPressed = e.keyCode

  if (keyPressed === LEFT_KEY && dx === 0) {
    dx = -10
    dy = 0
  }
  if (keyPressed === UP_KEY && dy === 0) {
    dx = 0
    dy = -10
  }
  if (keyPressed === RIGHT_KEY && dx === 0) {
    dx = 10
    dy = 0
  }
  if (keyPressed === DOWN_KEY && dy === 0) {
    dx = 0
    dy = 10
  }
}

function checkCollision(head) {
  // Check if the snake has hit the right or left border
  if (head.x < 0 || head.x >= 300) {
    return true
  }
  // Check if the snake has hit the top or bottom border
  if (head.y < 0 || head.y >= 300) {
    return true
  }
  return false
}

function endGame() {
  clearInterval(gameLoop)
  document.removeEventListener('keydown', changeDirection)
  alert('Game over')

  // Reset game state
  snake = [{ x: 150, y: 150 }]
  dx = 10
  dy = 0
  score = 0
  currentLetterIndex = 0

  // Show name input form again
  nameForm.classList.remove('hidden')
  gameBoard.classList.add('hidden')
  scoreBoard.classList.add('hidden')
  resultDiv.style.display = 'none'
  enterName.classList.remove('hidden')
}
