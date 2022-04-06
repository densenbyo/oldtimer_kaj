import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Container, InputGroup, Modal} from "react-bootstrap";
import xMove from './audio/uhh.ogg';
import oMove from './audio/ahh.ogg';

export default function Tick(){
    //Function which renders TickTackToe game

    //useState hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("")
    const handleChangeName = (e) => {
        localStorage.setItem('secondUser', e.target.value);
        setName(e.target.value);
    }

    window.onload = start;
    const boxes = document.getElementsByTagName("td");
    let counter = 1;
    let winCounter = 0;
    let OMoves = [];
    let XMoves = [];

    //import sound for X player
    let moveSoundForX = () => {
        const audio = new Audio(xMove);
        audio.play();
    }

    //import sound for O player
    let moveSoundForO = () => {
        const audio = new Audio(oMove);
        audio.play();
    }

    //handle change of checkbox and save checkboxes value is saved in localStorage
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        localStorage.setItem('checkbox', e.target.checked);
        setChecked(e.target.checked);
    }

    const [text, setText] = useState("It is "+ localStorage.getItem("userName") +"'s turn");
    const handleX = () => setText("It is "+ localStorage.getItem("userName") +"'s turn");
    const handleO = () => setText("It is O's turn")
    const handleGameOver = () => setText("Game Over!");

    //constant list of winning combinations
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    function start() {
        addXandOListener();
        addResetListener();
    }

    //listener for moves
    function addXandOListener() {
        for (let i = boxes.length - 1; i >= 0; i--) {
            boxes[i].addEventListener("click", addXorO);
        }
    }

    //according to listener adds X or O text to table
    //also checks for winning combinations
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
                checkForWin(XMoves, localStorage.getItem("userName"));
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

    //reset listener
    function addResetListener(){
        let resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", resetBoard);
    }

    //check for win
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

    //resets board means clear it
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Classical implementation of TickTackToe game with sound. Click on needed
                    cell and you will hear my friend's voice :)
                </Modal.Body>
            </Modal>
            <div>
                <div className="container">
                    <ButtonGroup>
                    <Button id="reset" variant="primary">Cleat Board</Button>
                    <Button id="reset" variant="success" onClick={handleShow}>About</Button>
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