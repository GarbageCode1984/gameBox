import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import React from "react";
import { GlobalStyles } from "./style/GlobalStyles.ts";
import MemoryCard from "./pages/MemoryCard/MemoryCard.tsx";

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
