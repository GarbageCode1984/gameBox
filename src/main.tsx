import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import React from "react";
import MemoryCard from "./pages/MemoryCard/MemoryGame .tsx";
import { GlobalStyles } from "./style/GlobalStyles";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/memory-game",
        element: <MemoryCard />,
    },
]);
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GlobalStyles />
        <RouterProvider router={router} />
    </React.StrictMode>
);
