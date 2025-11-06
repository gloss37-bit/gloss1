import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameState, Enemy, Question } from '../types/game';
import { generateQuestion, getTimeLimit, createEnemy, updateEnemyPosition, checkEnemyReachedCastle, getEnemySpawnRate, calculateScore } from '../utils/gameLogic';
import Castle from './Castle';
import EnemyComponent from './Enemy';
import QuestionDisplay from './QuestionDisplay';
import Keypad from './Keypad';
import GameStats from './GameStats';
import GameOver from './GameOver';
import './Game.css';

interface GameProps {
  mode: 'story' | 'practice' | 'challenge';
  difficulty: 'easy' | 'medium' | 'hard';
  onBackToMenu: () => void;
}

const Game: React.FC<GameProps> = ({ mode, difficulty, onBackToMenu }) => {
  const [gameState, setGameState] = useState<GameState>({
    castleHealth: 100,
    maxCastleHealth: 100,
    level: 1,
    enemies: [],
    currentQuestion: null,
    userAnswer: '',
    timeLeft: 0,
    gameStatus: 'playing',
    stats: {
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      combo: 0,
      maxCombo: 0,
    },
    difficulty,
  });

  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({
    type: null,
    message: '',
  });

  const gameLoopRef = useRef<number>();
  const enemySpawnTimerRef = useRef<number>();
  const questionTimerRef = useRef<number>();
  const screenWidth = 800;
  const screenHeight = 600;

  const spawnEnemy = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    const newEnemy = createEnemy(
      `enemy-${Date.now()}-${Math.random()}`,
      gameState.level,
      screenWidth,
      screenHeight
    );

    setGameState((prev) => ({
      ...prev,
      enemies: [...prev.enemies, newEnemy],
    }));
  }, [gameState.level, gameState.gameStatus]);

  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(difficulty);
    const timeLimit = getTimeLimit(difficulty);

    setGameState((prev) => ({
      ...prev,
      currentQuestion: question,
      userAnswer: '',
      timeLeft: timeLimit,
      stats: {
        ...prev.stats,
        totalQuestions: prev.stats.totalQuestions + 1,
      },
    }));

    // 타이머 시작
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }

    questionTimerRef.current = window.setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 0 || prev.gameStatus !== 'playing') {
          if (questionTimerRef.current) {
            clearInterval(questionTimerRef.current);
          }
          return prev;
        }

        const newTimeLeft = prev.timeLeft - 0.1;
        if (newTimeLeft <= 0) {
          // 시간 초과 처리
          handleTimeOut();
          return prev;
        }

        return {
          ...prev,
          timeLeft: Math.max(0, newTimeLeft),
        };
      });
    }, 100);
  }, [difficulty]);

  const handleTimeOut = useCallback(() => {
    setFeedback({
      type: 'wrong',
      message: '시간 초과!',
    });

    setTimeout(() => {
      setFeedback({ type: null, message: '' });
      generateNewQuestion();
    }, 1500);

    setGameState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        combo: 0,
      },
    }));
  }, [generateNewQuestion]);

  const handleAnswer = useCallback((answer: string) => {
    if (gameState.gameStatus !== 'playing' || !gameState.currentQuestion) return;

    const userAnswerNum = parseInt(answer);
    const isCorrect = userAnswerNum === gameState.currentQuestion.answer;

    if (isCorrect) {
      // 정답 처리
      const score = calculateScore(
        true,
        gameState.timeLeft,
        getTimeLimit(difficulty),
        gameState.stats.combo
      );

      const newCombo = gameState.stats.combo + 1;

      setFeedback({
        type: 'correct',
        message: '정답!',
      });

      setGameState((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          score: prev.stats.score + score,
          correctAnswers: prev.stats.correctAnswers + 1,
          combo: newCombo,
          maxCombo: Math.max(prev.stats.maxCombo, newCombo),
        },
        userAnswer: '',
      }));

      // 가장 가까운 적 제거
      setGameState((prev) => {
        if (prev.enemies.length === 0) return prev;
        
        const sortedEnemies = [...prev.enemies].sort((a, b) => {
          const distA = Math.sqrt((a.x - 400) ** 2 + (a.y - 300) ** 2);
          const distB = Math.sqrt((b.x - 400) ** 2 + (b.y - 300) ** 2);
          return distA - distB;
        });

        return {
          ...prev,
          enemies: prev.enemies.filter((e) => e.id !== sortedEnemies[0].id),
        };
      });

      setTimeout(() => {
        setFeedback({ type: null, message: '' });
        generateNewQuestion();
      }, 1000);
    } else {
      // 오답 처리
      setFeedback({
        type: 'wrong',
        message: `틀렸어요! 정답은 ${gameState.currentQuestion.answer}입니다`,
      });

      setGameState((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          combo: 0,
        },
        userAnswer: '',
      }));

      setTimeout(() => {
        setFeedback({ type: null, message: '' });
        generateNewQuestion();
      }, 2000);
    }

    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }
  }, [gameState, difficulty, generateNewQuestion]);

  // 게임 루프
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    gameLoopRef.current = requestAnimationFrame(function gameLoop() {
      setGameState((prev) => {
        if (prev.gameStatus !== 'playing') return prev;

        // 적 이동 업데이트
        const updatedEnemies = prev.enemies.map((enemy) => {
          const updated = updateEnemyPosition(enemy);
          
          // 성에 도달한 적 처리
          if (checkEnemyReachedCastle(updated)) {
            return null;
          }
          return updated;
        }).filter((enemy): enemy is Enemy => enemy !== null);

        // 성에 도달한 적이 있으면 체력 감소
        const reachedCount = prev.enemies.length - updatedEnemies.length;
        let newCastleHealth = prev.castleHealth - reachedCount * 10;

        if (newCastleHealth <= 0) {
          newCastleHealth = 0;
          if (questionTimerRef.current) {
            clearInterval(questionTimerRef.current);
          }
          return {
            ...prev,
            castleHealth: 0,
            gameStatus: 'gameOver',
            enemies: [],
          };
        }

        return {
          ...prev,
          enemies: updatedEnemies,
          castleHealth: newCastleHealth,
        };
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    });

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus]);

  // 적 생성 타이머
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const spawnRate = getEnemySpawnRate(gameState.level);
    enemySpawnTimerRef.current = window.setInterval(() => {
      spawnEnemy();
    }, spawnRate);

    return () => {
      if (enemySpawnTimerRef.current) {
        clearInterval(enemySpawnTimerRef.current);
      }
    };
  }, [gameState.level, gameState.gameStatus, spawnEnemy]);

  // 첫 문제 생성
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !gameState.currentQuestion) {
      generateNewQuestion();
    }
  }, [gameState.gameStatus, gameState.currentQuestion, generateNewQuestion]);

  // 레벨 업 체크 (스토리 모드)
  useEffect(() => {
    if (mode === 'story' && gameState.stats.correctAnswers > 0 && gameState.stats.correctAnswers % 10 === 0) {
      setGameState((prev) => ({
        ...prev,
        level: prev.level + 1,
      }));
    }
  }, [gameState.stats.correctAnswers, mode]);

  if (gameState.gameStatus === 'gameOver') {
    return (
      <GameOver
        stats={gameState.stats}
        level={gameState.level}
        onRestart={() => {
          setGameState({
            castleHealth: 100,
            maxCastleHealth: 100,
            level: 1,
            enemies: [],
            currentQuestion: null,
            userAnswer: '',
            timeLeft: 0,
            gameStatus: 'playing',
            stats: {
              score: 0,
              correctAnswers: 0,
              totalQuestions: 0,
              combo: 0,
              maxCombo: 0,
            },
            difficulty,
          });
        }}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  return (
    <div className="game-container">
      <div className="game-screen">
        <GameStats
          score={gameState.stats.score}
          castleHealth={gameState.castleHealth}
          maxCastleHealth={gameState.maxCastleHealth}
          level={gameState.level}
          combo={gameState.stats.combo}
          correctRate={
            gameState.stats.totalQuestions > 0
              ? Math.round((gameState.stats.correctAnswers / gameState.stats.totalQuestions) * 100)
              : 0
          }
        />

        <div className="game-field">
          <Castle health={gameState.castleHealth} maxHealth={gameState.maxCastleHealth} />
          {gameState.enemies.map((enemy) => (
            <EnemyComponent key={enemy.id} enemy={enemy} />
          ))}
        </div>

        <div className="game-ui">
          <QuestionDisplay
            question={gameState.currentQuestion}
            timeLeft={gameState.timeLeft}
            timeLimit={getTimeLimit(difficulty)}
            feedback={feedback}
          />
          <Keypad
            value={gameState.userAnswer}
            onChange={(value) => {
              setGameState((prev) => ({ ...prev, userAnswer: value }));
            }}
            onSubmit={handleAnswer}
            disabled={gameState.gameStatus !== 'playing'}
          />
        </div>

        <button className="pause-button" onClick={onBackToMenu}>
          메뉴로
        </button>
      </div>
    </div>
  );
};

export default Game;

