import React, { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../../Config";
import { Typography, Row } from "antd";

//ant-design
const { Title } = Typography;

function LandingPage(props) {
    // const [state, setstate] = useState(initialState);
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    // fetch movies function from MovieDB API
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then((result) => result.json())
            .then((result) => console.log(result))
            .catch((error) => console.error("Error:", error));
    };
    return (
        <div className="landing-page-wrapper">
            {/* movie main image */}
            <div
                className="main-image-wrapper"
                style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
                }}
            ></div>
            <div>
                <div className="main-image-info">
                    <Title className="title" level={2}>
                        {props.title}
                    </Title>
                    <p className="par">{props.text}</p>
                </div>
            </div>
            {/* landing-page-body */}
            <div className="landing-page-body">
                <Title level={2}> Movies by latest </Title>
                <hr />
                {/* Grid Cards */}
                <Row gutter={[16, 16]}></Row>
                {/* loadmore button */}
                <br />
                <div className="loadmore-btn">
                    <button onClick>Load More</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
