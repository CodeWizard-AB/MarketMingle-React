import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Home from "../pages/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
]);
