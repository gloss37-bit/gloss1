import React from 'react';
import { GameStats as GameStatsType } from '../types/game';
import './GameOver.css';

interface GameOverProps {
  stats: GameStatsType;
  level: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ stats, level, onRestart, onBackToMenu }) => {
  const correctRate =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  return (
    <div className="game-over-overlay">
      <div className="game-over-container">
        <h1 className="game-over-title">게임 오버</h1>
        <div className="game-over-content">
          <div className="final-stats">
            <div className="stat-box">
              <div className="stat-label">최종 점수</div>
              <div className="stat-number score">{stats.score.toLocaleString()}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">도달 레벨</div>
              <div className="stat-number level">{level}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">정답 수</div>
              <div className="stat-number">{stats.correctAnswers} / {stats.totalQuestions}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">정답률</div>
              <div className="stat-number correct-rate">{correctRate}%</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">최대 콤보</div>
              <div className="stat-number combo">{stats.maxCombo}</div>
            </div>
          </div>

          {correctRate >= 80 && (
            <div className="achievement">
              🏆 정답률 80% 이상 달성!
            </div>
          )}

          {stats.maxCombo >= 10 && (
            <div className="achievement">
              🔥 10연속 정답 달성!
            </div>
          )}

          <div className="game-over-buttons">
            <button className="restart-button" onClick={onRestart}>
              다시하기
            </button>
            <button className="menu-button" onClick={onBackToMenu}>
              메뉴로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;

