import React from 'react';
import './games/css/main.css';
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";

export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            error: "",
            bool : "true"
        }
        this.handleChange = this.handleChange.bind(this);
        this.setLocal = this.setLocal.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    setLocal = () =>{
        this.validate()
        if(this.state.bool === "false") {
            localStorage.setItem('userName', this.state.name);
            setTimeout(() => window.location.reload(), 100);
        }
    }

    validate() {
        if(this.state.name[0] !== this.state.name[0].toUpperCase()) {
            let alert = "Not Capitalized Name";
            this.setState({
                error : alert,
                bool : "true"
            })

        } else {
            this.setState({
                error: "",
                bool : "false"
            })
        }
    }

    render() {
        const {name} = this.state;
        return (
            <div>
                <div className="wave">
                    <svg className="first">
                        <circle cx="100" cy="100" r="100" fill="#758081"/>
                    </svg>
                    <svg className="second">
                        <circle cx="100" cy="400" r="300" fill="#758081"/>
                    </svg>
                    <svg className="third">
                        <circle cx="100" cy="100" r="50" fill="#758081"/>
                    </svg>
                </div>
                <Card style={{ width: '18rem' }} className="mx-auto">
                    {localStorage.length === 0 ?
                        <Card.Body>
                            <Card.Title>Welcome to OldTimer</Card.Title>
                            <Card.Text>
                                Let me know your name
                                <p style={{color:"darkred"}}>{this.state.error}</p>
                            </Card.Text>
                            <InputGroup className="mb-3">
                                <label htmlFor="fname" style={{margin: "0 auto"}}>Your Name:</label>
                                <input type="text" id="fname" name={"name"} style={{margin: "0 auto"}} autoFocus={true}
                                       required={true} onChange={this.handleChange} value={name}/>
                            </InputGroup>
                            <Button variant="primary"
                                    onClick={this.setLocal} className="stupidBtn">Let's start</Button>
                        </Card.Body> :
                        <Card.Body>
                            <Card.Title>Welcome to OldTimer, {localStorage.getItem('userName')}</Card.Title>
                            <Card.Text>
                                Glad to see you again!
                            </Card.Text>
                            <Button variant="primary" href="/game">Let's play</Button>
                        </Card.Body>
                    }
                </Card>
            </div>
        );
    }
}