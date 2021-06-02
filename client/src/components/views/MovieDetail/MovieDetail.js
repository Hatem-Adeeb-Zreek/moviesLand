import React, { useEffect, useState } from "react";
import { Row, Button } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import GridCards from "../../commons/GridCards";
import MainImage from "../../views/LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetailPage(props) {
    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [LoadingForMovie, setLoadingForMovie] = useState(true);
    const [LoadingForCasts, setLoadingForCasts] = useState(true);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo);
        // eslint-disable-next-line
    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

    const fetchDetailInfo = (endpoint) => {
        fetch(endpoint)
            .then((result) => result.json())
            .then((result) => {
                console.log(result);
                setMovie(result);
                setLoadingForMovie(false);

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then((result) => result.json())
                    .then((result) => {
                        console.log(result);
                        setCasts(result.cast);
                    });

                setLoadingForCasts(false);
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ? (
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            ) : (
                <div>loading...</div>
            )}

            {/* Body */}
            <div className="movie-detail">
                {/* Movie Info */}
                {!LoadingForMovie ? (
                    <MovieInfo movie={Movie} />
                ) : (
                    <div>loading...</div>
                )}

                <br />
                {/* Actors Grid*/}

                <div className="actor-grid">
                    <Button type="primary" onClick={toggleActorView}>
                        Toggle Actor View
                    </Button>
                </div>

                {ActorToggle && (
                    <Row gutter={[16, 16]}>
                        {!LoadingForCasts ? (
                            Casts.map(
                                (cast, index) =>
                                    cast.profile_path && (
                                        <GridCards
                                            actor
                                            image={cast.profile_path}
                                            characterName={cast.characterName}
                                        />
                                    )
                            )
                        ) : (
                            <div>loading...</div>
                        )}
                    </Row>
                )}
                <br />
            </div>
        </div>
    );
}

export default MovieDetailPage;
