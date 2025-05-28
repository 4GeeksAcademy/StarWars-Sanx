// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useMemo } from "react";
import storeReducer, { initialStore, getActions } from "../store"  

const StoreContext = createContext()

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    const getState = useMemo(() => () => store, [store]);

    const actions = useMemo(() => {
        return getActions(getState, dispatch);
    }, [getState, dispatch]);

    console.log("Store en StoreProvider:", store);
    console.log("Tipo de store.people en StoreProvider:", typeof store.people);

    return (
         <StoreContext.Provider value={{ store, actions }}> 
            {children}
        </StoreContext.Provider>
    );
};

const useGlobalReducer = () => useContext(StoreContext);

export default useGlobalReducer;