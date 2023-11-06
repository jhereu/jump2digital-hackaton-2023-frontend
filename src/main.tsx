import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "@/components/_App/_App";
import { CharacterList } from "@/components/CharacterList/CharacterList";
import { CharacterShow } from "@/components/CharacterShow/CharacterShow";
import { CHARACTER_LIST_ROUTE, CHARACTER_SHOW_ROUTE, ROOT_ROUTE } from "@/lib/config/routes";

/**
 * React Router v6 routes
 * Docs: https://reactrouter.com/en/main/routers/create-browser-router
 */
const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <App />,
    children: [
      {
        path: CHARACTER_LIST_ROUTE,
        element: <CharacterList />,
      },
      {
        path: CHARACTER_SHOW_ROUTE,
        element: <CharacterShow />,
      },
      {
        path: "*",
        element: <CharacterList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
