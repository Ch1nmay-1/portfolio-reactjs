import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css'; // Custom CSS for UI

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameInterval, setGameInterval] = useState(null);

  const snakeSpeed = 100; // Speed of the snake

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    const gridSize = 20; // Grid size for the game

    let snake = [{ x: 100, y: 100 }];
    let direction = 'RIGHT';
    let food = { x: 200, y: 200 };
    let newDirection = direction;

    const drawSnake = () => {
      ctx.fillStyle = '#00FF00'; // Snake color
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
      });
    };

    const drawFood = () => {
      ctx.fillStyle = '#FF0000'; // Food color
      ctx.fillRect(food.x, food.y, gridSize, gridSize);
    };

    const moveSnake = () => {
      let head = { ...snake[0] };
      
      if (newDirection === 'UP') head.y -= gridSize;
      if (newDirection === 'DOWN') head.y += gridSize;
      if (newDirection === 'LEFT') head.x -= gridSize;
      if (newDirection === 'RIGHT') head.x += gridSize;

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);
        food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize };
      } else {
        snake.pop();
      }

      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        clearInterval(gameInterval);
      }
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
      moveSnake();
    };

    const startGame = () => {
      setIsGameOver(false);
      setScore(0);
      snake = [{ x: 100, y: 100 }];
      direction = 'RIGHT';
      newDirection = direction;
      setGameInterval(setInterval(gameLoop, snakeSpeed));
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && direction !== 'DOWN') newDirection = 'UP';
      if (e.key === 'ArrowDown' && direction !== 'UP') newDirection = 'DOWN';
      if (e.key === 'ArrowLeft' && direction !== 'RIGHT') newDirection = 'LEFT';
      if (e.key === 'ArrowRight' && direction !== 'LEFT') newDirection = 'RIGHT';
    });

    if (isGameOver) return;

    startGame();

    return () => {
      clearInterval(gameInterval);
    };
  }, [isGameOver, score, gameInterval]);

  return (
    <div className="game-container">
      <canvas ref={canvasRef}></canvas>
      <div className="scoreboard">
        <h2>Score: {score}</h2>
        {isGameOver && <button onClick={() => setIsGameOver(false)}>Restart</button>}
      </div>
    </div>
  );
};

export default SnakeGame;
