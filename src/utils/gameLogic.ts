import { Question, Enemy } from '../types/game';

const CASTLE_X = 400;
const CASTLE_Y = 300;
const CASTLE_RADIUS = 50;

export function generateQuestion(difficulty: 'easy' | 'medium' | 'hard'): Question {
  let minTable = 2;
  let maxTable = 5;

  if (difficulty === 'medium') {
    maxTable = 7;
  } else if (difficulty === 'hard') {
    maxTable = 9;
  }

  const num1 = Math.floor(Math.random() * (maxTable - minTable + 1)) + minTable;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const answer = num1 * num2;

  return {
    num1,
    num2,
    answer,
    text: `${num1} × ${num2} = ?`,
  };
}

export function getTimeLimit(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 8;
    case 'hard':
      return 5;
  }
}

export function createEnemy(
  id: string,
  level: number,
  screenWidth: number,
  screenHeight: number
): Enemy {
  const side = Math.floor(Math.random() * 4);
  let x = 0;
  let y = 0;

  // 화면 가장자리에서 랜덤 위치 생성
  switch (side) {
    case 0: // 위
      x = Math.random() * screenWidth;
      y = -50;
      break;
    case 1: // 오른쪽
      x = screenWidth + 50;
      y = Math.random() * screenHeight;
      break;
    case 2: // 아래
      x = Math.random() * screenWidth;
      y = screenHeight + 50;
      break;
    case 3: // 왼쪽
      x = -50;
      y = Math.random() * screenHeight;
      break;
  }

  const speed = 0.5 + (level * 0.1);
  const health = 1 + Math.floor(level / 3);
  const types: Enemy['type'][] = ['goblin', 'dragon', 'monster'];
  const type = types[Math.floor(Math.random() * types.length)];

  const dx = CASTLE_X - x;
  const dy = CASTLE_Y - y;
  const angle = Math.atan2(dy, dx);

  return {
    id,
    x,
    y,
    speed,
    health,
    maxHealth: health,
    type,
    angle,
  };
}

export function updateEnemyPosition(enemy: Enemy): Enemy {
  const dx = Math.cos(enemy.angle) * enemy.speed;
  const dy = Math.sin(enemy.angle) * enemy.speed;

  return {
    ...enemy,
    x: enemy.x + dx,
    y: enemy.y + dy,
  };
}

export function checkEnemyReachedCastle(enemy: Enemy): boolean {
  const dx = enemy.x - CASTLE_X;
  const dy = enemy.y - CASTLE_Y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= CASTLE_RADIUS + 20;
}

export function getEnemySpawnRate(level: number): number {
  // 레벨이 높을수록 더 자주 적 생성
  return Math.max(2000 - level * 100, 500);
}

export function calculateScore(
  isCorrect: boolean,
  timeLeft: number,
  timeLimit: number,
  combo: number
): number {
  if (!isCorrect) return 0;

  const baseScore = 10;
  const timeBonus = Math.floor((timeLeft / timeLimit) * 5);
  const comboMultiplier = Math.min(1 + combo * 0.1, 3);

  return Math.floor((baseScore + timeBonus) * comboMultiplier);
}

