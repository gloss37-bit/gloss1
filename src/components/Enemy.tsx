import React from 'react';
import { Enemy as EnemyType } from '../types/game';
import './Enemy.css';

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const getEnemyEmoji = () => {
    switch (enemy.type) {
      case 'goblin':
        return '👹';
      case 'dragon':
        return '🐉';
      case 'monster':
        return '👾';
      default:
        return '👹';
    }
  };

  const healthPercentage = (enemy.health / enemy.maxHealth) * 100;

  return (
    <div
      className="enemy"
      style={{
        left: `${enemy.x}px`,
        top: `${enemy.y}px`,
        transform: `translate(-50%, -50%) rotate(${enemy.angle * (180 / Math.PI)}deg)`,
      }}
    >
      <div className="enemy-sprite">{getEnemyEmoji()}</div>
      {enemy.maxHealth > 1 && (
        <div className="enemy-health-bar">
          <div
            className="enemy-health-fill"
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Enemy;

