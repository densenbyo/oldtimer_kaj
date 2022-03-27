import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Welcome extends React.Component{
    render() {
        const divStyle = {
            margin: "200px",
            padding: "20px",
            color: "white",
        };

        return (
            <div style={divStyle} className={"text-center"}>
                <h1>Old Timer</h1>
                <p>
                    Actually the name of web is pretty cringe, anyway. Main idea of it to create web with collection of simple games.
                    Such as snake, 2048, ticktacktoe and so on. Just to stupidly kill time by playing stupid games.
                </p>
                <p>Enjoy your time spending 😂.</p>
            </div>
        );
    }
}

