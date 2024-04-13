import React, { useState } from 'react'
import "./tictactoe.css"

function TicTacToe() {
  const positions = [1,2,3,4,5,6,7,8,9]
  const [xPositions,setX] = useState([])
  const [oPositions,setO] = useState([]);
  const [xWins,setXwins] = useState(0);
  const [oWins,setOwins] = useState(0);
  const [draws,setDraws] = useState(0)
  const [turn, setTurn] = useState("x");


  const blankImage = "https://tse4.mm.bing.net/th?id=OIP.2N3yUqpMYG6VHxj1maGVpAHaEo&pid=Api&P=0&h=180";
  const xImage = "https://cdn.pixabay.com/photo/2016/06/07/23/15/letter-1442871_640.png";
  const oImage = "https://cdn.pixabay.com/photo/2017/02/09/11/25/alphabet-2051685_640.png";


  const checkRows = () => {
    if (xPositions.includes(1) && xPositions.includes(2) && xPositions.includes(3)) {
      return 'x'
    }
    if (xPositions.includes(4) && xPositions.includes(5) && xPositions.includes(6)) {
      return 'x'
    }
    if (xPositions.includes(7) && xPositions.includes(8) && xPositions.includes(9)) {
      return 'x'
    }
    if (oPositions.includes(1) && oPositions.includes(2) && oPositions.includes(3)) {
      return 'o'
    }
    if (oPositions.includes(4) && oPositions.includes(5) && oPositions.includes(6)) {
      return 'o'
    }
    if (oPositions.includes(7) && oPositions.includes(8) && oPositions.includes(9)) {
      return 'o'
    }
    return 0
  }

  const checkColumns = () => {
    if (xPositions.includes(1) && xPositions.includes(4) && xPositions.includes(7)) {
      return 'x'
    }
    if (xPositions.includes(2) && xPositions.includes(5) && xPositions.includes(8)) {
      return 'x'
    }
    if (xPositions.includes(3) && xPositions.includes(6) && xPositions.includes(9)) {
      return 'x'
    }
    if (oPositions.includes(1) && oPositions.includes(4) && oPositions.includes(7)) {
      return 'o'
    }
    if (oPositions.includes(2) && oPositions.includes(5) && oPositions.includes(8)) {
      return 'o'
    }
    if (oPositions.includes(3) && oPositions.includes(6) && oPositions.includes(9)) {
      return 'o'
    }
    return 0
  }

  const checkDigonals = () => {
      if (xPositions.includes(1) && xPositions.includes(5) && xPositions.includes(9)) {
        return 'x'
      }
      if (xPositions.includes(7) && xPositions.includes(5) && xPositions.includes(3)) {
        return 'x'
      }
      if (oPositions.includes(1) && oPositions.includes(5) && oPositions.includes(9)) {
        return 'o'
      }
      if (oPositions.includes(7) && oPositions.includes(5) && oPositions.includes(3)) {
        return 'o'
      }
      return 0
  }

  const checkWinner = () => {
    let occupied = xPositions;
    occupied = occupied.concat(oPositions)
    console.log(occupied)
    occupied = occupied.sort()
    let flag = checkColumns();
    if (flag === 0) {
      flag = checkDigonals()
    } if (flag === 0) {
      flag = checkRows();
    }
    if (flag === "x") {
      setXwins(xWins+1);
      resetGame();
      alert("x won")
    } else if (flag === "o") {
      setOwins(oWins+1);
      resetGame();
      alert(" O won")
    }else if (occupied.length === 9) {
      setDraws(draws+1);
      resetGame();
      alert("Draw")
    }
  }

  const turnUpdate = () => {
    checkWinner();
    if (turn === "x") {
      setTurn("o")
    } else {
      setTurn("x")
    }
  }

  const resetScore = ()=>{
    setDraws(0)
    setOwins(0)
    setXwins(0)
    resetGame();
  }

  const resetGame = () => {
    setX([])
    setO([])
    let boxes = document.querySelectorAll("img.box")
    boxes.forEach(el => {
      el.src = blankImage;
    })
  }

  const markPosition = (event) => {
    if (event.target.src === blankImage) {
      if (turn === "x") {
        let xPos = xPositions
        xPos.push(parseInt(event.target.id))
        setX(xPos)
        event.target.src = xImage
        turnUpdate();
      }
      if (turn === "o") {
        let oPos = oPositions
        oPos.push(parseInt(event.target.id))
        setO(oPos)
        event.target.src = oImage
        turnUpdate();
      }
    }
  }

  return (
    <div className='tic-tac-game-container'>
      <h1>TIC-TAC-TOE</h1>
      <div className="tic-tac-board">
        {positions.map(element => {
          if (xPositions.includes(element)) {
            return <img key={element} id={element} src={xImage} onClick={markPosition} className='box' alt="" />
          } else if (oPositions.includes(element)) {
            return <img key={element} id={element} src={oImage} onClick={markPosition} className='box' alt="" />
          }
          else {
            return <img key={element} id={element}  src={blankImage} onClick={markPosition} className='box' alt=""  />
          }
        })}
      </div>
      <h1>{turn.toUpperCase()}'s Turn</h1>
      <h2>{`X Victories : - ${xWins}`}</h2>
      <h2>{`O Victories : - ${oWins}`}</h2>
      <h2>{`Draws :- ${draws}`}</h2>
      <button className='btn' onClick={resetGame}>Reset Game</button>
      <button className='btn' onClick={resetScore}>Reset Score</button>
    </div>
  )
}

export default TicTacToe
