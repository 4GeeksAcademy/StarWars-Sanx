import React from "react";
import { Link } from "react-router-dom"; 
import PropTypes from "prop-types";

export const Card = ({ title, description, uid, type }) => {
    return (
        <div className="card bg-dark text-light border border-secondary" style={{ minWidth: "18rem", maxWidth: "18rem", margin: "10px" }}> 
            <div className="card-body">
                <h5 className="card-title text-warning">{title}</h5> 
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/${type}/${uid}`} className="btn btn-warning text-dark"> 
                        Learn More!
                    </Link>
                    <button className="btn btn-outline-warning"> 
                        <i className="far fa-heart"></i> 
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