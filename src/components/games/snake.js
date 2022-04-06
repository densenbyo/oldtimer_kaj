import React, {useRef} from "react";
import './css/snake.css';
import {Container, DropdownButton, Dropdown, Button} from "react-bootstrap";

export default class Snake extends React.Component{
    //Component which represents snake game
    //used ReactJS type "OOP"

    //set default value of document
    constructor() {
        super();
        const grid = [];

        for (let row = 0; row < 20; row++) {
            const cols = [];
            for (let col = 0; col < 20; col++) {
                cols.push({
                    row,
                    col
                });
            }
            grid.push(cols);
        }
        this.state = {
            grid,
            apple: {
                row: Math.floor(Math.random() * 20),
                col: Math.floor(Math.random() * 20),
            },
            snake: {
                head: {
                    row: 9,
                    col: 9
                },
                velocity: {
                    x: 1,
                    y: 0
                },
                tail: []
            },
        }
    }

    //onload of window set game started
    componentDidMount = () => {
        document.addEventListener('keydown', (e) => {
            this.setVelocity(e);
        });
        setTimeout(() => {
            this.gameLoop()
        }, this.state.snake.tail.length ? (400 / this.state.snake.tail.length) + 200 : 400);
    }

    //randomly generate apple position in grid
    getRandomApple = () => {
        const { snake } = this.state;
        const newApple = {
            row: Math.floor(Math.random() * 20),
            col: Math.floor(Math.random() * 20),
        };
        if (this.isTail(newApple) || (
            snake.head.row === newApple.row
            && snake.head.col === newApple.col)) {
            return this.getRandomApple();
        } else {
            return newApple;
        }
    }

    //game loop where is implemented whole game loop
    //checks collision, snake size and so on
    gameLoop = () => {
        if (this.state.gameOver) return;
        this.setState(({snake, apple}) => {
            const collidesWithApple = this.collidesWithApple();
            const nextState = {
                snake: {
                    ...snake,
                    head: {
                        row: snake.head.row + snake.velocity.y,
                        col: snake.head.col + snake.velocity.x
                    },
                    tail: [snake.head, ...snake.tail]
                },
                apple: collidesWithApple ? this.getRandomApple() : apple
            };

            if (!collidesWithApple) nextState.snake.tail.pop();

            return nextState;
        }, () => {
            const { snake } = this.state;
            if (this.isOffEdge() || this.isTail(snake.head)) {
                this.setState({
                    gameOver: true,
                });
                setTimeout(() => window.location.reload(), 1000);
                return;
            }
            setTimeout(() => {
                this.gameLoop()
            }, this.state.snake.tail.length ? (400 / this.state.snake.tail.length) + 200 : 400);
        });
    }

    //checks collision of "snake" object with sides of grid
    isOffEdge = () => {
        const { snake } = this.state;

        if (snake.head.col > 19
            || snake.head.col < 0
            || snake.head.row > 19
            || snake.head.row < 0) {
            return true;
        }
    }

    //check if snake "ate" apple
    collidesWithApple = () => {
        const { apple, snake } = this.state;
        return apple.row === snake.head.row
            && apple.col === snake.head.col;
    }

    //simple checkers
    isApple = (cell) => {
        const { apple } = this.state;
        return apple.row === cell.row
            && apple.col === cell.col;
    }
    isHead = (cell) => {
        const { snake } = this.state;
        return snake.head.row === cell.row
            && snake.head.col === cell.col;
    }
    isTail = (cell) => {
        const { snake } = this.state;
        return snake.tail.find(inTail => inTail.row === cell.row && inTail.col === cell.col);
    }

    //function which is representing logic of movements
    //with event.keyCode function of DOM
    //setted as WASD and ARROWS
    setVelocity = (event) => {
        const { snake } = this.state;
        if (event.keyCode === 38 || event.keyCode === 87) { // up
            if (snake.velocity.y === 1) return;
            this.setState(({snake}) => ({
                snake: {
                    ...snake,
                    velocity: {
                        x: 0,
                        y: -1,
                    }
                }
            }))
        } else if (event.keyCode === 40 || event.keyCode === 83) {// down
            if (snake.velocity.y === -1) return;
            this.setState(({snake}) => ({
                snake: {
                    ...snake,
                    velocity: {
                        x: 0,
                        y: 1,
                    }
                }
            }))
        } else if (event.keyCode === 39 || event.keyCode === 68)  {//right
            if (snake.velocity.x === -1) return;
            this.setState(({snake}) => ({
                snake: {
                    ...snake,
                    velocity: {
                        x: 1,
                        y: 0,
                    }
                }
            }))
        } else if (event.keyCode === 37 || event.keyCode === 65)  { // left
            if (snake.velocity.x === 1) return;
            this.setState(({snake}) => ({
                snake: {
                    ...snake,
                    velocity: {
                        x: -1,
                        y: 0,
                    }
                }
            }))
        }
    }

    render(){
        const { grid, snake, gameOver } = this.state;
        return (
            <Container>
                {
                    gameOver
                        ? <h1>Game Over! You scored {snake.tail.length + 1}!</h1>
                        :
                        <div>
                            <p>WASD or ARROWS to move</p>
                            <p>Collision ends game</p>
                            <section className="grid">
                                {
                                    grid.map((row, i) => (
                                        row.map(cell => (
                                            <div key={`${cell.row} ${cell.col}`} className={`cell
                                        ${
                                                this.isHead(cell)
                                                    ? 'head' : this.isApple(cell)
                                                        ? 'apple' : this.isTail(cell)
                                                            ? 'tail' : ''
                                            }`
                                            }>
                                            </div>
                                        ))
                                    ))
                                }
                            </section>
                        </div>
                }
            </Container>
        )
    }
}