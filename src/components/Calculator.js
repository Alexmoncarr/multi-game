import React, { useState } from 'react';

function Calculator({ onBackToHome }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input)); // Nota: eval puede ser peligroso, úsalo con precaución
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="game">
      <h2>Calculadora</h2>
      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
          <button onClick={handleClear}>C</button>
        </div>
      </div>
      <button className="back-button" onClick={onBackToHome}>Back to Home</button>
    </div>
  );
}

export default Calculator;