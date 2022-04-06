import React from 'react';


export default function NotFound(){
    function rotate(e) {
        e.target.style.transform = "rotateX(360deg)";
        setTimeout(() => {
            e.target.style.transform = "";
        }, 500);
    }
    //not found page for pages which is not exist in web
    //implemented small animation of svg just to take point from requirements
    return (
        <div className={"text-center"} class="notfound" id="yes">
            <svg className="first" onMouseOver={rotate}>
                <circle cx="200" cy="200" r="200" fill="#212529"/>
                <text x="155" y="120" style={{color:"#999999", fontSize:"15px",}}>NOT FOUND</text>
                <text x="70" y="190" style={{color:"#999999", fontSize:"15px",}}>Page you are looking for is not found!</text>
                <text x="170" y="250" style={{color:"#999999", fontSize:"8px",}}>хитрый пиздюк</text>
            </svg>
        </div>

    );
}
