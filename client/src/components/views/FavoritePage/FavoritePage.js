import React, { useEffect, useState } from "react";
import { Typography, Popover, Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";
import { Link } from "react-router-dom";

const { Title } = Typography;

function FavoritePage() {
    const user = useSelector((state) => state.user);

    const [Favorites, setFavorites] = useState([]);
    const [Loading, setLoading] = useState(true);
    let variable = { userFrom: localStorage.getItem("userId") };

    useEffect(() => {
        fetchFavoredMovie();
        // eslint-disable-next-line
    }, []);

    const fetchFavoredMovie = () => {
        axios
            .post("/api/favorite/getFavoredMovie", variable)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.favorites);
                    setFavorites(response.data.favorites);
                    setLoading(false);
                } else {
                    alert("Failed to get subscription videos");
                }
            });
    };

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        };

        axios
            .post("/api/favorite/removeFromFavorite", variables)
            .then((response) => {
                if (response.data.success) {
                    fetchFavoredMovie();
                } else {
                    alert("Failed to Remove From Favorite");
                }
            });
    };

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ? (
                    <img
                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`}
                        alt="favorite_movie_image"
                    />
                ) : (
                    "no image"
                )}
            </div>
        );

        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>

                <td>{favorite.movieRunTime} mins</td>
                <td>
                    <Button
                        type="primary"
                        onClick={() =>
                            onClickDelete(favorite.movieId, favorite.userFrom)
                        }
                    >
                        Remove
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <div className="favorite-wrapper">
            <Title level={2}> Favorite Movies By Me </Title>
            <hr />
            {user.userData && !user.userData.isAuth ? (
                <div className="favorite-box">
                    <p>Please Log in first...</p>
                    <Link to="/login">Go to Login page</Link>
                </div>
            ) : (
                !Loading && (
                    <table>
                        <thead>
                            <tr>
                                <th>Movie Title</th>
                                <th>Movie RunTime</th>
                                <td>Remove from favorites</td>
                            </tr>
                        </thead>
                        <tbody>{renderCards}</tbody>
                    </table>
                )
            )}
        </div>
    );
}

export default FavoritePage;
