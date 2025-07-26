# Snake Game 🐍

A classic Snake game implementation in C++ using Object-Oriented Programming principles. Navigate the snake around the grid, eat fruits to grow longer, and avoid collisions!

## 🎮 Game Features

- **Classic Snake Gameplay**: Control a snake that grows longer as it eats fruits
- **Three Difficulty Levels**: Easy, Medium, and Hard with different speeds
- **Object-Oriented Design**: Clean, modular code structure with separate classes
- **Real-time Score Display**: Live score and difficulty level shown during gameplay
- **Collision Detection**: Game ends when snake hits walls or itself
- **Random Fruit Generation**: Fruits spawn randomly across the game grid

## 🎯 How to Play

### Controls

- **W**: Move Up
- **A**: Move Left
- **S**: Move Down
- **D**: Move Right

### Objective

- Control the snake to eat fruits (@) scattered around the grid
- Each fruit eaten increases your score and makes the snake longer
- Avoid hitting the walls (#) or the snake's own body (\*)
- Try to achieve the highest score possible!

### Difficulty Levels

1. **Easy**: Slower snake movement (0.5s delay)
2. **Medium**: Moderate speed (0.3s delay)
3. **Hard**: Fast-paced gameplay (0.1s delay)

## 🛠️ Technical Details

### Architecture

The game is built using Object-Oriented Programming with two main classes:

- **Snake Class**: Manages snake position, movement, growth, and direction
- **Grid Class**: Handles the game board, fruit generation, collision detection, and game state

### Key Components

- **Grid Size**: 20x50 character console grid
- **Snake Representation**: '\*' characters for snake body
- **Fruit Representation**: '@' character
- **Borders**: '#' characters forming the game boundaries
- **Empty Space**: '.' characters

### Files Structure

- `main.cpp`: Contains the main game classes and core functionality
- `game.cpp`: Alternative implementation with detailed comments
- `README.md`: This documentation file

## 🚀 Getting Started

### Prerequisites

- C++ compiler (GCC, MinGW, or Visual Studio)
- Windows OS (uses Windows-specific console functions)

### Compilation

```bash
g++ -o snake-game main.cpp
```

### Running the Game

```bash
./snake-game
```

## 🎮 Gameplay Screenshots

```
################################################
#..............................................#
#..............................................#
#...................@..........................#
#..............................................#
#.....***......................................#
#..............................................#
#..............................................#
#..............................................#
################################################

Difficulty: Medium
Your current score: 3
```

## ⚙️ Configuration

The game includes several configurable parameters defined in the source code:

- `GRID_HEIGHT`: Game grid height (default: 20)
- `GRID_WIDTH`: Game grid width (default: 50)
- `SPAWN_ROW/SPAWN_COL`: Initial snake position (5, 5)
- Speed settings for each difficulty level

## 🔧 Code Highlights

### Object-Oriented Features

- **Encapsulation**: Private members with public interfaces
- **Data Structures**: Vector-based snake body management
- **Modular Design**: Separate classes for different game components

### Windows Console Integration

- Cursor positioning with `gotoxy()` function
- Console cursor hiding for better visual experience
- Keyboard input detection with `_kbhit()` and `_getch()`

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements such as:

- Adding sound effects
- Implementing high score tracking
- Adding different game modes
- Cross-platform compatibility

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Playing!

Challenge yourself with different difficulty levels and see how long you can make your snake grow!
