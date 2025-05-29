import React, { createContext, useState, useContext, useEffect } from 'react';

export const FavoriteContext = createContext({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
});

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const localFavorites = localStorage.getItem('starwars_favorites');
            return localFavorites ? JSON.parse(localFavorites) : [];
        } catch (error) {
            console.error("Error al cargar favoritos de localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Error al guardar favoritos en localStorage:", error);
        }
    }, [favorites]);

    const toggleFavorite = (item) => {
        setFavorites(prevFavorites => {

            const isAlreadyFavorite = prevFavorites.some(fav => fav.id === item.id && fav.type === item.type);

            if (isAlreadyFavorite) {
                return prevFavorites.filter(fav => !(fav.id === item.id && fav.type === item.type));
            } else {
                return [...prevFavorites, item];
            }
        });
    };

    const isFavorite = (itemId, itemType) => {
        return favorites.some(fav => fav.id === itemId && fav.type === itemType);
    };

    const contextValue = {
        favorites,
        toggleFavorite,
        isFavorite,
    };

    return (
        <FavoriteContext.Provider value={contextValue}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorites debe usarse dentro de un FavoriteProvider');
    }
    return context;
};