'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaGamepad } from 'react-icons/fa';

const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const BALL_SIZE = 6;
const BALL_SPEED = 4;
const PADDLE_SPEED = 8;
const BRICK_ROW_COUNT = 3;
const BRICK_COLUMN_COUNT = 5;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;

export const Bricks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballSpeedX = BALL_SPEED;
    let ballSpeedY = -BALL_SPEED;
    let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let score = 0;

    // Initialize bricks
    const bricks: { x: number; y: number; status: number }[][] = [];
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
      bricks[c] = [];
      for (let r = 0; r < BRICK_ROW_COUNT; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    const updatePaddlePosition = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - PADDLE_WIDTH / 2;
        
        // Keep paddle within canvas bounds
        if (paddleX < 0) {
          paddleX = 0;
        }
        if (paddleX + PADDLE_WIDTH > canvas.width) {
          paddleX = canvas.width - PADDLE_WIDTH;
        }
      }
    };

    // Mouse controls
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updatePaddlePosition(e.clientX);
    };

    // Touch controls
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      updatePaddlePosition(touch.clientX);
    };

    // Keyboard controls (as fallback)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') rightPressed = true;
      if (e.key === 'ArrowLeft') leftPressed = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') rightPressed = false;
      if (e.key === 'ArrowLeft') leftPressed = false;
    };

    const updateGame = () => {
      // Move paddle with keyboard (as backup control)
      if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
        paddleX += PADDLE_SPEED;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= PADDLE_SPEED;
      }

      // Move ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with walls
      if (ballX + ballSpeedX > canvas.width - BALL_SIZE || ballX + ballSpeedX < BALL_SIZE) {
        ballSpeedX = -ballSpeedX;
      }
      if (ballY + ballSpeedY < BALL_SIZE) {
        ballSpeedY = -ballSpeedY;
      }

      // Ball collision with paddle
      if (ballY + ballSpeedY > canvas.height - PADDLE_HEIGHT - BALL_SIZE) {
        if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
          ballSpeedY = -ballSpeedY;
        } else if (ballY > canvas.height) {
          // Game Over
          ballX = canvas.width / 2;
          ballY = canvas.height - 30;
          ballSpeedX = BALL_SPEED;
          ballSpeedY = -BALL_SPEED;
          score = 0;
          // Reset bricks
          for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
              bricks[c][r].status = 1;
            }
          }
        }
      }

      // Ball collision with bricks
      for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
          const brick = bricks[c][r];
          if (brick.status === 1) {
            if (
              ballX > brick.x &&
              ballX < brick.x + BRICK_WIDTH &&
              ballY > brick.y &&
              ballY < brick.y + BRICK_HEIGHT
            ) {
              ballSpeedY = -ballSpeedY;
              brick.status = 0;
              score++;
            }
          }
        }
      }
    };

    const drawGame = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bricks
      for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.fillStyle = `hsl(${(c * r * 30) % 360}, 70%, 60%)`;
            ctx.fillRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
          }
        }
      }

      // Draw paddle
      ctx.fillStyle = 'white';
      ctx.fillRect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, BALL_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      // Draw score
      ctx.font = '16px monospace';
      ctx.fillStyle = 'white';
      ctx.fillText(`Score: ${score}`, 8, 20);
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Add all event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gameLoop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <Box position="relative" display="inline-block">
      <IconButton
        aria-label="Play Bricks"
        icon={<FaGamepad />}
        onClick={() => {
          setIsPlaying(!isPlaying);
          setGameStarted(true);
        }}
        variant="ghost"
        color="whiteAlpha.600"
        _hover={{ color: "white" }}
        size="lg"
      />
      {gameStarted && (
        <Box
          position="absolute"
          bottom="100%"
          left="50%"
          transform="translateX(-50%)"
          mb={4}
          display={isPlaying ? "block" : "none"}
          touchAction="none" // Prevents default touch behaviors
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              touchAction: 'none' // Prevents default touch behaviors
            }}
          />
        </Box>
      )}
    </Box>
  );
}; 