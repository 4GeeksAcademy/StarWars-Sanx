import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useFavorites } from '../FavoriteContext';
import { Card } from '../components/Card';
export const Favorites = () => {
    const { favorites } = useFavorites();
    return (
        <Container fluid className="bg-dark text-light min-vh-100 py-3">
                 <Col md={12} className="ps-5 pt-4 pb-4">
                    <h1 className="text-warning mt-0 mb-4 h3">FAVORITOS //</h1>

                    {favorites.length === 0 ? (
                        <p className="text-light">Aún no has añadido ningún favorito. ¡Explora las categorías y marca tus preferidos!</p>
                    ) : (
                        <div className="d-flex flex-wrap justify-content-center">
                            {favorites.map((item, index) => (
                                <Card
                                    key={`${item.type}-${item.id}-${index}`} 
                                    uid={item.id} 
                                    type={item.type} 
                                    title={item.name} 
                                    description={item.description || "Haz clic en 'Learn More!' para ver más detalles."}
                                />
                            ))}
                        </div>
                    )}
                </Col>
        </Container>
    );
};
