import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
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