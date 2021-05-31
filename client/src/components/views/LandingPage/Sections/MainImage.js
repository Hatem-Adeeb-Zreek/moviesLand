import React from "react";

function MainImage(props) {
    return (
        <div
            className="main-image-wrapper"
            style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #1c1c1c`,
            }}
        >
            <div>
                <div className="main-image-info">
                    <h2> {props.title} </h2>
                    <p> {props.text}</p>
                </div>
            </div>
        </div>
    );
}

export default MainImage;
