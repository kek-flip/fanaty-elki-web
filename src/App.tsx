import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProblemsPage } from "./sections/Problems/ProblemsPage";

import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProblemsPage />,
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}

