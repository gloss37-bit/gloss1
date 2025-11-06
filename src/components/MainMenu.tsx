import React from 'react';
import './MainMenu.css';

interface MainMenuProps {
  onStartGame: (mode: 'story' | 'practice' | 'challenge', difficulty: 'easy' | 'medium' | 'hard') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="main-menu">
      <div className="menu-container">
        <h1 className="game-title">🏰 구구단 산성비 게임</h1>
        <p className="game-subtitle">곱셈 문제를 풀어 성을 지켜라!</p>

        <div className="menu-section">
          <h2>게임 모드</h2>
          <div className="mode-buttons">
            <button
              className="mode-button story"
              onClick={() => onStartGame('story', 'easy')}
            >
              📖 스토리 모드
              <span>단계별로 레벨을 클리어하세요</span>
            </button>
            <button
              className="mode-button practice"
              onClick={() => onStartGame('practice', 'easy')}
            >
              🎯 연습 모드
              <span>원하는 단을 집중적으로 연습하세요</span>
            </button>
            <button
              className="mode-button challenge"
              onClick={() => onStartGame('challenge', 'medium')}
            >
              ⚡ 챌린지 모드
              <span>제한 시간 내 최대한 많은 문제를 풀어보세요</span>
            </button>
          </div>
        </div>

        <div className="menu-section">
          <h2>난이도 선택</h2>
          <div className="difficulty-buttons">
            <button
              className="difficulty-button easy"
              onClick={() => onStartGame('story', 'easy')}
            >
              초급 (2-5단)
            </button>
            <button
              className="difficulty-button medium"
              onClick={() => onStartGame('story', 'medium')}
            >
              중급 (2-7단)
            </button>
            <button
              className="difficulty-button hard"
              onClick={() => onStartGame('story', 'hard')}
            >
              고급 (2-9단)
            </button>
          </div>
        </div>

        <div className="game-instructions">
          <h3>게임 방법</h3>
          <ul>
            <li>화면에 나타나는 곱셈 문제를 풀어주세요</li>
            <li>정답을 입력하면 적이 물리쳐집니다</li>
            <li>오답이거나 시간 초과 시 적이 성에 도달합니다</li>
            <li>성의 체력이 0이 되면 게임 오버입니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

