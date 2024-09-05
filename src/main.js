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

// Define the elements
const nameForm = document.querySelector('#nameForm')
const nameInput = document.querySelector('#nameInput')
const resultDiv = document.querySelector('#result')
const appDiv = document.querySelector('#app')
gameBoard = document.querySelector('#gameBoard')
