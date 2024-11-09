import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProblemsPage } from "./sections/Problems/ProblemsPage";
import { ProblemPage } from "./sections/Problems/ProblemPage";

import "./App.css";
import { useEffect, useRef } from "react";

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
    const androidRef = useRef<any | undefined>(
        (window as any).AndroidInterface
    );

    useEffect(() => {
        if (!androidRef.current) return;

        const context = androidRef.current.doStaff();
        alert(context);
    }, []);

    return <RouterProvider router={router} />;
}

