import React, {useState} from 'react';
import {Button, Col, Container, Modal, Navbar} from "react-bootstrap";
import meme from '../utils/meme.mp4';

export default function Footer(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let year = new Date().getFullYear();

    return (
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>MEME</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woou! You found this, bruuuuuh♂</Modal.Body>
                    <Modal.Body>
                        <video width="464px" autoPlay>
                            <source src={meme} type="video/mp4"/>
                        </video>
                    </Modal.Body>
                </Modal>
                <Col lg={12} className="text-center text-muted">
                    <div>{year}-{year + 1}, All
                        <span onClick={handleShow}> Rights </span>
                        Reserved</div>
                </Col>
            </Container>
        </Navbar>
    );
}
