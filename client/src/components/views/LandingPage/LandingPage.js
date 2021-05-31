import React, { useEffect } from "react";
import { API_URL, API_KEY } from "../../Config";

function LandingPage() {
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
        <>
            <div className="app"></div>
        </>
    );
}

export default LandingPage;
