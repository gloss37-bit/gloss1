export interface Enemy {
  id: string;
  x: number;
  y: number;
  speed: number;
  health: number;
  maxHealth: number;
  type: 'goblin' | 'dragon' | 'monster';
  angle: number;
}

export interface Question {
  num1: number;
  num2: number;
  answer: number;
  text: string;
}

export interface GameStats {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  combo: number;
  maxCombo: number;
}

export interface GameState {
  castleHealth: number;
  maxCastleHealth: number;
  level: number;
  enemies: Enemy[];
  currentQuestion: Question | null;
  userAnswer: string;
  timeLeft: number;
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete';
  stats: GameStats;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type GameMode = 'story' | 'practice' | 'challenge';

