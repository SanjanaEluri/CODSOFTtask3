import React, { useState } from 'react';
import './style.css';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [expression, setExpression] = useState('');

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
    setExpression(expression + digit);
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) return;

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setExpression(expression + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      setExpression(expression.slice(0, -1) + nextOperator);
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    if (nextOperator !== '=') {
      setExpression(expression + ' ' + nextOperator + ' ');
    } else {
      setExpression('');
    }
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const resetCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
    setExpression('');
  };

  return (
    <div className="calculator">
      <input type="text" className="calculator-screen" value={expression || displayValue} disabled />
      <div className="calculator-keys">
        <button onClick={() => handleOperator('+')} className="operator" value="+">+</button>
        <button onClick={() => handleOperator('-')} className="operator" value="-">-</button>
        <button onClick={() => handleOperator('*')} className="operator" value="*">&times;</button>
        <button onClick={() => handleOperator('/')} className="operator" value="/">&divide;</button>
        <button onClick={() => inputDigit('7')} value="7">7</button>
        <button onClick={() => inputDigit('8')} value="8">8</button>
        <button onClick={() => inputDigit('9')} value="9">9</button>
        <button onClick={() => inputDigit('4')} value="4">4</button>
        <button onClick={() => inputDigit('5')} value="5">5</button>
        <button onClick={() => inputDigit('6')} value="6">6</button>
        <button onClick={() => inputDigit('1')} value="1">1</button>
        <button onClick={() => inputDigit('2')} value="2">2</button>
        <button onClick={() => inputDigit('3')} value="3">3</button>
        <button onClick={() => inputDigit('0')} value="0">0</button>
        <button onClick={inputDecimal} className="decimal" value=".">.</button>
        <button onClick={resetCalculator} className="all-clear" value="all-clear">AC</button>
        <button onClick={() => handleOperator('=')} className="equal-sign" value="=">=</button>
      </div>
    </div>
  );
}
