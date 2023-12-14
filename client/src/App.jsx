import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user",
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
