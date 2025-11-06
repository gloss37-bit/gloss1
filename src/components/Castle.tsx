import React from 'react';
import './Castle.css';

interface CastleProps {
  health: number;
  maxHealth: number;
}

const Castle: React.FC<CastleProps> = ({ health, maxHealth }) => {
  const healthPercentage = (health / maxHealth) * 100;
  const isLowHealth = healthPercentage < 30;

  return (
    <div className="castle-container">
      <div className={`castle ${isLowHealth ? 'low-health' : ''}`}>
        <div className="castle-body">
          <div className="castle-tower left"></div>
          <div className="castle-tower center"></div>
          <div className="castle-tower right"></div>
          <div className="castle-gate"></div>
        </div>
        <div className="castle-flag">🏰</div>
      </div>
      <div className="castle-health-bar">
        <div
          className={`health-fill ${isLowHealth ? 'low' : ''}`}
          style={{ width: `${healthPercentage}%` }}
        />
        <span className="health-text">{health} / {maxHealth}</span>
      </div>
    </div>
  );
};

export default Castle;

