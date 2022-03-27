import React, {useState} from 'react';
import {Button, ButtonGroup, Container} from "react-bootstrap";
import xMove from './audio/uhh.ogg';
import oMove from './audio/ahh.ogg';
import success from "./audio/jumpSound.ogg";
import fail from "./audio/failSound.ogg";

export default function Tick(){

    window.onload = start;
    const boxes = document.getElementsByTagName("td");
    let counter = 1;
    let winCounter = 0;
    let OMoves = [];
    let XMoves = [];

    let moveSoundForX = () => {
        const audio = new Audio(xMove);
        audio.play();
    }

    let moveSoundForO = () => {
        const audio = new Audio(oMove);
        audio.play();
    }

    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        localStorage.setItem('checkbox', e.target.checked);
        setChecked(e.target.checked);
    }

    const [text, setText] = useState("It is X's turn");
    const handleX = () => setText("It is X's turn");
    const handleO = () => setText("It is O's turn")
    const handleGameOver = () => setText("Game Over!");

    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    function start() {
        addXandOListener();
        addResetListener();
    }

    function addXandOListener() {
        for (let i = boxes.length - 1; i >= 0; i--) {
            boxes[i].addEventListener("click", addXorO);
        }
    }

    function addXorO(event){
        if (event.target.innerHTML.length === 0){
            if (counter % 2 === 0) {
                OMoves.push(parseInt(event.target.getAttribute("data-num")));
                event.target.innerHTML = "O";
                event.target.setAttribute("class","O");
                handleX();
                if(localStorage.getItem('checkbox') === 'true') {
                    moveSoundForX();
                }
                counter++;
                checkForWin(OMoves, "O");
            }
            else {
                XMoves.push(parseInt(event.target.getAttribute("data-num")));
                event.target.innerHTML = "X";
                event.target.setAttribute("class","X");
                handleO()
                if(localStorage.getItem('checkbox') === 'true') {
                    moveSoundForO();
                }
                counter++;
                checkForWin(XMoves, "X");
            }
            // if the counter is greater than or equal to 10, the game is a draw!
            if (counter >= 10){
                handleGameOver();
                let conf = window.confirm("It's a draw, do you want to play again?");
                if(conf){
                    resetBoard();
                }
            }
        }
    }

    function addResetListener(){
        let resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", resetBoard);
    }

    function checkForWin(movesArray, name){
        // loop over the first array of winning combinations
        for (let i = 0; i < winningCombinations.length; i++) {
            // reset the winCounter each time!
            winCounter = 0;
            // loop over each individual array
            for (let j = 0; j < winningCombinations[i].length; j++) {
                // if the number in winning combo array is === a number in moves array, add to winCounter
                if(movesArray.indexOf(winningCombinations[i][j]) !== -1){
                    winCounter++;
                }
                // if winCounter === 3 that means all 3 moves are winning combos and game is over!
                if(winCounter === 3){
                    let restart = window.confirm("Congratulations " + name + "!!");
                    if(restart) {
                        resetBoard();
                    }
                }
            }
        }
    }

    const resetBoard = () => {
        for (let i = boxes.length - 1; i >= 0; i--) {
            boxes[i].innerHTML="";
            boxes[i].setAttribute("class","clear");
        }
        OMoves = [];
        XMoves = [];
        winCounter=0;
        counter = 1;
        handleX()
    }

    return (
        <Container>
            <div>
                <div className="container">
                    <ButtonGroup>
                        <Button id="reset" variant="primary">Cleat Board</Button>
                    </ButtonGroup>
                </div>
                <input type="checkbox" checked={checked}
                       onChange={(e) => handleChange(e)}/>
                <span style={{fontSize:"9px", color:"darkred", marginLeft:"10px"}}>Checked is audio on</span>
                <p style={{fontSize: "20px"}}>Audio Settings</p>
                <h2 className="playerTurn">{text}</h2>
                <table className="gameTable">
                    <thead>
                    <tr>
                        <td data-num="0"/>
                        <td data-num="1"/>
                        <td data-num="2"/>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-num="3"/>
                        <td data-num="4"/>
                        <td data-num="5"/>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td data-num="6"/>
                        <td data-num="7"/>
                        <td data-num="8"/>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </Container>
    );
}