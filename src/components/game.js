import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

export default class Game extends React.Component{
    render() {
        const style = {
            position:'absolute',
            top:'80%',
            left: '110px'
        }
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={"auto"}>
                        <Card style={{ width: '18rem'}}>
                            <Card.Img variant="top" src={require("../utils/zhas.jpg")} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Title style={{textAlign:'center', color : '#dbdbdb'}}>Running Car</Card.Title>
                                <div style={style}>
                                    <Button href="game/car" variant="primary">PLAY!</Button>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col md={"auto"}>
                        <Card style={{ width: '18rem', height: '18rem'}}>
                            <Card.Img variant="top" src={require("../utils/space.png")} style={{height:'100%'}} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Title style={{textAlign:'center', color : '#dbdbdb'}}>Space Invader</Card.Title>
                                <div style={style}>
                                    <Button href="game/space" variant="primary">PLAY!</Button>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col md={"auto"}>
                        <Card style={{ width: '18rem', height: '18rem'}}>
                            <Card.Img variant="top" src={require("../utils/ticktacktoe.png")} style={{height:'100%'}} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Title style={{textAlign:'center', color : '#dbdbdb'}}>TickTackToe</Card.Title>
                                <div style={style}>
                                    <Button href="game/tick" variant="primary">PLAY!</Button>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col md={"auto"}>
                        <Card style={{ width: '18rem'}}>
                            <Card.Img variant="top" src={require("../utils/snake.jpg")} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Title style={{textAlign:'center', color : '#dbdbdb'}}>Snake</Card.Title>
                                <div style={style}>
                                    <Button href="game/snake" variant="primary">PLAY!</Button>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}