import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import ErrorPage from "../pages/ErrorPage";
import PostJob from "../pages/PostJob";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
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
			{
				path: "/job/:id",
				element: <JobDetail />,
				loader: ({ params: { id } }) =>
					fetch(`${import.meta.env.VITE_APP_URL}/market-jobs/${id}`),
			},
			{
				path: "/post-job",
				element: <PostJob />,
			},
		],
	},
]);
