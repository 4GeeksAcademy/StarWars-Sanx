import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
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

export const Single = () => {
  const { type, theId } = useParams();

  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  const favoriteItem = itemDetails ?
    { id: theId, type: type, name: itemDetails.properties?.name || itemDetails.name } :
    { id: theId, type: type, name: "" };

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar los detalles de ${type}.`);
        }
        const data = await response.json();
        setItemDetails(data.result);
      } catch (err) {
        console.error("Error al cargar detalles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (type && theId) {
      fetchItemDetails();
    }
  }, [type, theId]);

  const handleFavoriteClick = () => {
    if (itemDetails) {
      toggleFavorite({
        id: theId,
        type: type,
        name: itemDetails.properties?.name || itemDetails.name,
      });
    }
  };

  const imageUrl = PLACEHOLDER_IMAGES[type] || PLACEHOLDER_IMAGES.default;

  if (loading) {
    return (
      <div className="container text-center text-light mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando detalles de {type}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center text-danger mt-5">
        <h2>¡Error!</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-warning mt-3">Volver al inicio</Link>
      </div>
    );
  }

  if (!itemDetails) {
    return (
      <div className="container text-center text-light mt-5">
        <p>No se encontraron detalles para este elemento.</p>
        <Link to="/" className="btn btn-warning mt-3">Volver al inicio</Link>
      </div>
    );
  }


  const displayData = itemDetails.properties || itemDetails;

  return (
    <div className="container mt-5 bg-dark text-light p-4">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={imageUrl}
            alt={displayData.name || "Elemento de Star Wars"}
            className="img-fluid rounded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-warning mb-3">{displayData.name || displayData.title}</h1>
          <hr className="border-warning" />
          <p className="lead">{itemDetails.description || "Descripción no disponible."}</p>
          <ul className="list-unstyled">
            {Object.entries(displayData).map(([key, value]) => (
              typeof value !== 'object' && !Array.isArray(value) && key !== 'name' && key !== 'title' && key !== 'url' && key !== 'created' && key !== 'edited' && key !== 'uid' && key !== '__v' && (
                <li key={key}>
                  <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                </li>
              )
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Link to="/" className="btn btn-warning text-dark rounded-0">
              Volver a Inicio
            </Link>
            <button
              onClick={handleFavoriteClick}
              className={`btn ${isFavorite(favoriteItem.id, favoriteItem.type) ? "btn-warning rounded-0" : "btn-outline-warning rounded-0"}`}
            >
              <i className={`${isFavorite(favoriteItem.id, favoriteItem.type) ? "fas fa-heart" : "far fa-heart"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
};