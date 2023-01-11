import { createBrowserRouter, Navigate } from "react-router-dom"
import { ListPersonPage } from "./pages/ListPerson/ListPersonPage"

export const AppRouter = createBrowserRouter([
    {
        path: "person/list",
        element: <ListPersonPage />,
    },
    {
        path: "*",
        element: <Navigate to="person/list"/>
    }
]);