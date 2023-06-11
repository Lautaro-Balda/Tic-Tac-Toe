/* eslint-disable space-before-function-paren */
import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import Square from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import WinnerModal from './components/WinnerModal'
import Board from './components/Board'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardado de la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // revisar si tenemos un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>
        Reiniciar juego
      </button>

      <Board board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
