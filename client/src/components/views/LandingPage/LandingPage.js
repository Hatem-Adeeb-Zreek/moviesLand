import React, { useEffect, useState, useRef } from "react";
import { Typography, Row, Button } from "antd";
import {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    IMAGE_SIZE,
    POSTER_SIZE,
} from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCard from "../../commons/GridCards";

const { Title } = Typography;

function LandingPage() {
    const buttonRef = useRef(null);
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then((result) => result.json())
            .then((result) => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results]);
                setMainMovieImage(MainMovieImage || result.results[0]);
                setCurrentPage(result.page);
            }, setLoading(false))
            .catch((error) => console.error("Error:", error));
    };

    const loadMoreItems = () => {
        let endpoint = "";
        setLoading(true);
        console.log("CurrentPage", CurrentPage);
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
            CurrentPage + 1
        }`;
        fetchMovies(endpoint);
    };

    return (
        <div className="landing-page-wrapper">
            {MainMovieImage && (
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            )}
            <div className="fetched-movies">
                <Title level={2}> Movies by Latest </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies &&
                        Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={
                                        movie.poster_path
                                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                            : null
                                    }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                </Row>

                {Loading && <div>Loading...</div>}

                <br />
                <div className="load-more">
                    <Button
                        type="primary"
                        ref={buttonRef}
                        onClick={loadMoreItems}
                    >
                        Load More
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
