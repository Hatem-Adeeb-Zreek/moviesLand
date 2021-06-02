import React from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../Config";
import { Link } from "react-router-dom";

function GridCards(props) {
    let { actor, key, image, movieId, movieName, characterName } = props;
    const POSTER_SIZE = "w154";

    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div className="grid-container">
                    <img
                        alt={characterName}
                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
                    />
                </div>
            </Col>
        );
    } else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div className="grid-container">
                    <a href={`/movie/${movieId}`}>
                        <img alt={movieName} src={image} />
                    </a>
                </div>
            </Col>
        );
    }
}

export default GridCards;
