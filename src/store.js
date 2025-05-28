export const initialStore = () => {
  return {
    message: null,
    people: [],    
    vehicles: [],  
    planets: [],
    species:[],
    starships: [],
    films: [],   
    favorites: [],  

    activeCategory: "people", 
    isLoadingPeople: false,
    isLoadingVehicles: false,
    isLoadingPlanets: false,
    isLoadingSpecies: false,
    isLoadingStarships: false,
    isLoadingFilms: false,

    pagination: {
      people: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      vehicles: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      planets: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      species: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      starships: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      films: { currentPage: 1, totalPages: 1, totalRecords: 0 },
    },
  };
};


export const getActions = (getState, dispatch) => {
  const ITEMS_PER_PAGE = 9; 

  const fetchData = async (dispatch, category, endpoint, setLoadingType, setDataType, setPaginationType, pageToFetch) => {
    
    const currentPageForFetch = pageToFetch || 1;
    let totalRecords = 0; // Inicializar aquí
    let totalPages = 1;   // Inicializar aquí

    const url = category === "films"
            ? `https://swapi.tech/api/${endpoint}/`
            : `https://swapi.tech/api/${endpoint}/?page=${currentPageForFetch}&limit=${ITEMS_PER_PAGE}`;

    console.log(`--- DEBUG fetchData: URL generada para ${category}: ${url}`);
    console.log(`--- DEBUG fetchData: currentPageForFetch = ${currentPageForFetch} (recibido como pageToFetch)`);

    dispatch({ type: setLoadingType, payload: true });

    try {
      console.log(`--- DEBUG: Intentando obtener ${category} desde:`, url);
      const response = await fetch(url);

      console.log(`Respuesta HTTP de ${category}:`, response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`--- DEBUG: Datos recibidos de ${category}:`, data);
      console.log(`--- DEBUG: URL de la petición:`, url);

      const items = data.results || data.result || [];

      if (category === "films") {
        totalRecords = 9;
        totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
      } else {
        totalRecords = data.total_records || 0;
        totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
      }
      if (totalRecords > 0 && totalPages === 0) totalPages = 1;

      dispatch({ type: setDataType, payload: items });
    
       const currentPaginationState = getState().pagination[category];
            if (
                currentPaginationState.currentPage !== currentPageForFetch ||
                currentPaginationState.totalPages !== totalPages ||
                currentPaginationState.totalRecords !== totalRecords
            ) {
                console.log(`--- DEBUG: Dispatching NEW pagination for ${category}. Prev:`, currentPaginationState, `New: {currentPage: ${currentPageForFetch}, totalPages: ${totalPages}, totalRecords: ${totalRecords}}`);
                dispatch({
                    type: setPaginationType,
                    payload: {
                        currentPage: currentPageForFetch,
                        totalPages: totalPages,
                        totalRecords: totalRecords,
                    }
                });
            } else {
                console.log(`--- DEBUG: Pagination for ${category} is stable. No dispatch needed.`);
            }

    } catch (error) {
            console.error(`Error fetching ${category}:`, error);
            dispatch({ type: "set_message", payload: `Error al cargar ${category}` });
            dispatch({ type: setDataType, payload: [] });
        } finally {
            dispatch({ type: setLoadingType, payload: false });
        }
    };


  return {
    fetchCategoryData: (category, pageToFetch) => {
      fetchData(
        dispatch,
        category,
        category,
          `set_isLoading${category.charAt(0).toUpperCase() + category.slice(1)}`, // Genera "set_isLoadingPeople", etc.
          `set_${category}`, // Genera "set_people", etc.
          `set_pagination_${category}`, // Genera "set_pagination_people", etc. (COINCIDE con el reducer)
        pageToFetch
            );
    },

    changeActiveCategory: (newCategory) => {
            dispatch({ type: "set_active_category", payload: newCategory });
            dispatch({ 
                type: `set_pagination_${newCategory}`,
                payload: { currentPage: 1, totalPages: 1, totalRecords: 0 }
            });
             fetchData(
                dispatch,
                newCategory,
                newCategory,
                `set_isLoading${newCategory.charAt(0).toUpperCase() + newCategory.slice(1)}`,
                `set_${newCategory}`,
                `set_pagination_${newCategory}`,
                1 // Siempre página 1 al cambiar de categoría
            );

    },

    changePage: (category, newPage) => {
      const currentStoreState = getState();
            dispatch({
                type: `set_pagination_${category}`,
                payload: { ...currentStoreState.pagination[category], currentPage: newPage }
            });
            fetchData(
                dispatch,
                category,
                category,
                `set_isLoading${category.charAt(0).toUpperCase() + category.slice(1)}`,
                `set_${category}`,
                `set_pagination_${category}`,
                newPage // ¡Pasa la nueva página directamente!
            );
     },       

     addFavorite: (item) => {
            dispatch({ type: "add_favorite", payload: item });
        },
        removeFavorite: (uid, type) => {
            dispatch({ type: "remove_favorite", payload: { uid, type } });
        }
    };
};


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_people': return { ...store, people: action.payload };
    case 'set_vehicles': return { ...store, vehicles: action.payload };
    case 'set_planets': return { ...store, planets: action.payload };
    case 'set_species': return { ...store, species: action.payload };
    case 'set_starships': return { ...store, starships: action.payload };
    case 'set_films': return { ...store, films: action.payload };
    case 'set_message': return { ...store, message: action.payload };
    case 'set_active_category': return { ...store, activeCategory: action.payload };

    case 'set_isLoadingPeople': return { ...store, isLoadingPeople: action.payload };
    case 'set_isLoadingVehicles': return { ...store, isLoadingVehicles: action.payload };
    case 'set_isLoadingPlanets': return { ...store, isLoadingPlanets: action.payload };
    case 'set_isLoadingSpecies': return { ...store, isLoadingSpecies: action.payload };
    case 'set_isLoadingStarships': return { ...store, isLoadingStarships: action.payload };
    case 'set_isLoadingFilms': return { ...store, isLoadingFilms: action.payload };

    // ¡NUEVOS CASOS PARA LOS ESTADOS DE PAGINACIÓN!
    case 'set_pagination_people': return { ...store, pagination: { ...store.pagination, people: action.payload } };
    case 'set_pagination_vehicles': return { ...store, pagination: { ...store.pagination, vehicles: action.payload } };
    case 'set_pagination_planets': return { ...store, pagination: { ...store.pagination, planets: action.payload } };
    case 'set_pagination_species': return { ...store, pagination: { ...store.pagination, species: action.payload } };
    case 'set_pagination_starships': return { ...store, pagination: { ...store.pagination, starships: action.payload } };
    case 'set_pagination_films': return { ...store, pagination: { ...store.pagination, films: action.payload } };
    
    default:
      console.error("Unknown action.type:", action.type, "payload:", action.payload);
      throw Error('Unknown action.');
  }
}
