import React from 'react';
import './GameStats.css';

interface GameStatsProps {
  score: number;
  castleHealth: number;
  maxCastleHealth: number;
  level: number;
  combo: number;
  correctRate: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  score,
  castleHealth,
  maxCastleHealth,
  level,
  combo,
  correctRate,
}) => {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">점수</span>
        <span className="stat-value score">{score.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">레벨</span>
        <span className="stat-value level">{level}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">콤보</span>
        <span className="stat-value combo">{combo > 0 ? `${combo}연속!` : '-'}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">정답률</span>
        <span className="stat-value correct-rate">{correctRate}%</span>
      </div>
    </div>
  );
};

export default GameStats;

