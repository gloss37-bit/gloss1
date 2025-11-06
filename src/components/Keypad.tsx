import React, { useEffect, useCallback } from 'react';
import './Keypad.css';

interface KeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleNumberClick = useCallback((num: string) => {
    if (disabled) return;
    const newValue = value + num;
    if (newValue.length <= 3) {
      onChange(newValue);
    }
  }, [disabled, value, onChange]);

  const handleBackspace = useCallback(() => {
    if (disabled) return;
    onChange(value.slice(0, -1));
  }, [disabled, value, onChange]);

  const handleSubmit = useCallback(() => {
    if (disabled || !value) return;
    onSubmit(value);
  }, [disabled, value, onSubmit]);

  const handleClear = useCallback(() => {
    if (disabled) return;
    onChange('');
  }, [disabled, onChange]);

  // 키보드 입력 지원
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled) return;

      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [disabled, handleNumberClick, handleBackspace, handleSubmit, handleClear]);

  return (
    <div className="keypad">
      <div className="keypad-display">
        <input
          type="text"
          value={value}
          readOnly
          className="answer-input"
          placeholder="답을 입력하세요"
        />
      </div>
      <div className="keypad-buttons">
        <div className="keypad-row">
          <button className="keypad-key" onClick={() => handleNumberClick('7')} disabled={disabled}>
            7
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('8')} disabled={disabled}>
            8
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('9')} disabled={disabled}>
            9
          </button>
        </div>
        <div className="keypad-row">
          <button className="keypad-key" onClick={() => handleNumberClick('4')} disabled={disabled}>
            4
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('5')} disabled={disabled}>
            5
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('6')} disabled={disabled}>
            6
          </button>
        </div>
        <div className="keypad-row">
          <button className="keypad-key" onClick={() => handleNumberClick('1')} disabled={disabled}>
            1
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('2')} disabled={disabled}>
            2
          </button>
          <button className="keypad-key" onClick={() => handleNumberClick('3')} disabled={disabled}>
            3
          </button>
        </div>
        <div className="keypad-row">
          <button className="keypad-key" onClick={() => handleNumberClick('0')} disabled={disabled}>
            0
          </button>
          <button className="keypad-key clear" onClick={handleClear} disabled={disabled}>
            지우기
          </button>
          <button className="keypad-key submit" onClick={handleSubmit} disabled={disabled || !value}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keypad;

