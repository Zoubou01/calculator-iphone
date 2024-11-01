'use client'

import { useState } from 'react'
import styles from './Calculator.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [resetDisplay, setResetDisplay] = useState(false)

  const handleNumberClick = (num: string) => {
    if (resetDisplay) {
      setDisplay(num)
      setResetDisplay(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperationClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display))
    } else if (operation) {
      const result = calculate()
      setPreviousValue(result)
      setDisplay(result.toString())
    }
    setOperation(op)
    setResetDisplay(true)
  }

  const handleEqualsClick = () => {
    if (previousValue !== null && operation) {
      const result = calculate()
      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
    }
  }

  const handleClearClick = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
  }

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handlePercentClick = () => {
    const current = parseFloat(display)
    setDisplay((current / 100).toString())
  }

  const handleToggleSignClick = () => {
    setDisplay((parseFloat(display) * -1).toString())
  }

  const calculate = (): number => {
    const current = parseFloat(display)
    switch (operation) {
      case '+':
        return previousValue! + current
      case '-':
        return previousValue! - current
      case '×':
        return previousValue! * current
      case '÷':
        return previousValue! / current
      default:
        return current
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.functionButton}`} onClick={handleClearClick}>
          {previousValue === null && operation === null ? 'AC' : 'C'}
        </button>
        <button className={`${styles.button} ${styles.functionButton}`} onClick={handleToggleSignClick}>+/-</button>
        <button className={`${styles.button} ${styles.functionButton}`} onClick={handlePercentClick}>%</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => handleOperationClick('÷')}>÷</button>
        <button className={styles.button} onClick={() => handleNumberClick('7')}>7</button>
        <button className={styles.button} onClick={() => handleNumberClick('8')}>8</button>
        <button className={styles.button} onClick={() => handleNumberClick('9')}>9</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => handleOperationClick('×')}>×</button>
        <button className={styles.button} onClick={() => handleNumberClick('4')}>4</button>
        <button className={styles.button} onClick={() => handleNumberClick('5')}>5</button>
        <button className={styles.button} onClick={() => handleNumberClick('6')}>6</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => handleOperationClick('-')}>-</button>
        <button className={styles.button} onClick={() => handleNumberClick('1')}>1</button>
        <button className={styles.button} onClick={() => handleNumberClick('2')}>2</button>
        <button className={styles.button} onClick={() => handleNumberClick('3')}>3</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={() => handleOperationClick('+')}>+</button>
        <button className={`${styles.button} ${styles.zeroButton}`} onClick={() => handleNumberClick('0')}>0</button>
        <button className={styles.button} onClick={handleDecimalClick}>.</button>
        <button className={`${styles.button} ${styles.operationButton}`} onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  )
}