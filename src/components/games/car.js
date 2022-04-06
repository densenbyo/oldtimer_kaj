import React, {useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, Card, Container, InputGroup, Modal} from 'react-bootstrap';
import success from './audio/jumpSound.ogg';
import fail from './audio/failSound.ogg';

export default function Car() {
    //Function which represents car game

    //useState hooks
    const [dead, setDead] = useState(false);
    const [score, setScore] = useState(0);
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);

    //reference links to images
    const stolb = useRef(null);
    const zhas = useRef(null);
    let timer;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //handle change of checkbox and save checkboxes value is saved in localStorage
    const handleChange = (e) => {
        localStorage.setItem('checkbox', e.target.checked);
        setChecked(e.target.checked);
    }

    //import jump audio
    let jumpSound = () => {
        const audio = new Audio(success);
        audio.play();
    }

    //import fail sound
    let jumpFail = () => {
        const audio = new Audio(fail);
        audio.play();
    }

    //list of events as jump also checks whether checkbox was checked or not
    useEffect(() => {
        listenEvent();
    }, []);

    const listenEvent = () => {
        document.body.onkeydown = (e) => {
            if(e.key === ' ') {
                animate();
                if(localStorage.getItem('checkbox') === 'true') {
                    jumpSound();
                } else {
                    console.log("JUMP!")
                }
            }
        }
    }

    //restart
    const restart = () => {
        console.log("GAME START");
        clearInterval(timer);
        setScore(0);
        setDead(true);
    };

    //animate object in document
    //means add to "zhas" object reference to jump css which makes object jump
    //after 500ms delete jump css from "zhas" object
    const animate = () => {
        if(!zhas.current) return;
        if (zhas.current.classList.contains("jump")) return;
        zhas.current.classList.add("jump");
        setScore((score) => ++score);
        setTimeout(() => {
            zhas.current.classList.remove("jump");
        }, 500);
    };

    //checks collision of "zhas" object with "stolb" object
    const checkOver = setInterval(function() {
        try {
            let carTop = parseInt(
                window.getComputedStyle(zhas.current).getPropertyValue("top"),
                0
            );

            let stolbLeft = parseInt(
                window.getComputedStyle(stolb.current).getPropertyValue("left"),
                0
            );
            if (stolbLeft > 0 && stolbLeft < 50 && carTop >= 250) {
                zhas.current.classList.remove("jump");
                stolb.current.classList.remove("stolbMov");
                if(localStorage.getItem('checkbox') === 'true'){
                    jumpFail();
                } else {
                    console.log("FAIL")
                }
                setDead(false);
            }
        } catch (e) {

        }
    }, 10);


    return (
        <Container>
            <div className="flex">
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>About Game</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Game was implemented according to Chrome Dino Game.
                        It was my close friend's idea, that is why he is a main character in his loved car.
                        <p>
                            <span style={{color:"red"}}>
                                Audio is bit load, so recommend you to make your PC sound settings lower.
                            </span>
                        </p>
                    </Modal.Body>
                </Modal>
                {dead ?
                    <div className="game">
                        <div className="score">
                            <p>Score: {score}</p>
                        </div>
                        <div className="zhol"></div>
                        <div ref={zhas} id="car"></div>
                        <div ref={stolb} id="stolb"></div>
                    </div>
                    :
                    <Card style={{ width: '18rem' }} className="mx-auto">
                        <Card.Body>
                            <Card.Title>Mega Super Running Car Game</Card.Title>
                            <Card.Text>
                                <input type="checkbox" checked={checked}
                                       onChange={(e) => handleChange(e)}/>
                                Audio Settings
                                <p style={{fontSize:"9px", color:"darkred"}}>Checked is audio on</p>
                            </Card.Text>
                            <ButtonGroup className="me-2">
                                <Button variant="success" onClick={handleShow}>
                                    More about.
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup className="me-2">
                                <Button variant="primary" onClick={restart}>Start</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                }
            </div>
        </Container>
    );
}
