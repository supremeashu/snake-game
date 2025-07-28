// Snake Game JavaScript Implementation
// Based on the original C++ version

class SnakeGame {
	constructor() {
		this.GRID_HEIGHT = 20;
		this.GRID_WIDTH = 50;
		this.SNAKE_RIGHT = 1;
		this.SNAKE_LEFT = 2;
		this.SNAKE_BOTTOM = 3;
		this.SNAKE_TOP = 4;
		this.SPAWN_ROW = 5;
		this.SPAWN_COL = 5;

		this.gameBoard = document.getElementById("gameBoard");
		this.scoreElement = document.getElementById("score");
		this.difficultyElement = document.getElementById("difficulty");
		this.lengthElement = document.getElementById("length");
		this.gameOverElement = document.getElementById("gameOver");
		this.startBtn = document.getElementById("startBtn");
		this.pauseBtn = document.getElementById("pauseBtn");
		this.restartBtn = document.getElementById("restartBtn");

		this.snake = [];
		this.direction = this.SNAKE_RIGHT;
		this.fruit = { row: 0, col: 0 };
		this.score = 0;
		this.gameRunning = false;
		this.gamePaused = false;
		this.gameLoop = null;
		this.difficulty = 1; // 1=Easy, 2=Medium, 3=Hard
		this.speed = 500; // milliseconds

		this.initializeGame();
		this.setupEventListeners();
	}

	initializeGame() {
		this.snake = [{ row: this.SPAWN_ROW, col: this.SPAWN_COL }];
		this.direction = this.SNAKE_RIGHT;
		this.score = 0;
		this.generateFruit();
		this.updateDisplay();
		this.renderGame();
	}

	setupEventListeners() {
		document.addEventListener("keydown", (e) => this.handleKeyPress(e));
	}

	handleKeyPress(e) {
		if (!this.gameRunning && e.key === " ") {
			if (this.gameOverElement.style.display === "block") {
				this.restartGame();
			}
			return;
		}

		if (this.gameRunning && e.key === " ") {
			this.pauseGame();
			return;
		}

		if (!this.gameRunning || this.gamePaused) return;

		// Handle movement keys
		switch (e.key.toLowerCase()) {
			case "w":
			case "arrowup":
				if (this.direction !== this.SNAKE_BOTTOM) {
					this.direction = this.SNAKE_TOP;
				}
				break;
			case "s":
			case "arrowdown":
				if (this.direction !== this.SNAKE_TOP) {
					this.direction = this.SNAKE_BOTTOM;
				}
				break;
			case "a":
			case "arrowleft":
				if (this.direction !== this.SNAKE_RIGHT) {
					this.direction = this.SNAKE_LEFT;
				}
				break;
			case "d":
			case "arrowright":
				if (this.direction !== this.SNAKE_LEFT) {
					this.direction = this.SNAKE_RIGHT;
				}
				break;
		}
		e.preventDefault();
	}

	setDifficulty(level) {
		this.difficulty = level;
		switch (level) {
			case 1:
				this.speed = 500;
				this.difficultyElement.textContent = "Easy";
				break;
			case 2:
				this.speed = 300;
				this.difficultyElement.textContent = "Medium";
				break;
			case 3:
				this.speed = 100;
				this.difficultyElement.textContent = "Hard";
				break;
		}

		if (this.gameRunning) {
			clearInterval(this.gameLoop);
			this.gameLoop = setInterval(() => this.gameStep(), this.speed);
		}
	}

	startGame() {
		if (this.gameRunning) return;

		this.gameRunning = true;
		this.gamePaused = false;
		this.gameOverElement.style.display = "none";
		this.startBtn.disabled = true;
		this.pauseBtn.disabled = false;

		this.gameLoop = setInterval(() => this.gameStep(), this.speed);
	}

	pauseGame() {
		if (!this.gameRunning) return;

		if (this.gamePaused) {
			this.gamePaused = false;
			this.pauseBtn.textContent = "Pause";
			this.gameLoop = setInterval(() => this.gameStep(), this.speed);
		} else {
			this.gamePaused = true;
			this.pauseBtn.textContent = "Resume";
			clearInterval(this.gameLoop);
		}
	}

	restartGame() {
		this.stopGame();
		this.initializeGame();
	}

	stopGame() {
		this.gameRunning = false;
		this.gamePaused = false;
		if (this.gameLoop) {
			clearInterval(this.gameLoop);
			this.gameLoop = null;
		}
		this.startBtn.disabled = false;
		this.pauseBtn.disabled = true;
		this.pauseBtn.textContent = "Pause";
	}

	gameStep() {
		this.moveSnake();
		if (this.checkCollision()) {
			this.gameOver();
			return;
		}
		this.checkFruitCollision();
		this.renderGame();
		this.updateDisplay();
	}

	moveSnake() {
		const head = { ...this.snake[0] };

		switch (this.direction) {
			case this.SNAKE_RIGHT:
				head.col++;
				break;
			case this.SNAKE_LEFT:
				head.col--;
				break;
			case this.SNAKE_TOP:
				head.row--;
				break;
			case this.SNAKE_BOTTOM:
				head.row++;
				break;
		}

		this.snake.unshift(head);
		this.snake.pop(); // Remove tail (will be added back if fruit eaten)
	}

	checkCollision() {
		const head = this.snake[0];

		// Wall collision
		if (
			head.row < 0 ||
			head.row >= this.GRID_HEIGHT ||
			head.col < 0 ||
			head.col >= this.GRID_WIDTH
		) {
			return true;
		}

		// Self collision
		for (let i = 1; i < this.snake.length; i++) {
			if (head.row === this.snake[i].row && head.col === this.snake[i].col) {
				return true;
			}
		}

		return false;
	}

	checkFruitCollision() {
		const head = this.snake[0];
		if (head.row === this.fruit.row && head.col === this.fruit.col) {
			this.score++;
			this.snake.push({ ...this.snake[this.snake.length - 1] }); // Grow snake
			this.generateFruit();
		}
	}

	generateFruit() {
		let validPosition = false;
		while (!validPosition) {
			this.fruit.row = Math.floor(Math.random() * this.GRID_HEIGHT);
			this.fruit.col = Math.floor(Math.random() * this.GRID_WIDTH);

			validPosition = true;
			for (const segment of this.snake) {
				if (segment.row === this.fruit.row && segment.col === this.fruit.col) {
					validPosition = false;
					break;
				}
			}
		}
	}

	renderGame() {
		let board = "";

		for (let row = 0; row < this.GRID_HEIGHT; row++) {
			for (let col = 0; col < this.GRID_WIDTH; col++) {
				let cell = " ";

				// Check if this position is part of the snake
				const isSnake = this.snake.some(
					(segment) => segment.row === row && segment.col === col
				);

				if (isSnake) {
					cell = "*";
				} else if (this.fruit.row === row && this.fruit.col === col) {
					cell = "@";
				}

				board += cell;
			}
			board += "\n";
		}

		this.gameBoard.textContent = board;
	}

	updateDisplay() {
		this.scoreElement.textContent = this.score;
		this.lengthElement.textContent = this.snake.length;
	}

	gameOver() {
		this.stopGame();
		this.gameOverElement.style.display = "block";
	}
}

// Global functions for HTML buttons
let game;

function setDifficulty(level) {
	if (game) {
		game.setDifficulty(level);
	}
}

function startGame() {
	if (game) {
		game.startGame();
	}
}

function pauseGame() {
	if (game) {
		game.pauseGame();
	}
}

function restartGame() {
	if (game) {
		game.restartGame();
	}
}

// Initialize the game when the page loads
window.addEventListener("load", () => {
	game = new SnakeGame();
});
