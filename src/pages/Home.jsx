// src/pages/Home.jsx
import React, { useEffect, useCallback } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import Pagination from "../components/Pagination.jsx";

export const Home = () => {
    const { store, actions } = useGlobalReducer();

    const currentCategoryPagination = store.pagination[store.activeCategory];

    console.log("DEBUG Home.jsx render: Categoría activa:", store.activeCategory, "Paginación:", currentCategoryPagination);
    

    useEffect(() => {
        const category = store.activeCategory;
        const currentData = store[category];
        const currentPage = store.pagination[category]?.currentPage || 1;
        const isLoadingCurrentCategory = store[`isLoading${category.charAt(0).toUpperCase() + category.slice(1)}`];

        if ((!currentData || currentData.length === 0) && !isLoadingCurrentCategory) {
            console.log(`DEBUG Home.jsx useEffect: Calling fetchCategoryData for ${category} page ${currentPage} because data is empty and not loading.`);
            actions.fetchCategoryData(category, currentPage);
        } else {
            console.log(`DEBUG Home.jsx useEffect: Data for ${category} is present OR currently loading. No fetch needed from useEffect.`);
        }

    }, [
        store.activeCategory, 
        actions, 
    ]);

    const getActiveCategoryData = () => {
        const categoryMap = {
            people: {
                title: "Characters",
                data: store.people,
                pagination: store.pagination.people,
                descriptionKey: "gender", // Ejemplo, puedes cambiarlo
                type: "people" // Importante para la Card
            },
            films: {
                title: "Films",
                data: store.films,
                pagination: store.pagination.films,
                descriptionKey: "director", // Ejemplo
                type: "films"
            },
            planets: {
                title: "Planets",
                data: store.planets,
                pagination: store.pagination.planets,
                descriptionKey: "population", // Ejemplo
                type: "planets"
            },
            vehicles: {
                title: "Vehicles",
                data: store.vehicles,
                pagination: store.pagination.vehicles,
                descriptionKey: "model",
                type: "vehicles"
            },
            species: {
                title: "Species",
                data: store.species,
                pagination: store.pagination.species,
                descriptionKey: "classification",
                type: "species"
            },
            starships: {
                title: "Starships",
                data: store.starships,
                pagination: store.pagination.starships,
                descriptionKey: "model",
                type: "starships"
            },
        };
        return categoryMap[store.activeCategory];
    };

    const currentCategory = getActiveCategoryData();
    const isLoadingCurrentCategory = store[`isLoading${currentCategory.type.charAt(0).toUpperCase() + currentCategory.type.slice(1)}`];

    const handlePageChange = useCallback((newPage) => {
        console.log(`DEBUG Home.jsx handlePageChange: Changing to page ${newPage} for category ${currentCategory.type}`);
        actions.changePage(currentCategory.type, newPage);
    }, [actions, currentCategory.type]);


       return (
        <div className="container-fluid bg-dark text-light min-vh-100 py-3">
            {store?.message && <div className="alert alert-danger" role="alert">{store.message}</div>}

            <div className="row">
                {/* Columna de la Barra Lateral */}
                <div className="col-md-3 bg-secondary text-light p-3">
                    <div className="d-flex flex-column h-100">
                        <h4 className="border-bottom border-light pb-2 mb-3">BROWSE DATABANK //</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "people" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("people")}
                                >
                                    CHARACTERS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "vehicles" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("vehicles")}
                                >
                                    VEHICLES
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "planets" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("planets")}
                                >
                                    PLANETS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "species" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("species")}
                                >
                                    SPECIES
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "starships" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("starships")}
                                >
                                    STARSHIPS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "films" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("films")}
                                >
                                    FILMS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${store.activeCategory === "all" || store.activeCategory === "people" ? "text-warning active" : "text-light"}`}
                                    href="#"
                                    onClick={() => actions.changeActiveCategory("people")} // "All" sigue mostrando la primera página de Characters
                                >
                                    ALL
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Columna del Contenido Principal */}
                <div className="col-md-9 p-3">
                    <h1 className="text-warning mb-4">{currentCategory.title}</h1>
                    <div className="d-flex flex-wrap justify-content-center">
                        {isLoadingCurrentCategory ? (
                            <p className="text-center w-100 text-light">Cargando {currentCategory.title.toLowerCase()}...</p>
                        ) : currentCategory.data.length > 0 ? (
                            <>
                                {currentCategory.data.map((item) => (
                                    <Card
                                        key={item.uid}
                                        title={currentCategory.type === "films" ? (item.properties?.title || "N/A") : (item.name || "N/A")}
                                        description={`${currentCategory.descriptionKey}: ${item.properties?.[currentCategory.descriptionKey] || 'N/A'}`}
                                        uid={item.uid}
                                        type={currentCategory.type}
                                    />
                                ))}
                                {/* Mostrar paginación solo si hay más de una página y no está cargando */}
                                {currentCategoryPagination && currentCategoryPagination.totalPages > 1 && !isLoadingCurrentCategory && (
                                    <Pagination
                                        currentPage={currentCategoryPagination.currentPage}
                                        totalPages={currentCategoryPagination.totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <p className="text-center w-100 text-light">No hay {currentCategory.title.toLowerCase()} disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};