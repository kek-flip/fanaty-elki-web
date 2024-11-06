import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProblemsPage } from "./sections/Problems/ProblemsPage";
import { ProblemPage } from "./sections/Problems/ProblemPage";

import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProblemsPage />,
    },
    {
        path: "/:problemId",
        element: <ProblemPage />,
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}

