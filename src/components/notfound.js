import React from 'react';


export default class NotFound extends React.Component {

    render() {
        const divStyle = {
            backgroundColor: "#212529",
            margin: "200px auto",
            padding: "20px",
            color: "white",
            width: "200px",
            borderRadius: "100px",
            transition: "all 1.5s ease"
        };

        return (
            <div style={divStyle} className={"text-center"} class="notfound">
                <h3 >NOT FOUND</h3>
                <p>
                    Page you are looking for is not found!
                </p>
                <p style={{fontSize:"3px", color:"black"}}>
                    хитрый пиздюк
                </p>
            </div>

        );
    }
}
