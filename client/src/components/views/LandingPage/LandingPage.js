import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then((result) => result.json())
            .then((result) => {
                setMainMovieImage(MainMovieImage || result.results[0]);
            })
            .catch((error) => console.error("Error:", error));
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
        </div>
    );
}

export default LandingPage;
