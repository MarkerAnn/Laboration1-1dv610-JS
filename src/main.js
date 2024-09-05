import './style.css'

// Take care of the users input, when user clicks on the button
// check if the input is empty, not numbers and a valid string
// Fetch to API
// Show the result
// Error handling
// CDN safety for input
// Add a loader
// Add a reset button

// Global variables
let playerName = ''
let snake = [{ x: 150, y: 150 }]
let food = {}
let deltaX = 10
let deltaY = 0
let gameLoop
let gameBoard
let currentLetterIndex = 0

// Define the elements
const nameForm = document.querySelector('#nameForm')
const nameInput = document.querySelector('#nameInput')
const resultDiv = document.querySelector('#result')
const appDiv = document.querySelector('#app')
gameBoard = document.querySelector('#gameBoard')

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

  // Show message about how to play the game
  const message = document.createElement('p')
  message.textConetn = `Hej ${playerName}! Använd piltangenterna för att styra ormen.`
  resultDiv.innerHTML = ''
  resultDiv.appendChild(message)

  createFood()
  // Set how often the snake should move
  gameLoop = setInterval(moveSnake, 100)
  document.addEventListener('keydown', changeDirection)
}

// Create food
function createFood() {
  if (currentLetterIndex >= playerName.length) {
    endGame()
    return
  }

  // Food-object, it has 3 properties - position x, position y and the letter
  food = {
    x: Math.floor(Math.random() * 30) * 10,
    y: Math.floor(Math.random() * 30) * 10,
    letter: playerName[currentLetterIndex],
  }

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

  // Append the food-element to the game-board
  gameBoard.appendChild(foodElement)

  // Decrease the currentLetterIndex, to get the next letter in the playerName
  currentLetterIndex++
}
