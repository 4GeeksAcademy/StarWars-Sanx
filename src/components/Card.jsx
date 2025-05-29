import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useFavorites } from '../FavoriteContext';

const PLACEHOLDER_IMAGES = {
    people: "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2021/11/20-personajes-emblematicos-de-Star-Wars25.jpeg?resize=800%2C401&ssl=1",
    vehicles: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHPLbs3tpN5NokoXEr2J2-OwOQ04ZHOQegg&s",
    planets: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKG7kGwqDx68Ps8dIjXbwmilGGNyrBrwEBw&s",
    species: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/01/Spilt-image-of-geonosian-Pyke-and-Zyggerian-in-Star-Wars-feature.jpg",
    starships: "https://www.cosasdearquitectos.com/wp-content/uploads/Localizaciones-y-naves-de-Star-Wars-02.jpg",
    films: "https://hhshawks.org/wp-content/uploads/2023/03/200956.jpg?w=640",
    default: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/12/star-wars-scaled.jpg?fit=2560%2C1440&quality=50&strip=all&ssl=1"
};

export const Card = ({ title, description, uid, type }) => {
    // Lógica de favoritos
    const { toggleFavorite, isFavorite } = useFavorites();
    const { store, actions } = useGlobalReducer();
    const item = {
        id: uid,
        type: type,
        name: title
    };

    const handleFavoriteClick = () => {
        toggleFavorite(item);
    };

    const imageUrl = PLACEHOLDER_IMAGES[type] || PLACEHOLDER_IMAGES.default;

    return (
        <div className="card bg-dark text-light border border-secondary rounded-0" style={{ minWidth: "18rem", maxWidth: "18rem", margin: "10px" }}>
            <img
                src={imageUrl}
                className="card-img-top"
                alt={`Image of ${title}`}
            />

            <div className="card-body">
                <h5 className="card-title text-warning">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/${type}/${uid}`} className="btn btn-warning text-dark rounded-0">
                        Learn More!
                    </Link>
                    <button
                        onClick={handleFavoriteClick}
                        className={`btn ${isFavorite(item.id, item.type) ? "btn-warning rounded-0" : "btn-outline-warning rounded-0"}`}
                    >
                        <i className={`${isFavorite(item.id, item.type) ? "fas fa-heart" : "far fa-heart"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    uid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};