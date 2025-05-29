// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Favorites } from "./pages/Favorites";
import { FavoriteProvider } from './FavoriteContext';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <FavoriteProvider>
          <Layout />
        </FavoriteProvider>
      }
      errorElement={<h1>Not found!</h1>}
    >


      <Route path="/" element={<Home />} />
      <Route path="/:type/:theId" element={<Single />} />
      <Route path="/favorites" element={<Favorites />} />
    </Route>
  )
);