import React, { useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/omikron_9676732.png'
import cross_icon from '../Assets/close_13971064.png'

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(0);
    let [message, setMessage] = useState("");

    const toggle = (e, num) => {
        if (lock || data[num] !== "" || message) {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='cross' />`
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='circle' />`
            data[num] = "o";
        }
        setCount(count + 1);
        checkWinner();
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setLock(1);
                if (data[a] === "x") {
                    setMessage("Player 1 win!");
                } else {
                    setMessage("Player 2 win!");
                }
                return;
            }
        }

        if (count === 8) { // Check for a draw
            setMessage("It's a draw!");
        }
    }

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(0);
        setMessage("");
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = "");
    }

    return (
        <div className='container'>
            <h1 className="tittle">Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            {message && (
                <div className="message">
                    {message}
                </div>
            )}
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
}

export default TicTacToe;
